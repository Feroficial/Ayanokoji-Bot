let handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) return m.reply('❌ Solo DevLyonn puede usar esto');

  let userJid = m.mentionedJid[0];
  if (!userJid) return m.reply(`❌ Uso: ${usedPrefix + command} @usuario rango\n\nEjemplo: ${usedPrefix + command} @591123456789 🛡️ Guardián`);

  let rango = text.replace(`@${userJid.split('@')[0]}`, '').trim();
  if (!rango) rango = '🛡️ Asistente';

  // Limpiar número - solo números
  let number = userJid.split('@')[0].replace(/[^0-9]/g, '');
  
  // No agregar al creador
  if (number === '59177474230') return m.reply('❌ No puedes agregarte a ti mismo');

  // Verificar si ya existe en owner (solo números)
  let yaExiste = false;
  if (global.owner) {
    for (let ow of global.owner) {
      let owNumber = String(ow[0]).replace(/[^0-9]/g, '');
      if (owNumber === number) {
        yaExiste = true;
        break;
      }
    }
  }
  
  if (yaExiste) return m.reply(`⚠️ @${number} ya es asistente`, { mentions: [userJid] });

  // Agregar al owner en formato simple (solo número)
  if (!global.owner) global.owner = [];
  global.owner.push([number, rango, true]);
  
  // Agregar a mods y prems
  if (!global.mods) global.mods = [];
  if (!global.prems) global.prems = [];
  global.mods.push(number);
  global.prems.push(number);

  // Limpiar duplicados del owner
  let ownerUnicos = [];
  let numerosVistos = new Set();
  for (let ow of global.owner) {
    let num = String(ow[0]).replace(/[^0-9]/g, '');
    if (!numerosVistos.has(num)) {
      numerosVistos.add(num);
      ownerUnicos.push(ow);
    }
  }
  global.owner = ownerUnicos;

  m.reply(`✅ *@${number} ahora es asistente*\n🏆 Rango: ${rango}`, { mentions: [userJid] });
};

handler.help = ['agregar @user <rango>'];
handler.tags = ['owner'];
handler.command = /^(agregar|addcoowner|darowner)$/i;
handler.rowner = true;
export default handler;