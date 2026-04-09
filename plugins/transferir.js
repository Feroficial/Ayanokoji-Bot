// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - TRANSFERIR LIDERAZGO DEL CLAN

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let user = global.db.data.users[m.sender]
  
  // Verificar si está registrado
  if (!user.registered) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *No estás registrado*\n> 📌 Usa: *${usedPrefix}registrar Nombre.Edad*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Verificar si tiene clan
  if (!user.clan) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO PERTENECES A NINGÚN CLAN*\n> 📌 Usa *${usedPrefix}clanes* para ver los clanes disponibles\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Verificar si es líder
  const clan = global.db.data.clans[user.clan]
  if (!clan) {
    user.clan = null
    user.clanRank = null
    await global.db.write()
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *EL CLAN YA NO EXISTE*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  if (clan.leader !== m.sender) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO ERES EL LÍDER DEL CLAN*\n> 📌 Solo el líder puede transferir el liderazgo\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Obtener el miembro mencionado
  let mentioned = m.mentionedJid && m.mentionedJid[0]
  if (!mentioned && text) {
    mentioned = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  }
  
  if (!mentioned) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> 🜸 *TRANSFERIR LIDERAZGO*\n\n✦ 𝗨𝗦𝗢 ✦\n> 📌 *${usedPrefix + command} @tag*\n\n🎯 *Ejemplo:*\n> ${usedPrefix + command} @guerrero\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Verificar que el mencionado esté en el clan
  if (!clan.members.includes(mentioned)) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *EL USUARIO NO PERTENECE A TU CLAN*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // No se puede transferir a sí mismo
  if (mentioned === m.sender) {
    return m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *NO PUEDES TRANSFERIRTE EL LIDERAZGO A TI MISMO*\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`)
  }
  
  // Obtener nombre del nuevo líder
  let newLeaderName = 'Guerrero'
  try {
    newLeaderName = await conn.getName(mentioned)
  } catch (e) {}
  
  // Transferir liderazgo
  const oldLeader = clan.leader
  clan.leader = mentioned
  
  // Actualizar rangos
  if (global.db.data.users[oldLeader]) {
    global.db.data.users[oldLeader].clanRank = 'miembro'
  }
  if (global.db.data.users[mentioned]) {
    global.db.data.users[mentioned].clanRank = 'líder'
  }
  
  await global.db.write()
  
  let textMsg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  textMsg += `> 👑 *LIDERAZGO TRANSFERIDO* 👑\n\n`
  textMsg += `✦ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ✦\n`
  textMsg += `> 🏰 *Clan:* ${clan.name}\n`
  textMsg += `> 📤 *Ex líder:* @${m.sender.split('@')[0]}\n`
  textMsg += `> 📥 *Nuevo líder:* @${mentioned.split('@')[0]} (${newLeaderName})\n\n`
  textMsg += `⧼⋆꙳•〔 🛸 𝗕𝗔𝗟𝗗𝗪𝗜𝗡𝗗 𝗜𝗩 〕⋆꙳•⧽\n`
  textMsg += `> 👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n`
  textMsg += `╰⋆꙳•❅‧*₊⋆꙳︎‧*❆₊⋆╯\n`
  textMsg += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
  
  await conn.sendMessage(m.chat, { text: textMsg, mentions: [m.sender, mentioned] }, { quoted: m })
}

handler.help = ['transferir @tag']
handler.tags = ['clan']
handler.command = ['transferir', 'transferclan', 'dar liderazgo']
handler.register = false

export default handler