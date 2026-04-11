import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const charset = { a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ' }
const textCyberpunk = t => t.toLowerCase().replace(/[a-z]/g, c => charset[c])

// ========== DETECCIÓN DE SUB-BOT ==========
const isSubBot = (conn) => {
  if (global.conns && Array.isArray(global.conns)) {
    return global.conns.some(bot => bot.user?.jid === conn.user?.jid)
  }
  return false
}

const getBotTypeText = (conn) => {
  const subBot = isSubBot(conn)
  if (subBot) {
    return { icon: '🜸', name: 'ꜱᴜʙ-ʙᴏᴛ', status: '🟣 ᴇꜱᴛᴀᴅᴏ: ᴀᴄᴛɪᴠᴏ ᴄᴏᴍᴏ ꜱᴜʙ-ʙᴏᴛ' }
  } else {
    return { icon: '👑', name: 'ʙᴏᴛ ᴘʀɪɴᴄɪᴘᴀʟ', status: '🔴 ᴇꜱᴛᴀᴅᴏ: ɴᴜ́ᴄʟᴇᴏ ᴘʀɪɴᴄɪᴘᴀʟ' }
  }
}

const defaultMenu = {
  before: `
—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »
> 🪐 ɴᴏᴍʙʀᴇ   » %name
> 🌐 ᴍᴏᴅᴏ      » %mode
> ⏳ ᴀᴄᴛɪᴠᴏ   » %muptime
> 👥 ᴜꜱᴜᴀʀɪᴏꜱ » %totalreg
> 🤖 %botIcon *%botName*
> 📌 %botStatus
> 📊 ᴄᴏᴍᴀɴᴅᴏꜱ ᴛᴏᴛᴀʟᴇꜱ: %totalCmds

✦  𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩  •  𝗘𝗟𝗜𝗧𝗘 𝗠𝗘𝗡𝗨  ✦
👑  ᴄʀᴇᴀᴅᴏʀ:  ★  ᴅᴇᴠʟʏᴏɴɴ  ★
%readmore
`.trimStart(),
  header: '\n⧼⋆꙳•〔 🛸 %category 〕⋆꙳•⧽',
  body: '> 🔖 %cmd',
  footer: '╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯',
  after: '\n⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬 - ᴄᴏɴᴇᴄᴛᴀᴅᴏ ᴘᴏʀ: ᴅᴇᴠʟʏᴏɴɴ'
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

const defaultVideo = await fetchBuffer('https://files.catbox.moe/jbiz6v.mp4')

let handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: '⚔️', key: m.key } })

  const botJid = conn.user.jid
  const menuMedia = loadMenuMedia(botJid)
  const menu = global.subBotMenus?.[botJid] || defaultMenu
  const botType = getBotTypeText(conn)

  const user = global.db.data.users[m.sender] || { level: 0, exp: 0 }

  // ========== CONTADOR DE COMANDOS ==========
  let totalComandos = 0
  let comandosPorTag = new Map()
  
  const help = Object.values(global.plugins || {})
    .filter(p => !p.disabled)
    .map(p => ({
      help: [].concat(p.help || []),
      tags: [].concat(p.tags || []),
      prefix: 'customPrefix' in p
    }))

  for (const plugin of help) {
    const cmdCount = plugin.help.length
    totalComandos += cmdCount
    for (const tag of plugin.tags) {
      if (tag) {
        if (!comandosPorTag.has(tag)) comandosPorTag.set(tag, 0)
        comandosPorTag.set(tag, comandosPorTag.get(tag) + cmdCount)
      }
    }
  }

  const tagsMap = { main: 'ꜱɪꜱᴛᴇᴍᴀ', group: 'ɢʀᴜᴘᴏꜱ', serbot: 'ꜱᴜʙ ʙᴏᴛꜱ' }
  for (const { tags: tg } of help) {
    for (const t of tg) {
      if (t && !tagsMap[t]) tagsMap[t] = textCyberpunk(t)
    }
  }

  const replace = {
    name: await conn.getName(m.sender),
    level: user.level,
    totalreg: Object.keys(global.db.data.users).length,
    mode: global.opts.self ? 'Privado' : 'Público',
    muptime: clockString(process.uptime() * 1000),
    readmore: String.fromCharCode(8206).repeat(4001),
    botIcon: botType.icon,
    botName: botType.name,
    botStatus: botType.status,
    totalCmds: totalComandos
  }

  // Construir menú con contadores por categoría
  let text = menu.before

  for (const tag of Object.keys(tagsMap)) {
    const cmds = help
      .filter(p => p.tags && p.tags.includes(tag))
      .flatMap(p => p.help.map(c => menu.body.replace('%cmd', p.prefix ? c : usedPrefix + c)))
      .join('\n')
    if (cmds) {
      const cmdCount = comandosPorTag.get(tag) || 0
      text += `\n${menu.header.replace('%category', `${tagsMap[tag]} (${cmdCount} comandos)`)}\n${cmds}\n${menu.footer}`
    }
  }

  text += `\n${menu.after}`
  
  for (const [key, value] of Object.entries(replace)) {
    text = text.replace(new RegExp(`%${key}`, 'g'), value)
  }

  const video = menuMedia.video && fs.existsSync(menuMedia.video)
    ? fs.readFileSync(menuMedia.video)
    : defaultVideo

  // SIN BOTONES, SOLO VIDEO Y TEXTO
  await conn.sendMessage(m.chat, {
    video,
    gifPlayback: false,
    caption: text,
    footer: '🧠 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ • ᴄʏʙᴇʀ ꜱʏꜱᴛᴇᴍ ☘️',
    contextInfo: {
      externalAdReply: {
        title: 'ʙᴀʟᴅᴡɪɴᴅ ɪᴠ | ᴄʏʙᴇʀ ᴠᴇʀꜱɪᴏɴ',
        body: '┊࣪ ˖ ᴄʀᴇᴀᴅᴏ ʙʏ • ᴅᴇᴠʟʏᴏɴɴ ♱',
        thumbnail: null,
        sourceUrl: 'https://github.com/Feroficial/Baldwind-IV-Bot.git',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
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