const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ Menciona o responde al mensaje del usuario que deseas promover a administrador.\n\n*"El aula de élite reconoce el poder de sus guerreros"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) });
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
  m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ ✅ El usuario fue promovido a administrador.\n\n*"Un nuevo líder emerge en el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;

export default handler;
