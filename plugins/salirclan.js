// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - SALIR DEL CLAN

let handler = async (m, { conn, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  
  if (!user.clan) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO PERTENECES A NINGÚN CLAN*\n> 📌 Usa *${usedPrefix}clanes* para ver los clanes disponibles\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  const clan = global.db.data.clans[user.clan]
  
  if (!clan) {
    user.clan = null
    user.clanRank = null
    await global.db.write()
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🜸 *HAS SALIDO DEL CLAN*\n> 📌 El clan ya no existe\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Verificar si es líder
  if (clan.leader === m.sender) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *ERES EL LÍDER DEL CLAN*\n> 📌 No puedes salir sin transferir el liderazgo\n> 📌 Usa *${usedPrefix}transferir @tag* para darle el liderazgo a otro\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Remover del clan
  clan.members = clan.members.filter(m => m !== m.sender)
  user.clan = null
  user.clanRank = null
  
  await global.db.write()
  
  let textMsg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  textMsg += `> 🜸 *HAS SALIDO DEL CLAN* 🜸\n\n`
  textMsg += `✦ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ✦\n`
  textMsg += `> 🏰 *Clan:* ${clan.name}\n`
  textMsg += `> 👤 *Te has ido voluntariamente*\n\n`
  textMsg += `⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  textMsg += `> 👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n`
  textMsg += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n`
  textMsg += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
  
  await conn.sendMessage(m.chat, { text: textMsg }, { quoted: m })
}

handler.help = ['salirclan']
handler.tags = ['clan']
handler.command = ['salirclan', 'leaveclan']
handler.register = false

export default handler