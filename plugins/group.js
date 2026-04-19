let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  // Responder primero para saber que llegó
  await m.reply('🔄 *Procesando comando...*');
  
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner) return m.reply('❌ Solo administradores');

  if (!text) {
    return m.reply(`🔒 *CERRAR GRUPO*\n\nUso: #cerrar 30m\nEjemplos:\n#cerrar 30m = 30 minutos\n#cerrar 2h = 2 horas`);
  }

  let tiempo = text.toLowerCase();
  let segundos = 0;
  let texto = '';
  
  if (tiempo.includes('m')) {
    let min = parseInt(tiempo);
    if (isNaN(min)) return m.reply('❌ Número inválido');
    segundos = min * 60;
    texto = `${min} minutos`;
  } else {
    let horas = parseInt(tiempo);
    if (isNaN(horas)) return m.reply('❌ Usa: 30m o 2h');
    segundos = horas * 3600;
    texto = `${horas} horas`;
  }

  try {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    await m.reply(`🔒 *GRUPO CERRADO*\n> Solo admins pueden hablar\n> ⏰ Duración: ${texto}`);
    
    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(m.chat, 'not_announcement');
        await conn.sendMessage(m.chat, { text: `🔓 *GRUPO REABIERTO*\n> Pasaron ${texto}` });
      } catch(e) {}
    }, segundos * 1000);
    
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
  }
};

handler.command = /^(cerrar|lock)$/i;
handler.group = true;
export default handler;