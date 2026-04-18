let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  // Verificar si el bot es admin usando un método más ligero
  let isBotAdmin = false;
  try {
    // Usar el objeto del grupo que ya está en caché
    const group = await conn.groupMetadata(m.chat).catch(() => null);
    if (group) {
      const botJid = conn.user.jid;
      isBotAdmin = group.participants.some(p => p.id === botJid && (p.admin === 'admin' || p.admin === 'superadmin'));
    }
  } catch (e) {
    console.log('Error verificando admin:', e.message);
  }
  
  if (!isBotAdmin) return m.reply('❌ *El bot necesita ser administrador del grupo*');

  if (!text) {
    return m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *CERRAR GRUPO*

📌 *Uso:* ${usedPrefix + command} <tiempo>

📌 *Ejemplos:*
• ${usedPrefix + command} 30m → Cierra 30 minutos
• ${usedPrefix + command} 2h → Cierra 2 horas

👑 *DevLyonn*`);
  }

  let tiempo = text.toLowerCase();
  let segundos = 0;
  let unidadTexto = '';
  
  if (tiempo.includes('m')) {
    let minutos = parseInt(tiempo);
    if (isNaN(minutos)) return m.reply('❌ *Número inválido*');
    segundos = minutos * 60;
    unidadTexto = `${minutos} minuto(s)`;
  } 
  else if (tiempo.includes('h')) {
    let horas = parseInt(tiempo);
    if (isNaN(horas)) return m.reply('❌ *Número inválido*');
    segundos = horas * 3600;
    unidadTexto = `${horas} hora(s)`;
  }
  else {
    let horas = parseInt(tiempo);
    if (isNaN(horas)) return m.reply('❌ *Usa: 30m, 2h*');
    segundos = horas * 3600;
    unidadTexto = `${horas} hora(s)`;
  }

  // Cerrar grupo
  try {
    await conn.groupSettingUpdate(m.chat, 'announcement');
  } catch (e) {
    return m.reply(`❌ *Error al cerrar el grupo*\n> ${e.message}`);
  }
  
  await m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *GRUPO CERRADO* 🔒

> 📌 *Solo administradores pueden enviar mensajes*
> ⏰ *Duración: ${unidadTexto}*
> 🔄 *Se abrirá automáticamente*

👑 *DevLyonn*`);

  // Programar apertura automática
  setTimeout(async () => {
    try {
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      await conn.sendMessage(m.chat, { text: `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO REABIERTO* 🔓

> 📌 *Han pasado ${unidadTexto}*
> 🔓 *El grupo vuelve a la normalidad*

👑 *DevLyonn*` });
    } catch (e) {
      console.log('Error al reabrir:', e.message);
    }
  }, segundos * 1000);
};

handler.help = ['cerrar <tiempo>'];
handler.tags = ['admin'];
handler.command = /^(cerrar|lock)$/i;
handler.group = true;
export default handler;