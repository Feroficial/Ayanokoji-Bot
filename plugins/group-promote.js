const handler = async (m, { conn, usedPrefix }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix}promote @usuario\n➤ *Ejemplo:* ${usedPrefix}promote @usuario\n\n*"Menciona o responde al mensaje del usuario que deseas promover a administrador."*\n\n*"El aula de élite reconoce el poder de sus guerreros"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;
    return m.reply(texto);
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Usuario:* @${user.split('@')[0]}\n➤ *Acción:* 👑 NOMBRADO ADMINISTRADOR\n\n*"Un nuevo líder emerge en el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, { mentions: [user] });
  } catch (e) {
    m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Error:* ${e.message}\n\n*"El sistema ha fallado, pero el aula continúa"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
