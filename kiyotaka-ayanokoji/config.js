import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─✞─ CONFIGURACIÓN GLOBAL ─✞─*

// Número del bot
global.botNumber = '';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
// ========== DETECCIÓN MÚLTIPLE DEL CREADOR ==========
global.owner = [
  ['59177474230', '🎭 𝐃𝐄𝐕𝐋𝐘𝐎𝐍𝐍 🗡️', true],
  ['51923657619', '🛡️ ASISTENTE', true],
  ['529611207992', '⚔️ SUB-PRINCIPAL', true],
  ['584241819270', '🐉 𝐋𝐄𝐎_𝐎𝐅𝐂 🐉', true],
  ['59177474230'],
  ['59177474230@s.whatsapp.net', 'DEVLYONN', true],
  ['59177474230@c.us', 'DEVLYONN', true]
];

global.mods = ['59177474230', '59177474230@s.whatsapp.net'];
global.suittag = ['59177474230'];
global.prems = ['59177474230', '59177474230@s.whatsapp.net'];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.libreria = 'Baileys';
global.baileys = 'V 6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = 'KIYOTAKA AYANOKOJI - Bot';
global.sessions = 'kiyotakaSession';
global.jadi = 'kiyotakaJadiBot';
global.blackJadibts = true;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.packsticker = `
  🎭 KIYOTAKA AYANOKOJI 🗡️ ᚲ DEVLYONN`;

global.packname = '🎭 KIYOTAKA AYANOKOJI 🗡️';

global.author = `
♾━━━━━━━━━━━━━━━♾`;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.wm = '🎭 KIYOTAKA AYANOKOJI 🗡️';
global.titulowm = '🎭 KIYOTAKA AYANOKOJI 🗡️';
global.igfg = '🎭 DEVLYONN';
global.botname = '🎭 KIYOTAKA AYANOKOJI 🗡️';
global.dev = '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ DEVLYONN ⚔️';
global.textbot = '🎭 KIYOTAKA AYANOKOJI : DEVLYONN';
global.gt = '͟͞🎭 KIYOTAKA AYANOKOJI 🗡️͟͞';
global.namechannel = '🎭 KIYOTAKA AYANOKOJI / DEVLYONN';

// Moneda interna
global.monedas = 'monedas';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.gp1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.gp2 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.comunidad1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.channel = '';
global.cn = global.channel;
global.yt = 'https://youtube.com/@DevLyonn';
global.md = 'https://github.com/Feroficial/Kiyotaka-Ayanokoji-Bot';
global.correo = 'devlyonn@kiyotaka.com';

global.catalogo = fs.readFileSync(new URL('../src/catalogo.jpg', import.meta.url));
global.photoSity = [global.catalogo];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

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
      orderTitle: 'KIYOTAKA AYANOKOJI', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
};

global.ch = { ch1: "" };
global.rcanal = global.ch.ch1;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.multiplier = 69;
global.maxwarn = 3;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'kiyotaka-ayanokoji/config.js\''));
  import(`${file}?update=${Date.now()}`);
});
