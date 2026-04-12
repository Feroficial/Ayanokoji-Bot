let handler = async (m, { conn, args, usedPrefix, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (args.length === 0) {
    const estado = chat.welcome ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    const mensajeActual = chat.welcomeMessage || 'Mensaje por defecto';
    return m.reply(`—͟͟͞͞   *🜸 WELCOME SYSTEM 🜸* —͟͟͞͞

> 📊 *Estado:* ${estado}
> 🎁 *Bonus:* ${chat.welcomeBonus !== false ? '✅ Activado' : '❌ Desactivado'}

> 📌 *Comandos:*
> • ${usedPrefix}welcome on - Activar
> • ${usedPrefix}welcome off - Desactivar
> • ${usedPrefix}welcome bonus on/off - Activar/desactivar bonus
> • ${usedPrefix}setwelcome <texto> - Personalizar mensaje

> 📝 *Variables disponibles:*
> @user - Nombre del usuario
> @level - Nivel del usuario
> @role - Rol del usuario
> @count - Total de miembros
> @group - Nombre del grupo

👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`);
  }

  const action = args[0].toLowerCase();

  if (action === 'on') {
    chat.welcome = true;
    m.reply('✅ *BIENVENIDA ACTIVADA*\n\nLos nuevos miembros recibirán mensaje de bienvenida');
  }
  else if (action === 'off') {
    chat.welcome = false;
    m.reply('❌ *BIENVENIDA DESACTIVADA*');
  }
  else if (action === 'bonus') {
    if (args[1] === 'on') {
      chat.welcomeBonus = true;
      m.reply('✅ *BONUS DE BIENVENIDA ACTIVADO*\n\n+50 monedas y +100 EXP al unirse');
    } else if (args[1] === 'off') {
      chat.welcomeBonus = false;
      m.reply('❌ *BONUS DE BIENVENIDA DESACTIVADO*');
    } else {
      m.reply(`⚠️ Usa: ${usedPrefix}welcome bonus on/off`);
    }
  }
  else {
    m.reply(`⚠️ Comando no reconocido. Usa ${usedPrefix}welcome para ver la ayuda`);
  }
};

handler.help = ['welcome'];
handler.tags = ['group'];
handler.command = /^(welcome|bienvenida)$/i;
handler.group = true;

export default handler;