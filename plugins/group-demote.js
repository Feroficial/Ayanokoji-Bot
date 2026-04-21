const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*《 🎭  𝐃𝐄𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ Menciona o responde al mensaje del usuario que deseas degradar de administrador.\n\n*"El poder puede desaparecer en cualquier momento"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) });
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
  m.reply(`*《 🎭  𝐃𝐄𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ ✅ El usuario fue degradado de administrador.\n\n*"El poder ha sido arrebatado, la jerarquía cambia"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
};

handler.help = ['demote'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar'];
handler.group = true;
handler.admin = true;

export default handler;
