let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores');

  let user = m.mentionedJid[0] || m.quoted?.sender || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);
  if (!user) return m.reply(`❌ Uso: ${usedPrefix + command} @usuario`);

  try {
    await conn.groupMakeAdmin(m.chat, [user]);
    m.reply(`✅ *@${user.split('@')[0]} ahora es administrador*`, { mentions: [user] });
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
  }
};

handler.help = ['promote @user'];
handler.tags = ['group'];
handler.command = /^(promote|daradmin)$/i;
handler.group = true;
export default handler;