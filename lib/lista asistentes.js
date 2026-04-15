let handler = async (m, { conn }) => {
  if (!global.owner || global.owner.length === 0) {
    return m.reply('📌 *No hay asistentes registrados*');
  }
  
  let text = `—͟͟͞͞   *🜸 ASISTENTES DE BALDWIND IV 🛸* —͟͟͞͞\n\n`;
  
  let count = 1;
  for (let ow of global.owner) {
    let number = ow[0];
    let rango = ow[1] || '🛡️ Asistente';
    let isMainOwner = (number === '59177474230');
    
    if (!isMainOwner) {
      text += `> ${count}. 👤 *@${number}*\n> 🏆 *Rango:* ${rango}\n> 🛡️ *Nivel:* Co-Owner\n\n`;
      count++;
    }
  }
  
  if (count === 1) {
    text += '> 📌 *No hay asistentes registrados aún*\n';
  }
  
  text += `👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`;
  
  let mentions = [];
  for (let ow of global.owner) {
    if (ow[0] !== '59177474230') {
      mentions.push(`${ow[0]}@s.whatsapp.net`);
    }
  }
  
  await conn.sendMessage(m.chat, { text, mentions });
};

handler.help = ['asistentes'];
handler.tags = ['owner'];
handler.command = /^(asistentes|assistants|coowners|listassistants)$/i;

export default handler;