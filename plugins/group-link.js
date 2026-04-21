let handler = async (m, { conn, usedPrefix, command, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores');

  let isBotAdmin = (await conn.groupMetadata(m.chat)).participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  if (!isBotAdmin) return m.reply('❌ El bot necesita ser administrador');

  try {
    let link = await conn.groupInviteCode(m.chat);
    let grupo = await conn.groupMetadata(m.chat);
    m.reply(`*《 🎭  𝐋𝐈𝐍𝐊  🗡️ 》*\n\n➤ *Grupo:* ${grupo.subject}\n➤ *Link:* https://chat.whatsapp.com/${link}\n\n*"Comparte el enlace con sabiduría"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
  }
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = /^(link|enlace|invite)$/i;
handler.group = true;
export default handler;