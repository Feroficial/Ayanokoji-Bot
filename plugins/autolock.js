let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isROwner, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

  const chat = global.db.data.chats[m.chat];
  
  if (!chat.autoLock) {
    chat.autoLock = { active: false, cierre: 22, apertura: 6 };
  }
  
  if (args[0] === 'on') {
    let cierre = parseInt(args[1]) || 22;
    let apertura = parseInt(args[2]) || 6;
    
    if (cierre < 0 || cierre > 23) return m.reply('❌ Hora de cierre inválida (0-23)');
    if (apertura < 0 || apertura > 23) return m.reply('❌ Hora de apertura inválida (0-23)');
    
    chat.autoLock = {
      active: true,
      cierre: cierre,
      apertura: apertura
    };
    
    m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> ✅ *CIERRE AUTOMÁTICO ACTIVADO*\n\n> 🔒 *Cierra a las:* ${cierre}:00\n> 🔓 *Abre a las:* ${apertura}:00\n\n> 📌 *El bot cerrará y abrirá el grupo automáticamente*\n\n👑 *DevLyonn*`);
    
  } else if (args[0] === 'off') {
    chat.autoLock.active = false;
    m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> ❌ *CIERRE AUTOMÁTICO DESACTIVADO*\n\n> 📌 *El grupo ya no se cerrará automáticamente*\n\n👑 *DevLyonn*`);
    
  } else {
    let estado = chat.autoLock.active ? '✅ ACTIVADO' : '❌ DESACTIVADO';
    let cierre = chat.autoLock.cierre || 22;
    let apertura = chat.autoLock.apertura || 6;
    
    m.reply(`—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> 📌 *CIERRE AUTOMÁTICO*\n\n> 📊 *Estado:* ${estado}\n> 🔒 *Cierre:* ${cierre}:00\n> 🔓 *Apertura:* ${apertura}:00\n\n*Comandos:*\n• ${usedPrefix + command} on 22 6 - Activar\n• ${usedPrefix + command} off - Desactivar\n\n👑 *DevLyonn*`);
  }
};

handler.help = ['autolock <on/off> [cierre] [apertura]'];
handler.tags = ['admin'];
handler.command = /^(autolock|cierreauto|lockauto)$/i;
handler.group = true;
handler.admin = true;

export default handler;