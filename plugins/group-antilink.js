let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('🌸 Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('🌸 Solo administradoras');

  const chat = global.db.data.chats[m.chat];

  if (args.length === 0) {
    const estado = chat.antiLink ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 ✧ —* 🌸\n\n> 🎀 *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}antilink on - Activar\n• ${usedPrefix}antilink off - Desactivar\n\n🌸 *"Ania Bot protege el grupo"* 🌸`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.antiLink = true;
    m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 ✧ —* 🌸\n\n> 🎀 *ANTILINK ACTIVADO*\n> 💗 *Los enlaces prohibidos serán eliminados*\n\n🌸 *"El grupo está protegido"* 🌸`);
  } else if (action === 'off') {
    chat.antiLink = false;
    m.reply(`🌸 *— ✧ 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 ✧ —* 🌸\n\n> 🎀 *ANTILINK DESACTIVADO*\n> 💗 *Los enlaces ya no serán bloqueados*\n\n🌸 *"Protección desactivada"* 🌸`);
  } else {
    m.reply(`🌸 *Uso:* ${usedPrefix}antilink on/off`);
  }
};

handler.help = ['antilink <on/off>'];
handler.tags = ['group'];
handler.command = /^(antilink|alink)$/i;
handler.group = true;
export default handler;