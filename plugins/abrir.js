let handler = async (m, { conn, isAdmin, isOwner }) => {
  await m.reply('🔄 *Abriendo grupo...*');
  
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner) return m.reply('❌ Solo administradores');

  try {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply('🔓 *GRUPO ABIERTO*\n> Todos pueden enviar mensajes');
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
  }
};

handler.command = /^(abrir|open)$/i;
handler.group = true;
export default handler;