const handler = async (m, { conn, usedPrefix }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*《 🎭  𝐃𝐄𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix}demote @usuario\n➤ *Ejemplo:* ${usedPrefix}demote @usuario\n\n*"Menciona o responde al mensaje del usuario que deseas degradar."*\n\n*"El poder puede desaparecer en cualquier momento"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;
    return m.reply(texto);
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    m.reply(`*《 🎭  𝐃𝐄𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Usuario:* @${user.split('@')[0]}\n➤ *Acción:* ❌ REMOVIDO ADMINISTRADOR\n\n*"El poder ha sido arrebatado, la jerarquía cambia"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, { mentions: [user] });
  } catch (e) {
    m.reply(`*《 🎭  𝐃𝐄𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Error:* ${e.message}\n\n*"El sistema ha fallado, pero el aula continúa"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['demote'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
