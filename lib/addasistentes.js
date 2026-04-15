let handler = async (m, { conn, text, usedPrefix, command, isOwner, isROwner }) => {
  // Solo el creador supremo puede usar este comando
  if (!isOwner && !isROwner) return m.reply('❌ *ACCESO DENEGADO*\n> Solo el creador *DevLyonn* puede usar este comando');

  // Verificar que haya una mención
  if (!m.mentionedJid[0] && !text) {
    return m.reply(`—͟͟͞͞   *🜸 AGREGAR ASISTENTE 🜸* —͟͟͞͞\n\n> 📌 *Uso:* ${usedPrefix + command} @usuario [rango]\n> 📌 *Ejemplo:* ${usedPrefix + command} @DevLyonn "Guardián del Código"\n\n> 👑 *Solo el creador puede usar este comando*`);
  }

  // Obtener el JID del usuario mencionado
  let userJid = m.mentionedJid[0];
  if (!userJid) {
    let regex = /(\d{5,16})/;
    let match = text.match(regex);
    if (match) userJid = match[1] + '@s.whatsapp.net';
    else return m.reply('❌ *Menciona al usuario que quieres hacer asistente*');
  }

  // Obtener el rango (lo que viene después de la mención)
  let rango = text.replace(`@${userJid.split('@')[0]}`, '').trim();
  if (!rango) rango = '🛡️ Asistente de BALDWIND';

  // Normalizar el número (sin @s.whatsapp.net)
  let number = userJid.split('@')[0];
  let numberClean = number.replace(/[^0-9]/g, '');
  
  // Verificar si ya existe en global.owner
  let yaEsOwner = false;
  if (global.owner) {
    for (let ow of global.owner) {
      let owNumber = ow[0]?.replace(/[^0-9]/g, '');
      if (owNumber === numberClean) {
        yaEsOwner = true;
        break;
      }
    }
  }
  
  if (yaEsOwner) {
    return m.reply(`⚠️ *@${number} ya es un asistente o dueño*`, { mentions: [userJid] });
  }

  // Agregar al global.owner con su rango
  if (!global.owner) global.owner = [];
  global.owner.push([numberClean, rango, true]);
  
  // También agregar a global.mods y global.prems
  if (!global.mods) global.mods = [];
  if (!global.prems) global.prems = [];
  global.mods.push(numberClean);
  global.prems.push(numberClean);
  
  // Guardar en archivo config.js
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(process.cwd(), 'baldwind-core', 'config.js');
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Actualizar global.owner
    let ownerStr = JSON.stringify(global.owner, null, 2);
    configContent = configContent.replace(
      /global\.owner = \[[\s\S]*?\];/,
      `global.owner = ${ownerStr};`
    );
    
    // Actualizar global.mods
    let modsStr = JSON.stringify(global.mods, null, 2);
    configContent = configContent.replace(
      /global\.mods = \[[\s\S]*?\];/,
      `global.mods = ${modsStr};`
    );
    
    // Actualizar global.prems
    let premsStr = JSON.stringify(global.prems, null, 2);
    configContent = configContent.replace(
      /global\.prems = \[[\s\S]*?\];/,
      `global.prems = ${premsStr};`
    );
    
    fs.writeFileSync(configPath, configContent);
  } catch(e) {
    console.log('Error guardando en config:', e);
  }

  // Mensaje de éxito
  let mensaje = `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> ✨ *NUEVO ASISTENTE AGREGADO* ✨

> 👤 *Usuario:* @${number}
> 🏆 *Rango:* ${rango}
> 🛡️ *Nivel:* Co-Owner

> 📌 *Ahora tiene acceso a comandos de owner*
> ⚔️ *Bienvenido al equipo de BALDWIND IV*

👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`;

  await conn.sendMessage(m.chat, { text: mensaje, mentions: [userJid] });
  
  // Enviar mensaje privado al nuevo asistente
  try {
    await conn.sendMessage(userJid, {
      text: `—͟͟͞͞   *🜸 BALDWIND IV 🛸* —͟͟͞͞

> ✨ *HAS SIDO NOMBRADO ASISTENTE* ✨

> 🏆 *Tu rango:* ${rango}
> 🛡️ *Nivel:* Co-Owner

> 📌 *Ahora tienes acceso a comandos especiales*
> ⚔️ *Ayuda a mantener el reino de BALDWIND IV*

👑 *🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
    });
  } catch(e) {}
};

handler.help = ['addassistant @user <rango>'];
handler.tags = ['owner'];
handler.command = /^(addassistant|addcoowner|addadmin|setasistente|darowner)$/i;
handler.rowner = true;

export default handler;