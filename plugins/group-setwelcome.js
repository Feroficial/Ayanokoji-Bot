let handler = async (m, { text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('🌸 Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('🌸 Solo administradoras');

  const chat = global.db.data.chats[m.chat];

  if (!text) {
    return m.reply(`*《 🌸  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  💗 》*\n\n➤ *Uso:* ${usedPrefix}setwelcome <mensaje>\n➤ *Ejemplo:* ${usedPrefix}setwelcome Bienvenida @user al grupo\n\n*Variables disponibles:*\n• @user - Nombre de la usuaria\n• @level - Nivel de la usuaria\n• @role - Rol de la usuaria\n• @count - Total de miembros\n• @group - Nombre del grupo\n\n*"Personaliza la bienvenida de Ania Bot"*\n*🌸 © 2026 𝐀𝐧𝐢𝐚 𝐁𝐨𝐭 🌸*`);
  }

  if (text.toLowerCase() === 'default') {
    chat.welcomeMessage = null;
    m.reply(`*《 🌸  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  💗 》*\n\n➤ *Mensaje restablecido al predeterminado*\n\n*"La bienvenida ha vuelto a su estado original"*\n*🌸 © 2026 𝐀𝐧𝐢𝐚 𝐁𝐨𝐭 🌸*`);
  } else {
    chat.welcomeMessage = text;
    m.reply(`*《 🌸  𝐒𝐄𝐓𝐖𝐄𝐋𝐂𝐎𝐌𝐄  💗 》*\n\n➤ *Nuevo mensaje de bienvenida guardado:*\n\n${text}\n\n*"Ania Bot da la bienvenida a nuevas guerreras kawaii"*\n*🌸 © 2026 𝐀𝐧𝐢𝐚 𝐁𝐨𝐭 🌸*`);
  }
};

handler.help = ['setwelcome <texto>'];
handler.tags = ['group'];
handler.command = /^(setwelcome|setbienvenida)$/i;
handler.group = true;
export default handler;