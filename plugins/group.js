let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  // Verificar si el bot es admin
  const grupo = await conn.groupMetadata(m.chat);
  const botEsAdmin = grupo.participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  
  if (!botEsAdmin) return m.reply('❌ *El bot necesita ser administrador*');

  if (!text) {
    return m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *CERRAR GRUPO*

📌 *Uso:* ${usedPrefix + command} <tiempo>

📌 *Ejemplos:*
• ${usedPrefix + command} 30m → Cierra 30 minutos
• ${usedPrefix + command} 2h → Cierra 2 horas
• ${usedPrefix + command} 1d → Cierra 1 día

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
  else if (tiempo.includes('d')) {
    let dias = parseInt(tiempo);
    if (isNaN(dias)) return m.reply('❌ *Número inválido*');
    segundos = dias * 86400;
    unidadTexto = `${dias} día(s)`;
  }
  else {
    let horas = parseInt(tiempo);
    if (isNaN(horas)) return m.reply('❌ *Usa: 30m, 2h, 1d*');
    segundos = horas * 3600;
    unidadTexto = `${horas} hora(s)`;
  }

  // Cerrar grupo
  await conn.groupSettingUpdate(m.chat, 'announcement');
  
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
    } catch (e) {}
  }, segundos * 1000);
};

handler.help = ['cerrar <tiempo>'];
handler.tags = ['group'];
handler.command = /^(cerrar|lockgroup|cierra)$/i;
handler.group = true;
export default handler;