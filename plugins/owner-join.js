const handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) return m.reply(`*《 🎭  𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎  🗡️ 》*\n\n➤ Solo el creador puede usar este comando.\n\n*"El aula de élite tiene jerarquías"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  if (!text) return m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <link>\n➤ *Ejemplo:* ${usedPrefix + command} https://chat.whatsapp.com/xxxxx\n\n*"El enlace es la llave para entrar al aula"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  try {
    let code = text.split('https://chat.whatsapp.com/')[1];
    if (!code) return m.reply('❌ Link inválido');
    
    await conn.groupAcceptInvite(code);
    m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ ✅ El bot se unió al grupo exitosamente.\n\n*"Un nuevo territorio para el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } catch (e) {
    m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ ❌ Error: ${e.message}\n\n*"El enlace ha sido bloqueado o es inválido"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['join <link>'];
handler.tags = ['owner'];
handler.command = ['join', 'unirse'];

export default handler;
