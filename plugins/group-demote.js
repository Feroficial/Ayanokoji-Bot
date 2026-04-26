const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `🌸 *— ✧ 𝐃𝐄𝐌𝐎𝐓𝐄 ✧ —* 🌸\n\n> 🎀 *Menciona o responde al mensaje*\n> 💗 *De la usuaria que deseas degradar*\n\n🌸 *"Ania Bot administra el poder"* 🌸`;
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) });
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
  m.reply(`🌸 *— ✧ 𝐃𝐄𝐌𝐎𝐓𝐄 ✧ —* 🌸\n\n> 🎀 *✅ Usuaria degradada de administradora*\n> 💗 *"El poder ha cambiado de manos"*\n\n🌸 *Ania Bot siempre contigo* 🌸`);
};

handler.help = ['demote'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar'];
handler.group = true;
handler.admin = true;

export default handler;