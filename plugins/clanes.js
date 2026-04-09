// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - LISTA DE CLANES

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!global.db.data.clans) global.db.data.clans = {}
  
  const clanes = Object.values(global.db.data.clans)
  
  if (clanes.length === 0) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO HAY CLANES CREADOS*\n> 📌 Sé el primero: *${usedPrefix}crearclan <nombre>*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Ordenar por nivel y experiencia
  clanes.sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level
    return (b.exp || 0) - (a.exp || 0)
  })
  
  let textMsg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  textMsg += `> 🏆 *RANKING DE CLANES* 🏆\n\n`
  
  const topClanes = clanes.slice(0, 15)
  
  for (let i = 0; i < topClanes.length; i++) {
    const clan = topClanes[i]
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '📌'
    textMsg += `${medal} *${clan.name}*\n`
    textMsg += `   👑 Nivel: ${clan.level} | 👥 ${clan.members.length} miembros\n`
    textMsg += `   📊 EXP: ${clan.exp || 0}\n\n`
  }
  
  textMsg += `⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  textMsg += `> 👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n`
  textMsg += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n`
  textMsg += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
  
  await conn.sendMessage(m.chat, { text: textMsg }, { quoted: m })
}

handler.help = ['clanes']
handler.tags = ['clan']
handler.command = ['clanes', 'rankclanes']
handler.register = false

export default handler