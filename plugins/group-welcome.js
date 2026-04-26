let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('🌸 Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('🌸 Solo administradoras');

  const chat = global.db.data.chats[m.chat];

  if (args.length === 0) {
    const estado = chat.welcome ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    return m.reply(`🌸 *— ✧ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 ✧ —* 🌸\n\n> 🎀 *Estado:* ${estado}\n\n*Comandos:*\n• ${usedPrefix}welcome on - Activar bienvenida\n• ${usedPrefix}welcome off - Desactivar bienvenida\n\n🌸 *"Ania Bot da la bienvenida a las nuevas guerreras"* 🌸`);
  }

  const action = args[0].toLowerCase();
  if (action === 'on') {
    chat.welcome = true;
    m.reply(`🌸 *— ✧ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 ✧ —* 🌸\n\n> 🎀 *BIENVENIDA ACTIVADA*\n> 💗 *Las nuevas miembros recibirán un mensaje de bienvenida*\n\n🌸 *"El grupo crece con nuevas integrantes"* 🌸`);
  } else if (action === 'off') {
    chat.welcome = false;
    m.reply(`🌸 *— ✧ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 ✧ —* 🌸\n\n> 🎀 *BIENVENIDA DESACTIVADA*\n> 💗 *Las nuevas miembros ya no recibirán bienvenida*\n\n🌸 *"Bienvenidas desactivadas"* 🌸`);
  } else {
    m.reply(`🌸 *Uso:* ${usedPrefix}welcome on/off`);
  }
};

handler.help = ['welcome <on/off>'];
handler.tags = ['group'];
handler.command = /^(welcome|bienvenida)$/i;
handler.group = true;
export default handler;