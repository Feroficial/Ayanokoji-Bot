import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import * as ws from 'ws'

const defaultMenu = {
  before: `
ㅤ    ꒰  ㅤ 🕸️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ info 木 att ㅤ 性

> ₊· hola *.* bienvenido al menu de *αℓуα - вσт*
> ⫏⫏   ✿ canal  ›
> » https://whatsapp.com/channel/0029VbCOTaJ9RZAQPdiZ4J1K
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
%readmore
`.trimStart(),
  header: '\nㅤ    ꒰  ㅤ ✿ ㅤ *%category* ㅤ ⫏⫏  ꒱\nㅤ    ⿻ ㅤ 性 ㅤ seccion ㅤ ✿',
  body: '> ₊· ⫏⫏ ㅤ %cmd',
  footer: 'ㅤ',
  after: `
ㅤ
ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ 性 ㅤ Sistema ejecutado ㅤ ✿
> ₊· ⫏⫏ ㅤ #ping ─ 📡 *Estado del bot*
>
> ₊· ⫏⫏ ㅤ 🤖 *Tipo:* %tipousuario
>
ㅤ    ꒰  ㅤ 🕸️ ㅤ *ᴄʀᴇᴀᴅᴏ ᴘᴏʀ ʟʏᴏɴɴ* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ ✿ 木 性 ㅤ Alya
`
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

// Función para detectar si un número es sub-bot
function esSubBot(jid) {
  const subBots = global.conns || []
  const esSubBotActivo = subBots.some(sub => 
    sub.user && sub.user.jid === jid
  )
  
  if (esSubBotActivo) return true
  
  try {
    const subBotPath = path.join(process.cwd(), 'kiyotaka-ayanokoji', 'subBot')
    if (fs.existsSync(subBotPath)) {
      const carpetas = fs.readdirSync(subBotPath)
      const numero = jid.split('@')[0]
      return carpetas.includes(numero)
    }
  } catch (e) {}
  
  return false
}

let handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: '🕸️', key: m.key } })

  const botJid = conn.user.jid
  const menuMedia = loadMenuMedia(botJid)
  const menu = global.subBotMenus?.[botJid] || defaultMenu

  const user = global.db.data.users[m.sender] || { level: 0, exp: 0 }
  const { min, xp } = xpRange(user.level, global.multiplier)

  // Detectar si el usuario es sub-bot
  const usuarioEsSubBot = esSubBot(m.sender)
  const tipoUsuario = usuarioEsSubBot ? '🤖 ѕυв-вσт' : '👤 υѕυαяισ иσямαℓ'

  const subBots = global.conns || []
  const subBotsActivos = subBots.filter(c => 
    c.user && c.ws?.socket && c.ws.socket.readyState !== ws.CLOSED
  )
  const totalSubBots = subBotsActivos.length

  const replace = {
    name: await conn.getName(m.sender),
    level: user.level,
    exp: user.exp - min,
    maxexp: xp,
    totalreg: Object.keys(global.db.data.users).length,
    mode: global.opts.self ? 'Privado' : 'Público',
    muptime: clockString(process.uptime() * 1000),
    readmore: String.fromCharCode(8206).repeat(4001),
    tipousuario: tipoUsuario,
    subbots: totalSubBots
  }

  const help = Object.values(global.plugins || {})
    .filter(p => !p.disabled)
    .map(p => ({
      help: [].concat(p.help || []),
      tags: [].concat(p.tags || []),
      prefix: 'customPrefix' in p
    }))

  const tags = {
    main: 'princɨքαl',
    group: 'ɢʀυքos',
    downloader: 'dᦅwnlᦅαdᧉr',
    search: 'sᧉαrch',
    economy: 'ᧉcᦅnᦅmy',
    game: 'ɢαcɦα',
    nsfw: 'nsfw +18',
    tools: 'łᦅᦅls',
    serbot: 'ѕєявσт',
    owner: 'ᦅwnᧉr',
    sticker: 'słickᧉrs',
    reaction: 'rᧉαccꪱᦅnᧉs',
    register: 'rᧉɢisᧉr'
  }

  const text = [
    menu.before,
    ...Object.keys(tags).map(tag => {
      const cmds = help
        .filter(p => p.tags.includes(tag))
        .flatMap(p => p.help.map(c =>
          menu.body.replace('%cmd', p.prefix ? c : usedPrefix + c)
        )).join('\n')
      if (!cmds) return ''
      return `${menu.header.replace('%category', tags[tag])}\n${cmds}\n${menu.footer}`
    }).filter(v => v),
    menu.after
  ].join('\n').replace(/%(\w+)/g, (_, k) => replace[k] ?? '')

  const thumb = menuMedia.thumbnail && fs.existsSync(menuMedia.thumbnail)
    ? fs.readFileSync(menuMedia.thumbnail)
    : defaultThumb

  const uniqueThumb = Buffer.concat([thumb, Buffer.from(botJid)])

  await conn.sendMessage(m.chat, {
    image: uniqueThumb,
    caption: text,
    mentions: [m.sender]
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