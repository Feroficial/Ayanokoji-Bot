const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let text = `*Mention or reply to the user you want to demote from admin.*`
    return m.reply(text, m.chat, { mentions: conn.parseMention(text) })
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
  m.reply(`*✅ El usuario a sido degrado.*`)
}

handler.help = ['demote']
handler.tags = ['group']
handler.command = ['demote']
handler.group = true
handler.admin = true

export default handler
