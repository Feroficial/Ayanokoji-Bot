const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
import fs from 'fs'
import path from 'path'

// ========== SISTEMA DE HISTORIAL POR GRUPO/CHAT ==========
const historialDir = './historial_ia'
if (!fs.existsSync(historialDir)) fs.mkdirSync(historialDir, { recursive: true })

function getHistorialPath(chatId) {
    // Limpiar el ID para usarlo como nombre de archivo
    const cleanId = chatId.replace(/[:@.]/g, '_')
    return path.join(historialDir, `${cleanId}.json`)
}

function cargarHistorial(chatId) {
    const filePath = getHistorialPath(chatId)
    if (!fs.existsSync(filePath)) {
        return [] // Historial vacío
    }
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } catch {
        return []
    }
}

function guardarHistorial(chatId, historial) {
    const filePath = getHistorialPath(chatId)
    // Limitar el historial a los últimos 30 mensajes (para no saturar)
    const historialLimitado = historial.slice(-30)
    fs.writeFileSync(filePath, JSON.stringify(historialLimitado, null, 2), 'utf-8')
}

function limpiarHistorial(chatId) {
    const filePath = getHistorialPath(chatId)
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}

// ========== FUNCIONES EXISTENTES (btoa2, atob2, walkDeep, etc.) ==========
function btoa2(str) { return Buffer.from(str, 'utf8').toString('base64') }
function atob2(b64) { return Buffer.from(b64, 'base64').toString('utf8') }

function walkDeep(node, visit, depth = 0, maxDepth = 7) {
    if (depth > maxDepth) return
    if (visit(node, depth) === false) return
    if (Array.isArray(node)) {
        for (const x of node) walkDeep(x, visit, depth + 1, maxDepth)
    } else if (node && typeof node === 'object') {
        for (const k of Object.keys(node)) walkDeep(node[k], visit, depth + 1, maxDepth)
    }
}

function cleanUrlCandidate(s, { stripSpaces = false } = {}) {
    if (typeof s !== 'string') return ''
    let t = s.trim()
        .replace(/^['"]|['"]$/g, '')
        .replace(/\\u003d/gi, '=').replace(/\\u0026/gi, '&').replace(/\\u002f/gi, '/')
        .replace(/\\\//g, '/').replace(/\\/g, '').replace(/[\\'"\]\)>,.]+$/g, '')
    if (stripSpaces) t = t.replace(/\s+/g, '')
    return t
}

function looksLikeImageUrl(u) {
    return /\.(png|jpe?g|webp|gif)(\?|$)/i.test(u) || /googleusercontent\.com|ggpht\.com/i.test(u)
}

function extractImageUrlsFromText(text) {
    const out = new Set()
    if (typeof text !== 'string' || !text) return []
    const regex = /https:\/\/[\w\-\.]+(?:googleusercontent\.com|ggpht\.com)[^\s"'<>)]+|https:\/\/[^\s"'<>)]+\.(?:png|jpe?g|webp|gif)(?:\?[^\s"'<>)]*)?/gi
    for (const m of (text.match(regex) || [])) {
        const u = cleanUrlCandidate(m)
        if (/googleusercontent\.com\/image_generation_content\/0$/.test(u)) continue
        out.add(u)
    }
    return Array.from(out)
}

function isLikelyText(s) {
    if (typeof s !== 'string') return false
    const t = s.trim()
    if (!t || t.length < 2) return false
    if (/^https?:\/\//i.test(t)) return false
    if (/^\/\/www\./i.test(t)) return false
    if (/maps\/vt\/data/i.test(t)) return false
    if (/^c_[0-9a-f]{6,}$/i.test(t)) return false
    if (/^[A-Za-z0-9_\-+/=]{16,}$/.test(t) && !/\s/.test(t)) return false
    if (/^\{.*\}$/.test(t) || /^\[.*\]$/.test(t)) return false
    if (/https?:\/\//i.test(t) && t.length < 40) return false
    return t.length >= 8 || /\s/.test(t)
}

function pickBestTextFromAny(parsed) {
    const found = []
    walkDeep(parsed, (n) => { if (typeof n === 'string' && isLikelyText(n)) found.push(n.trim()) })
    found.sort((a, b) => b.length - a.length)
    return found[0] || ''
}

function pickFirstString(parsed, accept) {
    let first = ''
    walkDeep(parsed, (n) => {
        if (first) return false
        if (typeof n !== 'string') return
        const t = n.trim()
        if (t && (!accept || accept(t))) first = t
        if (first) return false
    })
    return first
}

function findInnerPayloadString(outer) {
    const candidates = []
    const add = (s) => { if (typeof s === 'string' && s.trim()) candidates.push(s.trim()) }
    add(outer?.[0]?.[2]); add(outer?.[2]); add(outer?.[0]?.[0]?.[2])
    walkDeep(outer, (n) => {
        if (typeof n !== 'string') return
        const t = n.trim()
        if ((t.startsWith('[') || t.startsWith('{')) && t.length > 20) add(t)
    }, 0, 5)
    for (const s of candidates) { try { JSON.parse(s); return s } catch {} }
    return null
}

function parseStream(data) {
    if (typeof data !== 'string' || !data.trim()) throw new Error('Respuesta vacía')
    if (/<html|<!doctype/i.test(data)) throw new Error('Gemini devolvió HTML')
    const chunks = Array.from(
        data.matchAll(/^\d+\r?\n([\s\S]+?)\r?\n(?=\d+\r?\n|$)/gm)
    ).map(m => m[1]).reverse()
    if (!chunks.length) throw new Error('Respuesta inválida')
    let best = { text: '', resumeArray: null, parsed: null }
    for (const c of chunks) {
        try {
            const outer = JSON.parse(c)
            const inner = findInnerPayloadString(outer)
            if (!inner) continue
            const parsed = JSON.parse(inner)
            const text = pickBestTextFromAny(parsed)
            const resumeArray = Array.isArray(parsed?.[1]) ? parsed[1] : null
            if (!best.parsed || (text && text.length > (best.text?.length || 0))) {
                best = { text, resumeArray, parsed }
            }
        } catch {}
    }
    if (!best.parsed) throw new Error('Respuesta inválida')
    const urls = new Set(extractImageUrlsFromText(data))
    walkDeep(best.parsed, (n, depth) => {
        if (depth > 6) return false
        if (typeof n !== 'string') return
        const u = cleanUrlCandidate(n, { stripSpaces: true })
        if (!/^https:\/\//i.test(u)) return
        if (looksLikeImageUrl(u)) urls.add(u)
    }, 0, 7)
    let cleanText = (best.text || '').replace(/\*\*(.+?)\*\*/g, '*$1*').trim()
    if (!cleanText) {
        const accept = (t) => !/^https?:\/\//i.test(t) && !/^\/\/www\./i.test(t) && !/maps\/vt\/data/i.test(t)
        cleanText = (pickFirstString(best.parsed, accept) || pickFirstString(best.parsed))
            .replace(/\*\*(.+?)\*\*/g, '*$1*').trim()
    }
    return { text: cleanText, resumeArray: best.resumeArray, images: Array.from(urls) }
}

async function getAnonCookie() {
    const r = await fetch(
        'https://gemini.google.com/_/BardChatUi/data/batchexecute?rpcids=maGuAc&source-path=%2F&hl=en-US&rt=c',
        {
            method: 'POST',
            redirect: 'manual',
            headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', 'user-agent': UA },
            body: 'f.req=%5B%5B%5B%22maGuAc%22%2C%22%5B0%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&',
        }
    )
    const setCookie = r.headers.get('set-cookie')
    if (!setCookie) throw new Error('Sin cookies de Gemini')
    return setCookie.split(';')[0]
}

async function getXsrfToken(cookieHeader) {
    try {
        const res = await fetch('https://gemini.google.com/app', {
            headers: { 'user-agent': UA, cookie: cookieHeader, accept: 'text/html' }
        })
        const html = await res.text()
        return html.match(/"SNlM0e":"([^"]+)"/)?.[1] || html.match(/"at":"([^"]+)"/)?.[1] || null
    } catch { return null }
}

let modoActual = 'ania'
const mensajesBienvenida = {
    ania: '🌸 *ＡＮＩＡ ＢＯＴ* 🌸\n\n💗 *"Estoy aquí para ayudarte, ¿en qué puedo servirte?"* 💗\n\n📌 *Usa #gemini <pregunta> para hablar conmigo*\n🔄 *Todos en el grupo compartimos la misma conversación*',
    kawaii: '🎀 *ＡＮＩＡ* 🎀\n\n✨ *"Hola, hablemos bonito"* ✨\n\n🔄 *Todos compartimos el mismo chat*',
    tierna: '🧸 *ＡＮＩＡ* 🧸\n\n🌸 *"Cuéntame, te escucho"* 🌸\n\n🔄 *Conversación compartida*'
}

async function askGemini(prompt, chatId, previousId = null) {
    // Cargar historial del grupo/chat
    let historial = cargarHistorial(chatId)
    
    // Construir el contexto del historial (últimos 10 mensajes)
    let contexto = ''
    if (historial.length > 0) {
        contexto = '\n\nHistorial de la conversación:\n'
        for (const msg of historial.slice(-10)) {
            contexto += `${msg.autor}: ${msg.texto}\n`
        }
        contexto += '\n'
    }

    let systemPrompt = ''
    if (modoActual === 'ania') {
        systemPrompt = 'Eres Ania, una asistente virtual amable, dulce y kawaii. Hablas con emojis como 🌸, 💗, 🎀, ✨. Das respuestas cálidas, positivas y alentadoras. Siempre tratas de ayudar con una sonrisa virtual. Tus respuestas son amigables y llenas de buenas vibras. Usas frases como "¡Claro que sí!", "Qué bonito", "Eres increíble", "Me encanta ayudar". Recuerdas lo que los usuarios han dicho antes en esta conversación.'
    } else if (modoActual === 'kawaii') {
        systemPrompt = 'Eres Ania en modo súper kawaii. Usas muchos emojis, expresiones tiernas, respuestas cortas y adorables. Hablas como una chica dulce de anime. Recuerdas la conversación anterior.'
    } else {
        systemPrompt = 'Eres Ania en modo tierna. Das respuestas suaves, tranquilas, como una amiga que escucha y apoya. Transmites paz y cariño. Recuerdas lo que se ha dicho antes.'
    }

    let finalPrompt = `${systemPrompt}${contexto}\n\nUsuario (${m.pushName || 'Alguien'}): ${prompt.trim()}\n\nAnia:`

    let lastErr = null
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const cookie = await getAnonCookie()
            const xsrf = await getXsrfToken(cookie)
            const payload = [[finalPrompt], ['en-US'], null]
            const params = { 'f.req': JSON.stringify([null, JSON.stringify(payload)]) }
            if (xsrf) params.at = xsrf
            const response = await fetch(
                'https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?hl=en-US&rt=c',
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'user-agent': UA, 'x-same-domain': '1', cookie,
                    },
                    body: new URLSearchParams(params),
                }
            )
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            const parsed = parseStream(await response.text())
            
            // Guardar en el historial
            historial.push({ autor: m.pushName || 'Usuario', texto: prompt.trim() })
            historial.push({ autor: 'Ania', texto: parsed.text })
            guardarHistorial(chatId, historial)
            
            return {
                text: parsed.text,
                id: btoa2(JSON.stringify({ resumeArray: parsed.resumeArray })),
                images: parsed.images
            }
        } catch (e) {
            lastErr = e
            if (attempt < 3) await new Promise(r => setTimeout(r, 700))
        }
    }
    throw lastErr || new Error('Error desconocido')
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const chatId = m.chat // ID del grupo o chat privado
    
    if (command === 'setmodoia') {
        if (!text) return m.reply(`
🌸 *MODOS DISPONIBLES* 🌸

> 🎀 *ania* - Amable y kawaii (por defecto)
> 💗 *kawaii* - Súper tierna
> 🧸 *tierna* - Tranquila y dulce

📌 *Ejemplo:* ${usedPrefix}setmodoia kawaii`)

        if (text === 'ania') {
            modoActual = 'ania'
            m.reply(`🌸 *MODO ANIA ACTIVADO* 🌸\n\n💗 *"¡Hola! Estoy aquí para ayudarte"* 💗`)
        } else if (text === 'kawaii') {
            modoActual = 'kawaii'
            m.reply(`🎀 *MODO KAWAII ACTIVADO* 🎀\n\n✨ *"Holi, ¿en qué te ayudo?"* ✨`)
        } else if (text === 'tierna') {
            modoActual = 'tierna'
            m.reply(`🧸 *MODO TIERNA ACTIVADO* 🧸\n\n🌸 *"Cuéntame, te escucho con cariño"* 🌸`)
        } else {
            m.reply(`💗 Modo "${text}" no existe. Usa: ania, kawaii, tierna`)
        }
        return
    }
    
    // Comando para limpiar el historial del chat
    if (command === 'limpiarchat' || command === 'clearhistorial') {
        limpiarHistorial(chatId)
        return m.reply(`🌸 *Historial limpiado* 🌸\n\n💗 *"Empezamos de nuevo, ¿qué deseas hablar?"* 💗`)
    }

    if (!text) return m.reply(mensajesBienvenida[modoActual] + `\n\n➤ *Uso:* ${usedPrefix}${command} <pregunta>\n➤ *Ejemplo:* ${usedPrefix}${command} ¿Quién eres?\n➤ *Comandos extra:* ${usedPrefix}limpiarchat - Borra el historial`)

    await m.react('🌸')

    try {
        let res = await askGemini(text, chatId, null)

        if (res.images?.length) {
            await conn.sendMessage(m.chat, {
                image: { url: res.images[0] },
                caption: `🌸 *ＡＮＩＡ ＢＯＴ* 🌸\n\n💗 *${res.text || ''}* 💗\n\n*"Siempre aquí para ti"*`
            }, { quoted: m });
        } else {
            await m.reply(`🌸 *ＡＮＩＡ ＢＯＴ* 🌸\n\n💗 *${res.text || '...'}* 💗`)
        }

        await m.react('✅')
    } catch (e) {
        console.error('[ia]', e);
        await m.react('❌')
        m.reply(`🌸 *ＡＮＩＡ ＢＯＴ* 🌸\n\n💗 *"Ups, algo salió mal... Intenta de nuevo"* 💗`)
    }
}

handler.command = ['gemini', 'setmodo', 'limpiarchat', 'clearhistorial']
handler.help = ['gemini <pregunta>', 'setmodo <modo>', 'limpiarchat']
handler.tags = ['ai']

export default handler