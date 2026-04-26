import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const charset = { a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ' }
const textKawaii = t => t.toLowerCase().replace(/[a-z]/g, c => charset[c])

const tags = {
  main: textKawaii('principal'),
  group: textKawaii('grupos'),
  serbot: textKawaii('sub bots')
}

const defaultMenu = {
  before: `
🌸 *— ✧ 𝐀𝐧𝐢𝐚 𝐁𝐨𝐭 ✧ —* 🌸
> 🎀 𝐍𝐨𝐦𝐛𝐫𝐞   » %name
> 💗 𝐍𝐢𝐯𝐞𝐥     » %level
> ✨ 𝐄𝐱𝐩        » %exp / %maxexp
> 🌸 𝐌𝐨𝐝𝐨      » %mode
> ⏳ 𝐀𝐜𝐭𝐢𝐯𝐚   » %muptime
> 👥 𝐔𝐬𝐮𝐚𝐫𝐢𝐚𝐬 » %totalreg

🌸 » 𝐌𝐄𝐍𝐔 𝐀𝐍𝐈𝐀 𝐁𝐎𝐓 «
💗 » 𝐎𝐩𝐞𝐫𝐚𝐝𝐨𝐫𝐚: 🌸 𝐃𝐚𝐧𝐧𝐲 𝐘𝐮𝐥𝐢𝐞𝐭𝐡 🌸
%readmore
`.trimStart(),
  header: '\n🎀 ⋆꙳•〔 💗 %category 〕⋆꙳•',
  body: '> 🌸 %cmd',
  footer: '╰⋆꙳•🌸‧*₊⋆꙳︎‧*💗₊⋆╯',
  after: '\n🌸 𝐀𝐍𝐈𝐀 𝐁𝐎𝐓 🌸 - Sistema ejecutado con éxito. 💗'
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

const defaultThumb = await fetchBuffer('https://files.catbox.moe/74aty6.jpg')

let handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key } })

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

  for (const { tags: tg } of help)
    for (const t of tg)
      if (t && !tags[t]) tags[t] = textKawaii(t)

  const text = [
    menu.before,
    ...Object.keys(tags).map(tag => {
      const cmds = help
        .filter(p => p.tags.includes(tag))
        .flatMap(p => p.help.map(c =>
          menu.body.replace('%cmd', p.prefix ? c : usedPrefix + c)
        )).join('\n')
      return `${menu.header.replace('%category', tags[tag])}\n${cmds}\n${menu.footer}`
    }),
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
handler.register = true
export default handler

const clockString = ms =>
  [3600000, 60000, 1000].map((v, i) =>
    String(Math.floor(ms / v) % (i ? 60 : 99)).padStart(2, '0')
  ).join(':')