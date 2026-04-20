let handler = async (m, { conn, usedPrefix }) => {
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalCommands = 0
  let commandsByTag = {}

  for (let plugin of Object.values(global.plugins || {})) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!commandsByTag[tag]) commandsByTag[tag] = []
      for (let help of plugin.help) {
        if (/^\$|^=>|^>/.test(help)) continue
        commandsByTag[tag].push(`${usedPrefix}${help}`)
        totalCommands++
      }
    }
  }

  for (let tag in commandsByTag) {
    commandsByTag[tag] = [...new Set(commandsByTag[tag])]
    commandsByTag[tag].sort((a, b) => a.localeCompare(b))
  }

  let emojisHombre = ['⚔️', '🗡️', '🛡️', '👑', '🔱', '🏹', '💀', '🎭', '🔥', '⚡', '🌑', '🖤', '🐉', '🐲', '🦅', '🐺', '🦁', '🗿', '⛩️', '🍶', '🥋', '🏯']

  let secciones = []
  let emojiIndex = 0
  for (let [tag, cmds] of Object.entries(commandsByTag)) {
    let emoji = emojisHombre[emojiIndex % emojisHombre.length]
    emojiIndex++
    let cmdsLista = cmds.slice(0, 25).map(cmd => `   🔖  \`${cmd}\``).join('\n')
    secciones.push(`${emoji} *《 ${tag.toUpperCase()} 》* ${emoji}\n${cmdsLista}`)
  }

  let menuText = `
*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*

*➤  𝐔𝐬𝐮𝐚𝐫𝐢𝐨*  :  @${m.sender.split('@')[0]}
*➤  𝐀𝐜𝐭𝐢𝐯𝐨*   :  ${uptime}
*➤  𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬*  :  ${totalreg}
*➤  𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬*  :  ${totalCommands}

${secciones.join('\n\n')}

*➤  𝐂𝐫𝐞𝐚𝐝𝐨𝐫*  :  𝐋𝐲𝐨𝐧𝐧𝐎𝐅𝐂

*⚔️ © 2026  𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*
`.trim()

  let imageUrl = 'https://files.catbox.moe/le460e.jpeg'
  
  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: menuText,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
      }
