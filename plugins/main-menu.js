import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: ` ㅤ    ꒰  ㅤ 🕸️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱ ㅤ    ⿻ ㅤ ✿ ㅤ info 木 att ㅤ 性  > ₊· hola *.* bienvenido al menu de *αℓуα - вσт* > ⫏⫏   ✿ canal  › > » https://whatsapp.com/channel/0029VbCOTaJ9RZAQPdiZ4J1K ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎ %readmore `.trimStart(),
  header: '\nㅤ    ꒰  ㅤ ✿ ㅤ *%category* ㅤ ⫏⫏  ꒱\nㅤ    ⿻ ㅤ 性 ㅤ seccion ㅤ ✿',
  body: '> ₊· ⫏⫏ ㅤ %cmd',
  footer: 'ㅤ',
  after: ` ㅤ ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱ ㅤ    ⿻ ㅤ 性 ㅤ Sistema ejecutado ㅤ ✿ > ₊· ⫏⫏ ㅤ #ping ─ 📡 *Estado del bot* ㅤ ㅤ    ꒰  ㅤ 🕸️ ㅤ *ᴄʀᴇᴀᴅᴏ ᴘᴏʀ ʟʏᴏɴɴ* ㅤ ⫏⫏  ꒱ > ₊· ⫏⫏ ㅤ ✿ 木 性 ㅤ Alya ` }

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

// Foto de Alya
const defaultThumb = await fetchBuffer('https://files.catbox.moe/z4qgf1.jpeg')

let handler = async (m, { conn, usedPrefix }) => {
  try {
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
      main: 'princɨքαl',
      group: 'ɢʀυքos',
      downloader: 'dᦅwnlᦅαdᧉr',
      search: 'sᧉαrch',
      economy: 'ᧉcᦅnᦅmy',
      game: 'ɢαcɦα',
      nsfw: 'nsfw +18',
      tools: 'łᦅᦅls',
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

    // ESTRUCTURA CORRECTA PARA DVWILKERBAIL
    await conn.sendMessage(m.chat, {
      image: uniqueThumb,
      caption: text,
      mentions: [m.sender],
      headerType: 4,
      viewOnce: false
    }, { quoted: m })

    // Enviar botones POR SEPARADO (DvwilkerBail no soporta botones en la imagen)
    const buttonMessage = {
      text: '> 📡 *ESTADO DEL BOT*',
      footer: 'αℓуα - вσт',
      buttons: [
        {
          buttonId: `${usedPrefix}ping`,
          buttonText: { displayText: '🔔 PING' },
          type: 1
        },
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: { displayText: '📋 MENU' },
          type: 1
        }
      ],
      headerType: 0
    }

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m })

  } catch (error) {
    console.error('Error en menu:', error)
    try {
      const thumb = defaultThumb
      const uniqueThumb = Buffer.concat([thumb, Buffer.from(conn.user.jid)])
      await conn.sendMessage(m.chat, {
        image: uniqueThumb,
        caption: '❌ Error al cargar el menú. Intenta de nuevo con #menu'
      }, { quoted: m })
    } catch (e) {
      await m.reply('❌ Error: No se pudo mostrar el menú')
    }
  }
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