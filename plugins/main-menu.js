import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: `
ㅤ    ꒰  ㅤ 🕸️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ιηƒσ 木 αтт ㅤ 性

> ₊· нσℓα *.* вιєηνєηι∂σ αℓ мєηυ ∂є *αℓуα - вσт*
> ⫏⫏   

%readmore
`.trimStart(),
  header: '\nㅤ    ꒰  ㅤ ✿ ㅤ *%¢αтєgσяу* ㅤ ⫏⫏  ꒱\nㅤ    ⿻ ㅤ 性 ㅤ ѕє¢¢ιση ㅤ ✿',
  body: '> ₊· ⫏⫏ ㅤ %¢м∂',
  footer: 'ㅤ',
  after: `
ㅤ
ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ 性 ㅤ ѕιѕтємα єנє¢υтα∂σ ㅤ ✿
> ₊· ⫏⫏ ㅤ #ριηg ─ 📡 *єѕтα∂σ ∂єℓ вσт*
ㅤ
ㅤ    ꒰  ㅤ 🕸️ ㅤ *¢яєα∂σ ρσя ℓуσηη* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ ✿ 木 性 ㅤ αℓуα
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
    group: 'ɢяυρσѕ',
    downloader: '∂σωηℓσα∂єя',
    search: 'ѕєαя¢н',
    economy: 'є¢σησму',
    game: 'gαмє',
    nsfw: 'ηѕƒω +18',
    tools: 'тσσℓѕ',
    serbot: 'ѕєявσт',
    owner: 'σωηєя',
    sticker: 'ѕтι¢кєяѕ',
    reaction: 'яєα¢тισηѕ',
    register: 'яєgιѕтєя',
    anime: 'αηιмє',
    info: 'ιηƒσ'
  }

  const text = [
    menu.before,
    ...Object.keys(tags).map(tag => {
      const cmds = help
        .filter(p => p.tags.includes(tag))
        .flatMap(p => p.help.map(c =>
          menu.body.replace('%¢м∂', p.prefix ? c : usedPrefix + c)
        )).join('\n')
      if (!cmds) return ''
      return `${menu.header.replace('%¢αтєgσяу', tags[tag])}\n${cmds}\n${menu.footer}`
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