let handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) return m.reply('❌ Solo DevLyonn puede usar esto');

  let userJid = m.mentionedJid[0];
  if (!userJid) return m.reply(`❌ Uso: ${usedPrefix + command} @usuario rango\n\nEjemplo: ${usedPrefix + command} @591123456789 🛡️ Guardián`);

  let rango = text.replace(`@${userJid.split('@')[0]}`, '').trim();
  if (!rango) rango = '🛡️ Asistente';

  let number = userJid.split('@')[0];
  let numberClean = number.replace(/[^0-9]/g, '');
  
  // Verificar que no sea el creador
  if (numberClean === '59177474230') return m.reply('❌ No puedes agregarte a ti mismo');

  // Verificar si ya existe
  let yaExiste = false;
  if (global.owner) {
    for (let ow of global.owner) {
      if (ow[0]?.replace(/[^0-9]/g, '') === numberClean) {
        yaExiste = true;
        break;
      }
    }
  }
  
  if (yaExiste) return m.reply(`⚠️ @${number} ya es asistente`, { mentions: [userJid] });

  // Agregar
  if (!global.owner) global.owner = [];
  global.owner.push([numberClean, rango, true]);
  if (!global.mods) global.mods = [];
  if (!global.prems) global.prems = [];
  global.mods.push(numberClean);
  global.prems.push(numberClean);

  m.reply(`✅ *@${number} ahora es asistente*\n🏆 Rango: ${rango}`, { mentions: [userJid] });
};

handler.command = /^(agregar|addcoowner|darowner)$/i;
handler.help = ["agregar"];
handler.tags = ["owner"];
handler.rowner = true;

export default handler;