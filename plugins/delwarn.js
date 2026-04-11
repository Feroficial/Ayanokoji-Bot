// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - ELIMINAR ADVERTENCIAS

let handler = async (m, { conn, usedPrefix, command, isAdmin }) => {
  if (!m.isGroup) return m.reply(`❌ *Este comando solo funciona en grupos*`)

  if (!isAdmin) return m.reply(`❌ *Solo los administradores pueden eliminar advertencias*`)

  let mentioned = m.mentionedJid && m.mentionedJid[0]
  if (!mentioned) return m.reply(`❌ *Menciona al usuario para eliminar sus advertencias*\n\n📌 *Ejemplo:*\n${usedPrefix + command} @usuario`)

  let user = global.db.data.users[mentioned]
  if (!user || !user.warns) {
    return m.reply(`✅ *El usuario no tiene advertencias*`)
  }

  delete user.warns

  let msg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
  msg += `> ✅ *ADVERTENCIAS ELIMINADAS* ✅\n\n`
  msg += `✦ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ✦\n`
  msg += `> 👤 *Usuario:* @${mentioned.split('@')[0]}\n`
  msg += `> 📊 *Advertencias:* 0\n\n`
  msg += `👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n`
  msg += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`

  await conn.sendMessage(m.chat, { text: msg, mentions: [mentioned] })
  await global.db.write()
}

handler.help = ['resetsentencia @usuario']
handler.tags = ['grupo']
handler.command = ['resetsentencia', 'resetwarn', 'quitarwarn']
handler.group = true
handler.admin = true

export default handler