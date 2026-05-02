let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar y descargar 5 imágenes
> • #pinterest <url> - Descargar pin directo

> 📌 *Ejemplos:*
> • #pinterest gatos
> • #pinterest https://pinterest.com/pin/123456789

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        const pinUrl = text.includes('pinterest.com/pin/') ? text : null
        
        if (pinUrl) {
            await m.reply(`🎭 Obteniendo contenido del pin...`)
            const res = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(pinUrl)}`)
            const data = await res.json()
            if (!data.status || !data.result) throw new Error('No se pudo obtener el pin')
            
            const pin = data.result
            const isVideo = pin.type === 'video' || pin.url?.endsWith('.mp4')
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${pin.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}
> 🔗 *Fuente:* ${pin.source_url || pinUrl}

🎭 *Alya 2026* 🎭`
            
            if (isVideo && pin.url) {
                await conn.sendMessage(m.chat, { video: { url: pin.url }, caption, mimetype: 'video/mp4' })
            } else if (pin.url) {
                await conn.sendMessage(m.chat, { image: { url: pin.url }, caption })
            } else {
                throw new Error('No se encontró URL del contenido')
            }
            await m.react('✅')
            return
        }
        
        await m.reply(`🎭 Buscando y descargando 5 resultados de "${text}"...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || !searchData.result || searchData.result.length === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        let enviados = 0
        for (let i = 0; i < searchData.result.length; i++) {
            const item = searchData.result[i]
            if (!item.url) continue
            
            const isVideo = item.type === 'video' || item.url?.endsWith('.mp4')
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ${enviados+1}/5 ✧ —* 🎭
            
> 🎯 *Título:* ${item.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}

🎭 *Alya 2026* 🎭`
            
            try {
                if (isVideo) {
                    await conn.sendMessage(m.chat, { video: { url: item.url }, caption, mimetype: 'video/mp4' })
                } else {
                    await conn.sendMessage(m.chat, { image: { url: item.url }, caption })
                }
                enviados++
                await new Promise(r => setTimeout(r, 800))
            } catch (e) {
                console.error(`Error enviando item ${i+1}:`, e.message)
            }
        }
        
        if (enviados === 0) {
            throw new Error('No se pudo enviar ningún resultado')
        }
        
        await m.reply(`🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭\n> 📌 Se enviaron ${enviados} imágenes de "${text}"\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar la solicitud'}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['pinterest <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['pinterest', 'pin']

export default handler