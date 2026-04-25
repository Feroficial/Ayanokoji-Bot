import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─🌸─ CONFIGURACIÓN GLOBAL ─🌸─*

// Número del bot
global.botNumber = '';

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
// ========== DETECCIÓN MÚLTIPLE DE LA CREADORA ==========
global.owner = [
  ['5732475517485', '🌸 𝐃𝐀𝐍𝐍𝐘 𝐘𝐔𝐋𝐈𝐄𝐓𝐇 🌸', true],
  ['59177474230', '🎭 𝐃𝐄𝐕𝐋𝐘𝐎𝐍𝐍 🗡️', true],
  ['51923657619', '🛡️ ASISTENTE', true],
  ['529611207992', '⚔️ SUB-PRINCIPAL', true],
  ['584241819270', '🐉 𝐋𝐄𝐎_𝐎𝐅𝐂 🐉', true],
  ['5732475517485'],
  ['5732475517485@s.whatsapp.net', 'DANNY YULIETH', true],
  ['5732475517485@c.us', 'DANNY YULIETH', true]
];

global.mods = ['5732475517485', '59177474230', '5732475517485@s.whatsapp.net'];
global.suittag = ['5732475517485', '59177474230'];
global.prems = ['5732475517485', '59177474230', '5732475517485@s.whatsapp.net'];

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.libreria = 'Baileys';
global.baileys = 'V 6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = '🌸 Ania Bot 🌸';
global.sessions = 'aniaSession';
global.jadi = 'aniaJadiBot';
global.blackJadibts = true;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.packsticker = `
  🌸 ANIA BOT 🌸 💗 DANNY YULIETH`;

global.packname = '🌸 ANIA BOT 🌸';

global.author = `
♡━━━━━━━━━━━━━━━♡`;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.wm = '🌸 ANIA BOT 🌸';
global.titulowm = '🌸 ANIA BOT 🌸';
global.igfg = '🌸 DANNY YULIETH 🌸';
global.botname = '🌸 ANIA BOT 🌸';
global.dev = '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ DANNY YULIETH 💗';
global.textbot = '🌸 ANIA BOT : DANNY YULIETH 🌸';
global.gt = '🌸 ANIA BOT 🌸';
global.namechannel = '🌸 ANIA BOT / DANNY YULIETH 🌸';

// Moneda interna
global.monedas = 'moneditas';

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.gp1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.gp2 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.comunidad1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.channel = '';
global.cn = global.channel;
global.yt = 'https://youtube.com/@DevLyonn';
global.md = 'https://github.com/Feroficial/Kiyotaka-Ayanokoji-Bot';
global.correo = 'danny@aniabot.com';

global.catalogo = fs.readFileSync(new URL('../src/catalogo.jpg', import.meta.url));
global.photoSity = [global.catalogo];

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*

global.estilo = { 
  key: {  
    fromMe: false, 
    participant: '0@s.whatsapp.net', 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: global.packname, 
      orderTitle: 'ANIA BOT', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
};

global.ch = { ch1: "" };
global.rcanal = global.ch.ch1;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*

global.multiplier = 69;
global.maxwarn = 3;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.magenta('🔄 Se actualizó config.js de Ania Bot 🌸'));
  import(`${file}?update=${Date.now()}`);
});