let handler = async (m, { conn, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  // Verificar si el bot es admin de forma ligera
  let isBotAdmin = false;
  try {
    const group = await conn.groupMetadata(m.chat).catch(() => null);
    if (group) {
      const botJid = conn.user.jid;
      isBotAdmin = group.participants.some(p => p.id === botJid && (p.admin === 'admin' || p.admin === 'superadmin'));
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  if (!isBotAdmin) return m.reply('❌ *El bot necesita ser administrador del grupo*');

  // Abrir grupo
  try {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
  } catch (e) {
    return m.reply(`❌ *Error al abrir el grupo*\n> ${e.message}`);
  }
  
  m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO ABIERTO* 🔓

> 📌 *Todos los miembros pueden enviar mensajes*

👑 *DevLyonn*`);
};

handler.help = ['abrir'];
handler.tags = ['admin'];
handler.command = /^(abrir|open)$/i;
handler.group = true;
export default handler;