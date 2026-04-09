// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - CHAT DEL CLAN

let handler = async (m, { conn, usedPrefix, text, command }) => {
  let user = global.db.data.users[m.sender]
  
  if (!user.clan) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO PERTENECES A NINGÚN CLAN*\n> 📌 Usa *${usedPrefix}clanes* para ver los clanes disponibles\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  if (!text) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🜸 *CHAT DEL CLAN*\n\n✦ 𝗨𝗦𝗢 ✦\n> 📌 *${usedPrefix + command} <mensaje>*\n\n🎯 *Ejemplo:*\n> ${usedPrefix + command} Hola guerreros!\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  const clan = global.db.data.clans[user.clan]
  if (!clan) {
    user.clan = null
    await global.db.write()
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *EL CLAN YA NO EXISTE*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  const senderName = await conn.getName(m.sender).catch(() => 'Guerrero')
  
  let textMsg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  textMsg += `> 💬 *CHAT DEL CLAN* 💬\n`
  textMsg += `> 🏰 *${clan.name}*\n\n`
  textMsg += `✦ 𝗠𝗘𝗡𝗦𝗔𝗝𝗘 ✦\n`
  textMsg += `> 👤 *${senderName}* (@${m.sender.split('@')[0]}):\n`
  textMsg += `> 📝 ${text}\n\n`
  textMsg += `⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  textMsg += `> 👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n`
  textMsg += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n`
  textMsg += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
  
  // Enviar el mensaje a todos los miembros del clan (por privado)
  for (let member of clan.members) {
    if (member !== m.sender) {
      try {
        await conn.sendMessage(member, { text: textMsg, mentions: [m.sender] })
      } catch (e) {
        console.log(`No se pudo enviar mensaje a ${member}`)
      }
    }
  }
  
  await m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ✅ *Mensaje enviado a todos los miembros del clan*`)
}

handler.help = ['clanchat <mensaje>']
handler.tags = ['clan']
handler.command = ['clanchat', 'cchat']
handler.register = false

export default handler