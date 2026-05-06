import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: `
ㅤ    ꒰  ㅤ 🕸️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ιηƒσ 木 αтт ㅤ 性

> ₊· нσℓα *.* вιєηνєηι∂σ αℓ мєηυ ∂є *αℓуα - вσт*
> ⫏⫏   ✿ ¢αηαℓ  ›
> » https://whatsapp.com/channel/0029VbCOTaJ9RZAQPdiZ4J1K
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
%readmore
`.trimStart(),
  header: '\nㅤ    ꒰  ㅤ ✿ ㅤ *%¢αтєgσяу* ㅤ ⫏⫏  ꒱\nㅤ    ⿻ ㅤ 性 ㅤ ѕє¢¢ιση ㅤ ✿',
  body: '> ₊· ⫏⫏ ㅤ %¢м∂\n> 💬 %∂єѕ¢',
  footer: 'ㅤ',
  after: `
ㅤ
ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ 性 ㅤ ѕιѕтємα єנє¢υтα∂σ ㅤ ✿
> ₊· ⫏⫏ ㅤ #ριηg ─ 📡 єѕтα∂σ ∂єℓ вσт
ㅤ
ㅤ    ꒰  ㅤ 🕸️ ㅤ *¢яєα∂σ ρσя ℓуσηη* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ ✿ 木 性 ㅤ αℓуα
`
}

const descripciones = {
  play: "Descarga música de YouTube",
  video: "Descarga video de YouTube",
  tiktok: "Descarga video de TikTok",
  pinterest: "Busca imágenes en Pinterest",
  work: "Trabaja y gana USD (cooldown 3 min)",
  bank: "Ver tu saldo total (efectivo + banco)",
  depositar: "Guarda USD en el banco",
  retirar: "Saca USD del banco",
  pay: "Envía USD a otro usuario",
  top: "Ranking global de usuarios con más USD",
  ruleta: "Apuesta USD a RED o GREEN",
  caraocruz: "Apuesta USD a cara o cruz",
  ttt: "Juego de tres en raya (vs bot o amigo)",
  trivia: "Juego de preguntas y respuestas",
  r: "Responde a una pregunta de trivia",
  kick: "Expulsa a un usuario (admins)",
  promote: "Asciende a administrador (admins)",
  demote: "Descinde de administrador (admins)",
  tagall: "Menciona a todos los miembros (admins)",
  bot: "Activa/desactiva el bot en el grupo (admins)",
  add: "Agrega un usuario al grupo (admins)",
  delete: "Elimina un mensaje (admins)",
  report: "Reporta contenido inapropiado",
  ghost: "Verifica si un número tiene WhatsApp",
  sticker: "Convierte imagen a sticker",
  qr: "Genera QR para vincular sub-bot",
  code: "Genera código de 8 dígitos para sub-bot",
  bots: "Lista los sub-bots activos",
  ping: "Verifica el estado del bot",
  owner: "Muestra información del creador",
  menu: "Muestra este menú",
  welcome: "Activa/desactiva bienvenidas (admins)",
  setwelcome: "Personaliza mensaje de bienvenida (admins)",
  antilink: "Activa/desactiva anti-enlaces (admins)",
  info: "Información del usuario"
}

const menuDir = './media/menu'
fs.mkdirSync(menuDir, { recursive: true })

const getMenuMediaFile = jid =>
  path.join(menuDir, `menuMedia_${jid.replace(/[:@.]/g, '_')}.json`)

const loadMenuMedia = jid => {
  const file = getMenuMediaFile(jid)
  if (!fs.existsSync(file)) return {}
  try { return JSON.parse(fs.readFileSync(file)) } catch { return {} }
}

const fetchBuffer = async url =>
  Buffer.from(await (await fetch(url)).arrayBuffer())

const defaultThumb = await fetchBuffer('https://files.catbox.moe/z4qgf1.jpeg')

let handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: '🕸️', key: m.key } })

  const botJid = conn.user.jid
  const menuMedia = loadMenuMedia(botJid)
  const menu = global.subBotMenus?.[botJid] || defaultMenu

  const user = global.db.data.users[m.sender] || { level: 0, exp: 0 }
  const { min, xp } = xpRange(user.level, global.multiplier)

  const replace = {
    name: await conn.getName(m.sender),
    level: user.level,
    exp: user.exp - min,
    maxexp: xp,
    totalreg: Object.keys(global.db.data.users).length,
    mode: global.opts.self ? 'Privado' : 'Público',
    muptime: clockString(process.uptime() * 1000),
    readmore: String.fromCharCode(8206).repeat(4001)
  }

  const help = Object.values(global.plugins || {})
    .filter(p => !p.disabled)
    .map(p => ({
      help: [].concat(p.help || []),
      tags: [].concat(p.tags || []),
      prefix: 'customPrefix' in p
    }))

  const tags = {
    main: 'ρяιη¢ιραℓ',
    downloader: '∂σωηℓσα∂єя',
    economy: 'є¢σησму',
    game: 'gαмє',
    group: 'ɢяυρσ',
    tools: 'тσσℓѕ',
    serbot: 'ѕєявσт',
    sticker: 'ѕтι¢кєя',
    info: 'ιηƒσ'
  }

  const text = [
    menu.before,
    ...Object.keys(tags).map(tag => {
      const cmds = help
        .filter(p => p.tags.includes(tag))
        .flatMap(p => p.help.map(c => {
          let cmdSinPrefijo = c
          let desc = descripciones[cmdSinPrefijo] || "Comando disponible"
          return menu.body.replace('%¢м∂', usedPrefix + c).replace('%∂єѕ¢', desc)
        })).join('\n')
      if (!cmds) return ''
      return `${menu.header.replace('%¢αтєgσяу', tags[tag])}\n${cmds}\n${menu.footer}`
    }).filter(v => v),
    menu.after
  ].join('\n').replace(/%(\w+)/g, (_, k) => replace[k] ?? '')

  const thumb = menuMedia.thumbnail && fs.existsSync(menuMedia.thumbnail)
    ? fs.readFileSync(menuMedia.thumbnail)
    : defaultThumb

  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363407253203904@newsletter",
      newsletterName: "αℓуα - ¢нαηηєℓ",
      serverMessageId: 1
    }
  }

  await conn.sendMessage(m.chat, {
    image: thumb,
    caption: text,
    contextInfo: contextInfo
  }, { quoted: m })
}

handler.help = ['menu', 'menú']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = false

export default handler

const clockString = ms =>
  [3600000, 60000, 1000].map((v, i) =>
    String(Math.floor(ms / v) % (i ? 60 : 99)).padStart(2, '0')
  ).join(':')