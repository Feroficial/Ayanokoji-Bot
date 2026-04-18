let handler = async (m, { conn, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  // Verificar si el bot es admin
  const grupo = await conn.groupMetadata(m.chat);
  const botEsAdmin = grupo.participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  
  if (!botEsAdmin) return m.reply('❌ *El bot necesita ser administrador*');

  // Abrir grupo
  await conn.groupSettingUpdate(m.chat, 'not_announcement');
  
  m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO ABIERTO* 🔓

> 📌 *Todos los miembros pueden enviar mensajes*

👑 *DevLyonn*`);
};

handler.help = ['abrir'];
handler.tags = ['admin'];
handler.command = /^(abrir|opengroup|abregrupo)$/i;
handler.group = true;
export default handler;