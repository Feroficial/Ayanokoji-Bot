let handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) return m.reply('❌ Solo DevLyonn puede usar esto');

  if (!text) return m.reply(`❌ Uso: ${usedPrefix + command} numero rango\n\nEjemplo: ${usedPrefix + command} 591123456789 🛡️ Guardián`);

  let args = text.split(' ');
  let number = args[0].replace(/[^0-9]/g, '');
  let rango = args.slice(1).join(' ') || '🛡️ Asistente';

  if (number.length < 10) return m.reply('❌ Número inválido');

  if (number === '59177474230') return m.reply('❌ No puedes agregarte a ti mismo');

  // Verificar si ya existe
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
  
  if (yaExiste) return m.reply(`⚠️ *${number}* ya es asistente`);

  // Agregar
  if (!global.owner) global.owner = [];
  global.owner.push([number, rango, true]);
  if (!global.mods) global.mods = [];
  if (!global.prems) global.prems = [];
  global.mods.push(number);
  global.prems.push(number);

  m.reply(`✅ *${number} ahora es asistente*\n🏆 Rango: ${rango}`);
};

handler.help = ['agregar <numero> <rango>'];
handler.tags = ['owner'];
handler.command = /^(agregar|addcoowner|darowner)$/i;
handler.rowner = true;
export default handler;