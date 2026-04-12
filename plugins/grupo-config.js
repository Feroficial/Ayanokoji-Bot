let handler = async (m, { conn, usedPrefix, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('Este comando solo funciona en grupos');
  
  const chat = global.db.data.chats[m.chat];
  
  const configText = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n\n> ⚙️ *CONFIGURACIÓN DEL GRUPO*\n\n> 🎉 *Bienvenida:* ${chat.welcome ? '✅ Activada' : '❌ Desactivada'}\n> 🔗 *AntiLink:* ${chat.antiLink ? '✅ Activado' : '❌ Desactivado'}\n> 🤖 *AntiBot:* ${chat.antiBot ? '✅ Activado' : '❌ Desactivado'}\n> 🛡️ *Modo Admin:* ${chat.modoadmin ? '✅ Activado' : '❌ Desactivado'}\n> 🔞 *NSFW:* ${chat.nsfw ? '✅ Activado' : '❌ Desactivado'}\n> 🎭 *Autosticker:* ${chat.autosticker ? '✅ Activado' : '❌ Desactivado'}\n\n> 📌 *Comandos disponibles:*\n> • ${usedPrefix}welcome on/off\n> • ${usedPrefix}antilink on/off\n> • ${usedPrefix}antibot on/off\n\n👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`;
  
  m.reply(configText);
};

handler.help = ['groupconfig'];
handler.tags = ['group'];
handler.command = /^(groupconfig|configgrupo|grupo config)$/i;
handler.group = true;

export default handler;