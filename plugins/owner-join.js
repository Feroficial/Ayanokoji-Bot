let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <link>\n➤ *Ejemplo:* ${usedPrefix + command} https://chat.whatsapp.com/xxxxx\n\n*"El enlace es la llave para entrar al aula"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  try {
    let [_, code] = text.match(linkRegex) || [];
    if (!code) return m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ ❌ Enlace inválido.\n\n*"El código ha sido corrompido"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    
    let res = await conn.groupAcceptInvite(code);
    m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ ✅ Me uní correctamente al grupo.\n\n*"Un nuevo territorio para el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  } catch {
    m.reply(`*《 🎭  𝐉𝐎𝐈𝐍  🗡️ 》*\n\n➤ ❌ Ocurrió un error.\n\n*"El enlace ha sido bloqueado o es inválido"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['join <link>'];
handler.tags = ['owner'];
handler.command = ['join', 'entrar', 'unirse'];
handler.rowner = true;

export default handler;
