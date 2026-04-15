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
    
    let activos = [];
    
    // Analizar cada participante
    for (let participant of participants) {
      const jid = participant.id;
      const userData = global.db.data.users[jid];
      const lastMsg = userData?.lastMsg || 0;
      const name = userData?.name || jid.split('@')[0];
      
      if (lastMsg >= limiteTiempo && lastMsg !== 0) {
        activos.push({ jid, name, lastMsg });
      }
    }
    
    // Ordenar activos (los más recientes primero)
    activos.sort((a, b) => b.lastMsg - a.lastMsg);
    
    let texto = `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n`;
    texto += `🔥 *TOP MIEMBROS ACTIVOS* 🔥\n`;
    texto += `> (últimos 7 días)\n\n`;
    
    if (activos.length === 0) {
      texto += `> ❌ *No hay miembros activos en los últimos 7 días*\n`;
    } else {
      for (let i = 0; i < activos.length; i++) {
        const user = activos[i];
        const diasActivo = Math.floor((ahora - user.lastMsg) / (24 * 60 * 60 * 1000));
        texto += `> ${i + 1}. @${user.jid.split('@')[0]} → hace ${diasActivo} días\n`;
      }
    }
    
    texto += `\n👑 *DevLyonn*`;
    
    const mentions = activos.map(a => a.jid);
    await conn.sendMessage(m.chat, { text: texto, mentions });
    
  } catch (e) {
    console.error(e);
    m.reply(`❌ *Error:* ${e.message}`);
  }
};

handler.help = ['topiactivos'];
handler.tags = ['group'];
handler.command = /^(topiactivos|activos|active)$/i;
handler.group = true;
export default handler;