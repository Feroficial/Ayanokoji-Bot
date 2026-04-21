let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores');

  let user = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  if (!user) return m.reply(`❌ Uso: ${usedPrefix + command} @usuario`);

  let isBotAdmin = (await conn.groupMetadata(m.chat)).participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  if (!isBotAdmin) return m.reply('❌ El bot necesita ser administrador');

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Usuario:* @${user.split('@')[0]}\n➤ *Acción:* 👑 NOMBRADO ADMIN\n\n*"El aula de élite reconoce su poder"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, { mentions: [user] });
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
  }
};

handler.help = ['promote @user'];
handler.tags = ['group'];
handler.command = /^(promote|daradmin)$/i;
handler.group = true;
export default handler;