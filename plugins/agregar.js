let handler = async (m, { conn }) => {
  if (!global.owner || global.owner.length <= 1) {
    return m.reply('📌 *No hay asistentes registrados*');
  }
  
  let text = `—͟͟͞͞   *🜸 ASISTENTES 🜸* —͟͟͞͞\n\n`;
  let count = 1;
  let mentions = [];
  
  for (let ow of global.owner) {
    let number = ow[0];
    let rango = ow[1] || '🛡️ Asistente';
    if (number !== '59177474230') {
      text += `> ${count}. @${number} → ${rango}\n`;
      mentions.push(`${number}@s.whatsapp.net`); // FORMATO CORRECTO
      count++;
    }
  }
  
  text += `\n👑 *DevLyonn*`;
  await conn.sendMessage(m.chat, { text, mentions });
};

handler.help = ['asistentes'];
handler.tags = ['owner'];
handler.command = /^(asistentes|verasistentes|listowner)$/i;
handler.rowner = true;
export default handler;