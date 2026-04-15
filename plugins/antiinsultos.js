let handler = async (m, { conn, args, usedPrefix, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (args.length === 0) {
    const estado = chat.antiInsultos ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`—͟͟͞͞   *🜸 ANTI INSULTOS 🜸* —͟͟͞͞\n\n> 📊 *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}antiinsultos on - Activar\n• ${usedPrefix}antiinsultos off - Desactivar\n\n> ⚠️ *Los admins y el dueño son inmunes*`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.antiInsultos = true;
    m.reply('✅ *ANTI INSULTOS ACTIVADO*\n\n> Los usuarios que insulten recibirán advertencias\n> A la 3ra advertencia serán expulsados');
  } else if (action === 'off') {
    chat.antiInsultos = false;
    m.reply('❌ *ANTI INSULTOS DESACTIVADO*');
  } else {
    m.reply(`⚠️ Usa: ${usedPrefix}antiinsultos on/off`);
  }
};

handler.help = ['antiinsultos'];
handler.tags = ['group'];
handler.command = /^(antiinsultos|antiinsulto|antinsultos)$/i;
handler.group = true;
export default handler;