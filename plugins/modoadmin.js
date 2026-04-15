let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (args.length === 0) {
    const estado = chat.modoadmin ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`—͟͟͞͞   *🜸 MODO ADMIN 🜸* —͟͟͞͞\n\n> 📊 *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}modoadmin on - Solo admins usan comandos\n• ${usedPrefix}modoadmin off - Todos usan comandos\n\n> 🔒 *On:* Solo admins pueden usar comandos\n> 🔓 *Off:* Todos pueden usar comandos`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.modoadmin = true;
    m.reply('✅ *MODO ADMIN ACTIVADO*\n\n> 🔒 *Solo los administradores pueden usar comandos*');
  } else if (action === 'off') {
    chat.modoadmin = false;
    m.reply('❌ *MODO ADMIN DESACTIVADO*\n\n> 🔓 *Todos los miembros pueden usar comandos*');
  } else {
    m.reply(`⚠️ Usa: ${usedPrefix}modoadmin on/off`);
  }
};

handler.help = ['modoadmin <on/off>'];
handler.tags = ['group'];
handler.command = /^(modoadmin|modoadmin)$/i;
handler.group = true;
export default handler;