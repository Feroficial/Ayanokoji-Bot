const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*《 🎭  𝐊𝐈𝐂𝐊  🗡️ 》*\n\n➤ Menciona o responde al mensaje del usuario que deseas expulsar del grupo.\n\n*"El aula de élite no tiene lugar para los débiles"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) });
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
  m.reply(`*《 🎭  𝐊𝐈𝐂𝐊  🗡️ 》*\n\n➤ ✅ El usuario fue expulsado del grupo.\n\n*"La clase A no perdona la mediocridad"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar', 'sacar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
