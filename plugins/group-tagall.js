let handler = async (m, { conn, text, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos')
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores')

  await m.react('🎭')

  let groupMetadata = await conn.groupMetadata(m.chat)
  let participants = groupMetadata.participants
  let memberCount = participants.length
  let message = text || '📢 *ATENCIÓN A TODOS* 📢'
  
  let list = []
  for (let i = 0; i < participants.length; i++) {
    let jid = participants[i].id
    list.push(`➤ @${jid.split('@')[0]}`)
  }
  
  let totalList = list.join('\n')
  
  let caption = `*《 🎭  𝐓𝐀𝐆𝐀𝐋𝐋  🗡️ 》*\n\n${message}\n\n👥 *Miembros:* ${memberCount}\n\n${totalList}\n\n*"El aula de élite ha hablado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
  
  await conn.sendMessage(m.chat, { text: caption, mentions: participants.map(p => p.id) })
  await m.react('✅')
}

handler.help = ['tagall <mensaje>']
handler.tags = ['group']
handler.command = /^(tagall|invocar|mentionall|todos)$/i
handler.group = true
handler.admin = true

export default handler