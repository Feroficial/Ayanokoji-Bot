let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (args.length === 0) {
    const estado = chat.antiLink ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`*《 🎭  𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊  🗡️ 》*\n\n➤ *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}antilink on - Activar\n• ${usedPrefix}antilink off - Desactivar\n\n*"El aula de élite no tolera enlaces peligrosos"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.antiLink = true;
    m.reply(`*《 🎭  𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊  🗡️ 》*\n\n➤ *ANTILINK ACTIVADO*\n\n*"Los enlaces prohibidos serán eliminados"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } else if (action === 'off') {
    chat.antiLink = false;
    m.reply(`*《 🎭  𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊  🗡️ 》*\n\n➤ *ANTILINK DESACTIVADO*\n\n*"Los enlaces ya no serán bloqueados"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } else {
    m.reply(`⚠️ Usa: ${usedPrefix}antilink on/off`);
  }
};

handler.help = ['antilink <on/off>'];
handler.tags = ['group'];
handler.command = /^(antilink|alink)$/i;
handler.group = true;
export default handler;