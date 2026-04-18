let handler = async (m, { conn, text, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  // Verificar si el bot es admin (método CORREGIDO)
  let isBotAdmin = false;
  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const botJid = conn.user.jid;
    const botParticipant = groupMetadata.participants.find(v => v.id === botJid);
    isBotAdmin = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin';
  } catch (e) {
    console.log('Error verificando admin:', e);
  }
  
  if (!isBotAdmin) return m.reply('❌ *El bot necesita ser administrador del grupo*');

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
    return m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> 🔓 *GRUPO ABIERTO* 🔓

> 📌 *Todos los miembros pueden enviar mensajes*

👑 *DevLyonn*`);
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
    } catch (e) {
      console.log('Error al reabrir:', e);
    }
  }, segundos * 1000);
};

handler.help = ['lockgroup <tiempo>'];
handler.tags = ['group'];
handler.command = /^(lockgroup|cerrar|abrirgrupo|grupo)$/i;
handler.group = true;
export default handler;