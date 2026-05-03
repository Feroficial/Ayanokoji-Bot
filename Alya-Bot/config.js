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
// ========== DETECCIÓN DE LA CREADORA ==========
global.owner = [
  ['59177474230', '🎭 ℓʏσηη', true],
  ['59177474230@s.whatsapp.net', 'ℓʏσηη', true],
  ['59177474230@c.us', 'ℓʏσηη', true],
  ['529711232646', '🌸 ℓυz', true],
  ['529711232646@s.whatsapp.net', 'ℓυz', true],
  ['529711232646@c.us', 'ℓυz', true],
  ['573245517485', '🌸 ∂αηηу ʏυℓιєтн', true],
  ['573245517485@s.whatsapp.net', '∂αηηу ʏυℓιєтн', true],
  ['573245517485@c.us', '∂αηηу ʏυℓιєтн', true]
];

global.mods = ['59177474230', '59177474230@s.whatsapp.net', '529711232646', '529711232646@s.whatsapp.net', '573245517485', '573245517485@s.whatsapp.net'];
global.suittag = ['59177474230', '529711232646', '573245517485'];
global.prems = ['59177474230', '59177474230@s.whatsapp.net', '529711232646', '529711232646@s.whatsapp.net', '573245517485', '573245517485@s.whatsapp.net'];

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.libreria = 'Baileys';
global.baileys = 'V 6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = '🌸 αℓуα - вσт 🌸';
global.sessions = 'AlyaSesions';
global.jadi = 'AlyaJadiBot';
global.blackJadibts = true;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.packsticker = `
ㅤ    ꒰  ㅤ 🌸 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕтι¢кєя 木 ✨ ㅤ 性

> ₊· ⫏⫏ ㅤ Cяєα∂σя: ℓʏσηη`;

global.packname = 'αℓуα - вσт';

global.author = `
ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱`;

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.wm = 'αℓуα - вσт';
global.titulowm = 'αℓуα - вσт';
global.igfg = 'ℓʏσηη';
global.botname = 'αℓуα - вσт';
global.dev = '© ρσωєяє∂ ву ℓʏσηη 💗';
global.textbot = 'αℓуα - вσт : ℓʏσηη';
global.gt = 'αℓуα - вσт';
global.namechannel = 'αℓуα - вσт / ℓʏσηη';

// Moneda interna
global.monedas = 'мσηє∂αѕ';

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.gp1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.gp2 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.comunidad1 = 'https://chat.whatsapp.com/LPHJXnuklWy62oyHB3FJoQ';
global.channel = '';
global.cn = global.channel;
global.yt = 'https://youtube.com/@Lyonn';
global.md = 'https://github.com/Lyonn/Alya-Bot';
global.correo = 'lyonn@alyabot.com';

//*─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─🌸─ׄ─ׅ─ׄ─*
global.catalogo = null;
try {
    const catalogoPath = new URL('../src/catalogo.jpg', import.meta.url);
    if (fs.existsSync(catalogoPath)) {
        global.catalogo = fs.readFileSync(catalogoPath);
    } else {
        console.log(chalk.yellow('⚠️ No se encontró catalogo.jpg'));
    }
} catch(e) {
    console.log(chalk.yellow('⚠️ Error cargando catalogo.jpg'));
}

global.photoSity = global.catalogo ? [global.catalogo] : [];

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
      orderTitle: 'αℓуα - вσт', 
      thumbnail: global.catalogo || Buffer.from(''), 
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
  console.log(chalk.magenta('🔄 Sє α¢тυαℓízσ ∂є αℓуα - вσт 🌸'));
});

console.log(chalk.green('✅ cσηfιg.נѕ ¢αrgα∂σ ¢σrrє¢тαмєηтє 🌸'));
