import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { smsg } from '../lib/simple.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { unwatchFile, watchFile } from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import ws from 'ws';

const { proto } = (await import('@whiskeysockets/baileys')).default;
const isNumber = x => typeof x === 'number' && !isNaN(x);
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(() => resolve(), ms));

const dbPath = './src/database/aniadb.json';
const newsletterJid = "120363407253203904@newsletter";
const newsletterName = "αℓуα - ¢нαηηєℓ";

export async function handler(chatUpdate) {
  this.msgqueque ||= [];
  this.uptime ||= Date.now();
  if (!chatUpdate) return;
  this.pushMessage(chatUpdate.messages).catch(console.error);

  let m = chatUpdate.messages[chatUpdate.messages.length - 1];
  if (!m) return;
  if (!global.db.data) await global.loadDatabase();

  try {
    m = smsg(this, m) || m;
    if (!m) return;
    global.mconn = m;
    m.exp = 0;
    m.monedas = false;

    try {
      if (!global.db.data.users[m.sender]) {
        global.db.data.users[m.sender] = {};
      }
      let user = global.db.data.users[m.sender];

      Object.assign(user, {
        exp: isNumber(user.exp) ? user.exp : 0,
        USD: isNumber(user.USD) ? user.USD : 100,
        bank: isNumber(user.bank) ? user.bank : 0,
        joincount: isNumber(user.joincount) ? user.joincount : 1,
        diamond: isNumber(user.diamond) ? user.diamond : 3,
        level: isNumber(user.level) ? user.level : 1,
        health: isNumber(user.health) ? user.health : 100,
        mana: isNumber(user.mana) ? user.mana : 50,
        strength: isNumber(user.strength) ? user.strength : 5,
        defense: isNumber(user.defense) ? user.defense : 3,
        crit: isNumber(user.crit) ? user.crit : 5,
        evasion: isNumber(user.evasion) ? user.evasion : 5,
        weapon: user.weapon || '🐾 Varita de Osito',
        armor: user.armor || '🎀 Armadura de Conejita',
        inventory: user.inventory || [],
        registered: 'registered' in user ? user.registered : false,
        premium: 'premium' in user ? user.premium : false,
        premiumTime: user.premium ? user.premiumTime || 0 : 0,
        banned: 'banned' in user ? user.banned : false,
        bannedReason: user.bannedReason || '',
        warn: isNumber(user.warn) ? user.warn : 0,
        lastadventure: isNumber(user.lastadventure) ? user.lastadventure : 0,
        lastclaim: isNumber(user.lastclaim) ? user.lastclaim : 0,
        lastcrime: isNumber(user.lastcrime) ? user.lastcrime : 0,
        lastcofre: isNumber(user.lastcofre) ? user.lastcofre : 0,
        lastdiamantes: isNumber(user.lastdiamantes) ? user.lastdiamantes : 0,
        lastpago: isNumber(user.lastpago) ? user.lastpago : 0,
        lastcode: isNumber(user.lastcode) ? user.lastcode : 0,
        lastcodereg: isNumber(user.lastcodereg) ? user.lastcodereg : 0,
        lastduel: isNumber(user.lastduel) ? user.lastduel : 0,
        lastmining: isNumber(user.lastmining) ? user.lastmining : 0,
        muto: 'muto' in user ? user.muto : false,
        afk: isNumber(user.afk) ? user.afk : -1,
        afkReason: user.afkReason || '',
        name: user.name || m.pushName || 'Anónimo',
        age: isNumber(user.age) ? user.age : -1,
        regTime: isNumber(user.regTime) ? user.regTime : -1,
        role: user.role || '🌱 Aprendiz',
        country: user.country || '',
        afinidad: user.afinidad || '',
        nivelMagico: isNumber(user.nivelMagico) ? user.nivelMagico : 1,
        clan: user.clan || null,
        clanRank: user.clanRank || null,
        lastMsg: user.lastMsg || 0
      });

      if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
      }
      let chat = global.db.data.chats[m.chat];

      Object.assign(chat, {
        isBanned: 'isBanned' in chat ? chat.isBanned : false,
        sAutoresponder: chat.sAutoresponder || '',
        welcome: 'welcome' in chat ? chat.welcome : true,
        welcomeMessage: chat.welcomeMessage || null,
        welcomeBonus: 'welcomeBonus' in chat ? chat.welcomeBonus : true,
        autolevelup: 'autolevelup' in chat ? chat.autolevelup : false,
        autoAceptar: 'autoAceptar' in chat ? chat.autoAceptar : true,
        autosticker: 'autosticker' in chat ? chat.autosticker : false,
        autoRechazar: 'autoRechazar' in chat ? chat.autoRechazar : true,
        autoresponder: 'autoresponder' in chat ? chat.autoresponder : false,
        detect: 'detect' in chat ? chat.detect : true,
        antiBot: 'antiBot' in chat ? chat.antiBot : true,
        antiBot2: 'antiBot2' in chat ? chat.antiBot2 : true,
        modoadmin: 'modoadmin' in chat ? chat.modoadmin : false,
        antiLink: 'antiLink' in chat ? chat.antiLink : false,
        reaction: 'reaction' in chat ? chat.reaction : false,
        nsfw: 'nsfw' in chat ? chat.nsfw : false,
        antifake: 'antifake' in chat ? chat.antifake : false,
        delete: 'delete' in chat ? chat.delete : false,
        expired: isNumber(chat.expired) ? chat.expired : 0,
        botEnabled: 'botEnabled' in chat ? chat.botEnabled : true
      });

      if (!global.db.data.settings[this.user.jid]) {
        global.db.data.settings[this.user.jid] = {};
      }
      var settings = global.db.data.settings[this.user.jid];
      Object.assign(settings, {
        self: 'self' in settings ? settings.self : false,
        restrict: 'restrict' in settings ? settings.restrict : true,
        jadibotmd: 'jadibotmd' in settings ? settings.jadibotmd : true,
        antiPrivate: 'antiPrivate' in settings ? settings.antiPrivate : false,
        autoread: 'autoread' in settings ? settings.autoread : false,
        status: settings.status || 0
      });

    } catch (e) { console.error('Error inicializando datos:', e); }

    if (typeof m.text !== "string") m.text = "";
    globalThis.setting = global.db.data.settings[this.user.jid];

    const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net';
    const isROwner = global.owner ? [...global.owner.map(([number]) => number)].map(v => v.replace(/\D/g, "") + detectwhat).includes(m.sender) : false;
    const isOwner = isROwner || m.fromMe;
    const isPrems = isROwner || (global.db.data.users[m.sender]?.premiumTime || 0) > 0;
    const isMods = isROwner || (global.mods || []).includes(m.sender.split('@')[0]);

    if (opts["queque"] && m.text && !isMods) {
      const queque = this.msgqueque;
      const previousID = queque[queque.length - 1];
      queque.push(m.id || m.key.id);
      setInterval(async () => { if (!queque.includes(previousID)) clearInterval(this); await delay(5000); }, 5000);
    }
    if (m.isBaileys) return;
    m.exp += Math.ceil(Math.random() * 10);
    let usedPrefix;
    let _user = global.db.data.users[m.sender];

    async function getLidFromJid(id, conn) { 
      if (id.endsWith('@lid')) return id;
      const res = await conn.onWhatsApp(id).catch(() => []);
      return res[0]?.lid || id;
    }

    const senderLid = await getLidFromJid(m.sender, this);
    const botLid = await getLidFromJid(this.user.jid, this);
    const senderJid = m.sender;
    const botJid = this.user.jid;

    const groupMetadata = m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(() => null)) : {};
    const participants = m.isGroup && groupMetadata ? groupMetadata.participants || [] : [];

    const user = participants.find(p => [p?.id, p?.jid].includes(senderLid) || [p?.id, p?.jid].includes(senderJid)) || {};
    const bot = participants.find(p => [p?.id, p?.jid].includes(botLid) || [p?.id, p?.jid].includes(botJid)) || {};

    const isRAdmin = user.admin === 'superadmin';
    const isAdmin = isRAdmin || user.admin === 'admin';
    const isBotAdmin = !!bot.admin;

    // ========== SISTEMA ANTILINK CON NEWSLETTER ==========
    if (m.isGroup && m.text && !m.isBaileys) {
      const chat = global.db.data.chats[m.chat];

      if (chat && chat.antiLink === true) {
        const linksProhibidos = [
          'chat.whatsapp.com', 'whatsapp.com/channel', 'instagram.com', 'facebook.com',
          'twitter.com', 'tiktok.com', 'youtube.com', 'youtu.be', 'wa.me',
          't.me', 'discord.gg', 'linktr.ee', 'https://', 'http://'
        ]

        let tieneLink = false;
        let linkEncontrado = '';

        for (let link of linksProhibidos) {
          if (m.text.toLowerCase().includes(link)) {
            tieneLink = true;
            linkEncontrado = link;
            break;
          }
        }

        const urlRegex = /(https?:\/\/[^\s]+)/gi;
        if (urlRegex.test(m.text) && !tieneLink) {
          tieneLink = true;
          linkEncontrado = 'enlace';
        }

        if (tieneLink && !isAdmin && !isRAdmin && !isOwner && !isROwner) {
          try {
            await this.sendMessage(m.chat, { delete: m.key });
          } catch (e) {}

          const contextInfo = {
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
              newsletterJid: newsletterJid,
              newsletterName: newsletterName,
              serverMessageId: 1
            }
          };

          if (isBotAdmin) {
            try {
              await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            } catch (e) {}

            await this.sendMessage(m.chat, {
              text: `
ㅤ    ꒰  ㅤ 🔗 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ αηтιℓιηк 木 🛡️ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *🔗 Enlace:* ${linkEncontrado}
> ₊· ⫏⫏ ㅤ *⚡ Acción:* Eliminado y expulsado

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
              `.trim(),
              contextInfo: contextInfo
            });
          } else {
            await this.sendMessage(m.chat, {
              text: `
ㅤ    ꒰  ㅤ 🔗 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ αηтιℓιηк 木 🛡️ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *🔗 Enlace:* ${linkEncontrado}
> ₊· ⫏⫏ ㅤ *⚠️ Error:* El bot necesita ser admin

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
              `.trim(),
              contextInfo: contextInfo
            });
          }
        }
      }
    }

    // ========== PROCESAR PLUGINS ==========
    let comandoEncontrado = false;
    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), '../plugins');
    
    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin || plugin.disabled) continue;
      const __filename = join(___dirname, name);

      if (typeof plugin.all === 'function') await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename }).catch(console.error);
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;

      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      let _prefix = plugin.customPrefix || this.prefix || global.prefix;
      let match = (_prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] :
        Array.isArray(_prefix) ? _prefix.map(p => [p instanceof RegExp ? p.exec(m.text) : new RegExp(str2Regex(p)).exec(m.text), p instanceof RegExp ? p : new RegExp(str2Regex(p))]) :
        [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]
      ).find(p => p[1]);

      if (typeof plugin.before === 'function' && await plugin.before.call(this, m, { match, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, isMods, chatUpdate, __dirname: ___dirname, __filename })) continue;
      if (typeof plugin !== 'function') continue;

      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '');
        let [command, ...args] = noPrefix.trim().split` `.filter(Boolean);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || '').toLowerCase();
        let fail = plugin.fail || global.dfail;
        let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
          Array.isArray(plugin.command) ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
          plugin.command === command;

        global.comando = command;
        if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) return;
        if (!isAccept) continue;

        comandoEncontrado = true;
        m.plugin = name;
        let chat = global.db.data.chats[m.chat];
        let user = global.db.data.users[m.sender];
        if (!['grupo-unbanchat.js', 'owner-exec.js', 'owner-exec2.js'].includes(name) && chat?.isBanned && !isROwner) return;
        if (m.text && user.banned && !isROwner) { 
          m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вαηєα∂σ 木 🚫 ㅤ 性

> ₊· ⫏⫏ ㅤ *📌 Motivo:* ${user.bannedReason || 'Sin especificar'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
          `.trim());
          return;
        }

        let adminMode = global.db.data.chats[m.chat].modoadmin;
        let mini = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix}`;
        if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return;

        if (plugin.rowner && !isROwner) { fail('rowner', m, this, usedPrefix); continue; }
        if (plugin.owner && !isOwner) { fail('owner', m, this, usedPrefix); continue; }
        if (plugin.mods && !isMods) { fail('mods', m, this, usedPrefix); continue; }
        if (plugin.premium && !isPrems) { fail('premium', m, this, usedPrefix); continue; }
        if (plugin.group && !m.isGroup) { fail('group', m, this, usedPrefix); continue; }
        if (plugin.botAdmin && !isBotAdmin) { fail('botAdmin', m, this, usedPrefix); continue; }
        if (plugin.admin && !isAdmin) { fail('admin', m, this, usedPrefix); continue; }
        if (plugin.private && m.isGroup) { fail('private', m, this, usedPrefix); continue; }
        if (plugin.register && !_user.registered) { fail('unreg', m, this, usedPrefix); continue; }

        m.isCommand = true;
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10;
        m.exp += xp;
        if (!isPrems && plugin.monedas && _user.USD < plugin.monedas) {
          this.reply(m.chat, `
ㅤ    ꒰  ㅤ 💰 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ мσηє∂αѕ 木 ιηѕυƒι¢ιєηтєѕ ㅤ 性

> ₊· ⫏⫏ ㅤ Necesitas ${plugin.monedas} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
          `.trim(), m);
          continue;
        }

        if (plugin.level > _user.level) {
          this.reply(m.chat, `
ㅤ    ꒰  ㅤ 📊 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ηινєℓ 木 ιηѕυƒι¢ιєηтє ㅤ 性

> ₊· ⫏⫏ ㅤ Necesitas nivel *${plugin.level}*
> ₊· ⫏⫏ ㅤ Tu nivel actual: *${_user.level}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
          `.trim(), m);
          continue;
        }

        let extra = { match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, isMods, chatUpdate, __dirname: ___dirname, __filename };
        try {
          await plugin.call(this, m, extra);
          if (!isPrems) m.monedas = m.monedas || plugin.monedas || false;
        } catch (e) {
          m.error = e;
          let text = format(e);
          for (let key of Object.values(global.APIKeys || {})) text = text.replace(new RegExp(key, 'g'), 'Administrador');
          m.reply(text);
        } finally {
          if (typeof plugin.after === 'function') await plugin.after.call(this, m, extra).catch(console.error);
          if (m.monedas) this.reply(m.chat, `
ㅤ    ꒰  ㅤ 💰 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ gαѕтσ 木 мσηє∂αѕ ㅤ 性

> ₊· ⫏⫏ ㅤ Usaste *${+m.monedas} USD*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
          `.trim(), m);
        }
        break;
      }
    }

    // ========== COMANDO NO ENCONTRADO CON NEWSLETTER ==========
    if (m.text && !m.isBaileys && !comandoEncontrado && !m.isCommand) {
      const primerCaracter = m.text[0];
      const esPrefijo = ['#', '.', '/', '!'].includes(primerCaracter);
      
      if (esPrefijo && m.text.length > 1) {
        const contextInfo = {
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
            newsletterJid: newsletterJid,
            newsletterName: newsletterName,
            serverMessageId: 1
          }
        };

        await this.sendMessage(m.chat, {
          text: `❓ *${m.text}* no es un comando válido.\n📝 Usa *#menu* para ver la lista.`,
          contextInfo: contextInfo
        });
        await this.sendMessage(m.chat, { react: { text: '❓', key: m.key } });
      }
    }

  } catch (e) { console.error(e); } finally {
    if (opts['queque'] && m.text) {
      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
      if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1);
    }

    if (m) {
      let utente = global.db.data.users[m.sender];
      if (utente?.muto) await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
      if (utente) {
        utente.exp += m.exp || 0;
        utente.USD -= m.monedas || 0;
        utente.lastMsg = Date.now();
      }
    }

    let stats = global.db.data.stats || {};
    if (m.plugin) {
      let now = +new Date();
      let stat = stats[m.plugin] || { total: 0, success: 0, last: 0, lastSuccess: 0 };
      stat.total += 1;
      stat.last = now;
      if (!m.error) { stat.success += 1; stat.lastSuccess = now; }
      stats[m.plugin] = stat;
    }

    try { if (!opts['noprint']) await (await import('../lib/print.js')).default(m, this); } catch (e) { console.log(m, m.quoted, e); }
    if (opts['autoread']) await this.readMessages([m.key]);
  }
}

global.dfail = (type, m, conn, usedPrefix) => {
  const msg = {
    rowner: `
ㅤ    ꒰  ㅤ 👑 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α¢¢єѕσ 木 яєѕтяιηgι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Solo *el creador* puede usar esto

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    owner: `
ㅤ    ꒰  ㅤ 🔒 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕσℓσ 木 σωηєя ㅤ 性

> ₊· ⫏⫏ ㅤ Solo *el dueño del bot* puede usar esto

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    premium: `
ㅤ    ꒰  ㅤ 💎 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ρяємιυм 木 яєqυιєяє∂ ㅤ 性

> ₊· ⫏⫏ ㅤ Solo para usuarios *Premium*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    private: `
ㅤ    ꒰  ㅤ 🔒 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ρяινα∂σ 木 σηℓу ㅤ 性

> ₊· ⫏⫏ ㅤ Este comando solo funciona en privado

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    group: `
ㅤ    ꒰  ㅤ 👥 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ɢяυρσ 木 σηℓу ㅤ 性

> ₊· ⫏⫏ ㅤ Este comando solo funciona en grupos

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    admin: `
ㅤ    ꒰  ㅤ 🛡️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α∂мιη 木 яєqυιяє∂ ㅤ 性

> ₊· ⫏⫏ ㅤ Solo *administradores* pueden usar esto

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    botAdmin: `
ㅤ    ꒰  ㅤ 🤖 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 α∂мιη ㅤ 性

> ₊· ⫏⫏ ㅤ El bot necesita ser *administrador* del grupo

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    unreg: `
ㅤ    ꒰  ㅤ 📜 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 яєgιѕтяαя ㅤ 性

> ₊· ⫏⫏ ㅤ Usa: *${usedPrefix || '#'}registrar <Nombre.Edad>*
> ₊· ⫏⫏ ㅤ Ejemplo: *${usedPrefix || '#'}registrar Lyonn.17*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `,
    mods: `
ㅤ    ꒰  ㅤ 🛡️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ мσ∂ 木 σηℓу ㅤ 性

> ₊· ⫏⫏ ㅤ Solo *moderadores* pueden usar esto

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Creador: Lʏᴏɴɴ
    `
  };
  if (msg[type]) return m.reply(msg[type]).then(() => m.react('❌'));
};

let file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
  unwatchFile(file);
  console.log(chalk.magenta("🔄 Se actualizó 'handler.js' de αℓуα - вσт"));
  if (global.conns && global.conns.length > 0) {
    const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
    for (const userr of users) {
      userr.subreloadHandler(false);
    }
  }
});