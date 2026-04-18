let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  // Verificar si hay tiempo
  if (!text) {
    return m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *ABRIR/CERRAR GRUPO*

📌 *Uso:* ${usedPrefix + command} <horas>

📌 *Ejemplos:*
• ${usedPrefix + command} 2 → Cierra por 2 horas
• ${usedPrefix + command} 0 → Abre el grupo ahora

⏰ *El grupo se reabrirá automáticamente*
👑 *DevLyonn*`);
  }

  const horas = parseInt(text);
  if (isNaN(horas)) return m.reply('❌ *Ingresa un número válido de horas*');

  const isBotAdmin = (await conn.groupMetadata(m.chat)).participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  if (!isBotAdmin) return m.reply('❌ *El bot necesita ser administrador*');

  if (horas === 0) {
    // Abrir grupo
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO ABIERTO* 🔓

> 📌 *Cualquier miembro puede enviar mensajes*
> ⏰ *Modo: Totalmente abierto*

👑 *DevLyonn*`);
  } else {
    // Cerrar grupo por X horas
    const minutos = horas * 60;
    const segundos = minutos * 60;
    
    await conn.groupSettingUpdate(m.chat, 'announcement');
    
    m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *GRUPO CERRADO* 🔒

> 📌 *Solo administradores pueden enviar mensajes*
> ⏰ *Duración: ${horas} hora(s)*
> 🔄 *Se reabrirá automáticamente*

👑 *DevLyonn*`);

    // Programar apertura automática
    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(m.chat, 'not_announcement');
        await conn.sendMessage(m.chat, { text: `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO REABIERTO* 🔓

> 📌 *Han pasado ${horas} hora(s)*
> 🔓 *El grupo vuelve a la normalidad*

👑 *DevLyonn*` });
      } catch (e) {
        console.error('Error al reabrir grupo:', e);
      }
    }, segundos * 1000);
  }
};

handler.help = ['lockgroup <horas>'];
handler.tags = ['group'];
handler.command = /^(lockgroup|cerrargrupo|abrirgrupo|grupolock)$/i;
handler.group = true;
export default handler;