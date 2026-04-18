let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const isBotAdmin = (await conn.groupMetadata(m.chat)).participants.find(v => v.id === conn.user.jid)?.admin === 'admin';
  if (!isBotAdmin) return m.reply('❌ *El bot necesita ser administrador*');

  if (!text) {
    return m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔒 *ABRIR/CERRAR GRUPO*

📌 *Uso:*
• ${usedPrefix + command} 30m → Cierra 30 minutos
• ${usedPrefix + command} 2h → Cierra 2 horas
• ${usedPrefix + command} 0 → Abre el grupo

👑 *DevLyonn*`);
  }

  let tiempo = text.toLowerCase();
  
  // ABRIR GRUPO
  if (tiempo === '0' || tiempo === 'abrir' || tiempo === 'open') {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    return m.reply(`🔓 *GRUPO ABIERTO*\n> Todos pueden enviar mensajes`);
  }

  // CERRAR GRUPO
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
    if (isNaN(horas)) return m.reply('❌ *Usa: 30m, 2h, 0*');
    segundos = horas * 3600;
    unidadTexto = `${horas} hora(s)`;
  }

  await conn.groupSettingUpdate(m.chat, 'announcement');
  
  await m.reply(`🔒 *GRUPO CERRADO*\n> Solo admins pueden hablar\n> ⏰ Duración: ${unidadTexto}`);

  setTimeout(async () => {
    try {
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      await conn.sendMessage(m.chat, { text: `🔓 *GRUPO REABIERTO*\n> Han pasado ${unidadTexto}\n> Todos pueden enviar mensajes` });
    } catch (e) {}
  }, segundos * 1000);
};

handler.help = ['lockgroup <tiempo>'];
handler.tags = ['admin'];
handler.command = /^(lockgroup|cerrar|abrirgrupo|grupo)$/i;
handler.group = true;
export default handler;