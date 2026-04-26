const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `🌸 *— ✧ 𝐏𝐑𝐎𝐌𝐎𝐓𝐄 ✧ —* 🌸

> 🎀 *Menciona o responde al mensaje*
> 💗 *De la usuaria que deseas promover*

🌸 *"Ania Bot reconoce el poder de sus guerreras"* 🌸`;
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) });
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
  m.reply(`🌸 *— ✧ 𝐏𝐑𝐎𝐌𝐎𝐓𝐄 ✧ —* 🌸

> 🎀 *✅ Usuaria promovida a administradora*
> 💗 *"Una nueva líder emerge en la comunidad"*

🌸 *Ania Bot siempre contigo* 🌸`);
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;

export default handler;