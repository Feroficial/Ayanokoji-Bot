let handler = async (m, { args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('🌸 Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('🌸 Solo administradoras');

  const chat = global.db.data.chats[m.chat];

  if (args.length === 0) {
    const estado = chat.antiInsultos ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐈𝐍𝐒𝐔𝐋𝐓𝐎𝐒 ✧ —* 🌸\n\n> 🎀 *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}antiinsultos on - Activar\n• ${usedPrefix}antiinsultos off - Desactivar\n\n🌸 *"El respeto hace lindo el grupo"* 🌸`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.antiInsultos = true;
    m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐈𝐍𝐒𝐔𝐋𝐓𝐎𝐒 ✧ —* 🌸\n\n> 🎀 *ANTIINSULTOS ACTIVADO*\n> 💗 *Las palabras hirientes serán castigadas*\n\n🌸 *"Hablemos bonito"* 🌸`);
  } else if (action === 'off') {
    chat.antiInsultos = false;
    m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐈𝐍𝐒𝐔𝐋𝐓𝐎𝐒 ✧ —* 🌸\n\n> 🎀 *ANTIINSULTOS DESACTIVADO*\n> 💗 *Los insultos ya no serán castigados*\n\n🌸 *"Cuida tu lenguaje"* 🌸`);
  } else {
    m.reply(`🌸 *Uso:* ${usedPrefix}antiinsultos on/off`);
  }
};

handler.help = ['antiinsultos <on/off>'];
handler.tags = ['group'];
handler.command = /^(antiinsultos|ainsultos)$/i;
handler.group = true;
export default handler;