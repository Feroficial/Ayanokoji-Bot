let handler = async (m, { conn, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  await m.reply('⏳ *Analizando actividad del grupo...*');

  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    
    // Obtener mensajes recientes (últimos 7 días)
    const ahora = Date.now();
    const unaSemana = 7 * 24 * 60 * 60 * 1000;
    const limiteTiempo = ahora - unaSemana;
    
    let inactivos = [];
    let activos = [];
    
    // Analizar cada participante
    for (let participant of participants) {
      const jid = participant.id;
      const userData = global.db.data.users[jid];
      const lastMsg = userData?.lastMsg || 0;
      const name = userData?.name || jid.split('@')[0];
      
      if (lastMsg < limiteTiempo) {
        inactivos.push({ jid, name, lastMsg });
      } else {
        activos.push({ jid, name, lastMsg });
      }
    }
    
    // Ordenar inactivos (los más antiguos primero)
    inactivos.sort((a, b) => a.lastMsg - b.lastMsg);
    
    // Ordenar activos (los más recientes primero)
    activos.sort((a, b) => b.lastMsg - a.lastMsg);
    
    let texto = `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n`;
    
    // Mostrar inactivos
    texto += `💀 *MIEMBROS INACTIVOS* 💀\n`;
    texto += `> (últimos 7 días sin mensajes)\n\n`;
    
    if (inactivos.length === 0) {
      texto += `> ✨ *¡Todos los miembros están activos!*\n\n`;
    } else {
      for (let i = 0; i < inactivos.length; i++) {
        const user = inactivos[i];
        const diasInactivo = Math.floor((ahora - user.lastMsg) / (24 * 60 * 60 * 1000));
        texto += `> ${i + 1}. @${user.jid.split('@')[0]} → ${diasInactivo} días sin hablar\n`;
      }
    }
    
    texto += `\n🔥 *MIEMBROS ACTIVOS* 🔥\n`;
    texto += `> (últimos 7 días)\n\n`;
    
    if (activos.length === 0) {
      texto += `> ❌ *No hay miembros activos*\n`;
    } else {
      for (let i = 0; i < activos.length; i++) {
        const user = activos[i];
        texto += `> ${i + 1}. @${user.jid.split('@')[0]}\n`;
      }
    }
    
    texto += `\n👑 *DevLyonn*`;
    
    const mentions = [...inactivos.map(i => i.jid), ...activos.map(a => a.jid)];
    await conn.sendMessage(m.chat, { text: texto, mentions });
    
  } catch (e) {
    console.error(e);
    m.reply(`❌ *Error:* ${e.message}`);
  }
};

handler.help = ['topinactivos'];
handler.tags = ['group'];
handler.command = /^(topinactivos|inactivos|inactive)$/i;
handler.group = true;
export default handler;