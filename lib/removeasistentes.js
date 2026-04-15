let handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  // Solo el creador supremo puede usar este comando
  if (!isOwner && !isROwner) return m.reply('❌ *ACCESO DENEGADO*\n> Solo el creador *DevLyonn* puede usar este comando');

  // Verificar que haya una mención
  if (!m.mentionedJid[0] && !text) {
    return m.reply(`—͟͟͞͞   *🜸 REMOVER ASISTENTE 🜸* —͟͟͞͞\n\n> 📌 *Uso:* ${usedPrefix + command} @usuario\n> 📌 *Ejemplo:* ${usedPrefix + command} @usuario\n\n> 👑 *Solo el creador puede usar este comando*`);
  }

  // Obtener el JID del usuario mencionado
  let userJid = m.mentionedJid[0];
  if (!userJid) {
    let regex = /(\d{5,16})/;
    let match = text.match(regex);
    if (match) userJid = match[1] + '@s.whatsapp.net';
    else return m.reply('❌ *Menciona al usuario que quieres remover*');
  }

  let number = userJid.split('@')[0];
  let numberClean = number.replace(/[^0-9]/g, '');
  
  // Verificar que no sea el creador
  if (numberClean === '59177474230') {
    return m.reply('❌ *No puedes remover al creador supremo*');
  }
  
  // Buscar y eliminar de global.owner
  let encontrado = false;
  if (global.owner) {
    for (let i = 0; i < global.owner.length; i++) {
      let owNumber = global.owner[i][0]?.replace(/[^0-9]/g, '');
      if (owNumber === numberClean) {
        global.owner.splice(i, 1);
        encontrado = true;
        break;
      }
    }
  }
  
  if (!encontrado) {
    return m.reply(`⚠️ *@${number} no es un asistente*`, { mentions: [userJid] });
  }
  
  // Eliminar de global.mods y global.prems
  if (global.mods) {
    let index = global.mods.findIndex(m => m.replace(/[^0-9]/g, '') === numberClean);
    if (index !== -1) global.mods.splice(index, 1);
  }
  
  if (global.prems) {
    let index = global.prems.findIndex(p => p.replace(/[^0-9]/g, '') === numberClean);
    if (index !== -1) global.prems.splice(index, 1);
  }
  
  // Guardar en config.js
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(process.cwd(), 'baldwind-core', 'config.js');
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    configContent = configContent.replace(
      /global\.owner = \[[\s\S]*?\];/,
      `global.owner = ${JSON.stringify(global.owner, null, 2)};`
    );
    configContent = configContent.replace(
      /global\.mods = \[[\s\S]*?\];/,
      `global.mods = ${JSON.stringify(global.mods, null, 2)};`
    );
    configContent = configContent.replace(
      /global\.prems = \[[\s\S]*?\];/,
      `global.prems = ${JSON.stringify(global.prems, null, 2)};`
    );
    fs.writeFileSync(configPath, configContent);
  } catch(e) {}
  
  let mensaje = `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> ⚠️ *ASISTENTE REMOVIDO* ⚠️

> 👤 *Usuario:* @${number}
> 📌 *Ya no tiene acceso a comandos de owner*

👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`;

  await conn.sendMessage(m.chat, { text: mensaje, mentions: [userJid] });
  
  // Notificar al usuario
  try {
    await conn.sendMessage(userJid, {
      text: `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> ⚠️ *HAS SIDO REMOVIDO COMO ASISTENTE* ⚠️

> 📌 *Ya no tienes acceso a comandos de owner*

👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
    });
  } catch(e) {}
};

handler.help = ['removeassistant @user'];
handler.tags = ['owner'];
handler.command = /^(removeassistant|delassistant|delcoowner|removerasistente)$/i;
handler.rowner = true;

export default handler;