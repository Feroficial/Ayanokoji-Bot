let handler = async (m, { text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (!text) {
    return m.reply(`*《 🎭  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix}setwelcome <mensaje>\n➤ *Ejemplo:* ${usedPrefix}setwelcome Bienvenido @user al grupo\n\n*Variables disponibles:*\n• @user - Nombre del usuario\n• @level - Nivel del usuario\n• @role - Rol del usuario\n• @count - Total de miembros\n• @group - Nombre del grupo\n\n*"Personaliza la bienvenida del aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  if (text.toLowerCase() === 'default') {
    chat.welcomeMessage = null;
    m.reply(`*《 🎭  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *Mensaje restablecido al predeterminado*\n\n*"La bienvenida ha vuelto a su estado original"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } else {
    chat.welcomeMessage = text;
    m.reply(`*《 🎭  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *Nuevo mensaje de bienvenida guardado:*\n\n${text}\n\n*"El aula de élite da la bienvenida a los nuevos guerreros"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = /^(setwelcome|setbienvenida)$/i;
handler.group = true;
export default handler;