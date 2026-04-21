let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (args.length === 0) {
    const estado = chat.welcome ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`*《 🎭  𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}welcome on - Activar bienvenida\n• ${usedPrefix}welcome off - Desactivar bienvenida\n\n*"El aula de élite da la bienvenida a los nuevos guerreros"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.welcome = true;
    m.reply(`*《 🎭  𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *BIENVENIDA ACTIVADA*\n\n*"Los nuevos miembros recibirán un mensaje de bienvenida"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } else if (action === 'off') {
    chat.welcome = false;
    m.reply(`*《 🎭  𝐖𝐄𝐋𝐂𝐎𝐌𝐄  🗡️ 》*\n\n➤ *BIENVENIDA DESACTIVADA*\n\n*"Los nuevos miembros ya no recibirán bienvenida"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } else {
    m.reply(`⚠️ Usa: ${usedPrefix}welcome on/off`);
  }
};

handler.help = ['welcome <on/off>'];
handler.tags = ['group'];
handler.command = /^(welcome|bienvenida)$/i;
handler.group = true;
export default handler;