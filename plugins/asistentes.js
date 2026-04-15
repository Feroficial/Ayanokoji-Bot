let handler = async (m, { conn }) => {
  let ownerLimpio = [];
  let numerosVistos = new Set();
  
  if (global.owner) {
    for (let ow of global.owner) {
      let num = String(ow[0]).replace(/[^0-9]/g, '');
      if (!numerosVistos.has(num) && num !== '59177474230') {
        numerosVistos.add(num);
        ownerLimpio.push([num, ow[1] || '🛡️ Asistente']);
      }
    }
  }
  
  if (ownerLimpio.length === 0) {
    return m.reply('📌 *No hay asistentes registrados*');
  }
  
  let text = `—͟͟͞͞   *🜸 ASISTENTES 🜸* —͟͟͞͞\n\n`;
  let count = 1;
  
  for (let ow of ownerLimpio) {
    text += `> ${count}. ${ow[0]} → ${ow[1]}\n`;
    count++;
  }
  
  text += `\n👑 *DevLyonn*`;
  m.reply(text);
};

handler.help = ['asistentes'];
handler.tags = ['owner'];
handler.command = /^(asistentes|verasistentes|listowner)$/i;
handler.rowner = true;
export default handler;