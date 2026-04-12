/*
⚠ PROHIBIDO EDITAR ⚠ 

El codigo de este archivo fue modificado para BALDWIND IV:
- BALDWIND IV (https://github.com/Feroficial/Baldwind-IV-Bot)

Adaptacion y edición echa por:
- 🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸

⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠
*/

import { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } from "@whiskeysockets/baileys"
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import * as ws from 'ws'
import { fileURLToPath } from 'url'
import { makeWASocket } from '../lib/simple.js'
import fetch from 'node-fetch'

const { exec } = await import('child_process')
const { CONNECTING } = ws

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"

let drm1 = ""
let drm2 = ""

let rtx =
`—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 𝙎𝙄𝙎𝙏𝙀𝙈 🛸* —͟͟͞͞

> 📲 *𝙀𝙨𝙘𝙖𝙣𝙚𝙖 𝙚𝙡 𝙂𝙧𝙞𝙢𝙤𝙧𝙞𝙤 𝙌𝙍*
> ⋮ 𝘿𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙙𝙤𝙨 > 𝙀𝙨𝙘𝙖𝙣𝙚𝙖𝙧 𝙘ó𝙙𝙞𝙜𝙤

> ⏳ *𝙀𝙡 𝙨𝙚𝙡𝙡𝙤 𝙢á𝙜𝙞𝙘𝙤 𝙙𝙪𝙧𝙖 45 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨*

> 🔥 *𝘾𝙤𝙣𝙫𝙞𝙚𝙧𝙩𝙚𝙩𝙚 𝙚𝙣 𝙪𝙣 𝙎𝙪𝙗-𝘽𝙤𝙩 𝙏𝙚𝙢𝙥𝙤𝙧𝙖𝙡*
> ⚔️ *𝙎𝙞𝙧𝙫𝙚 𝙖𝙡 𝙍𝙚𝙞𝙣𝙤 𝙙𝙚 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿*
> 🧿 *𝙏𝙪 𝙚𝙣𝙚𝙧𝙜í𝙖 𝙦𝙪𝙚𝙙𝙖𝙧á 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙙𝙖 𝙖𝙡 𝙂𝙧𝙞𝙢𝙤𝙧𝙞𝙤 𝙥𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡*

> 🛡️ *100% 𝘼𝙉𝙏𝙄-𝘽𝘼𝙉 • 𝘾𝙐𝙀𝙉𝙏𝘼 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸*

⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ⌬`

let rtx2 =
`—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 𝙎𝙄𝙎𝙏𝙀𝙈 🛸* —͟͟͞͞

> 🜲 *𝙐𝙨𝙖 𝙚𝙨𝙩𝙚 𝘾ó𝙙𝙞𝙜𝙤 𝙀𝙨𝙥𝙞𝙧𝙞𝙩𝙪𝙖𝙡*
> ⚔️ *𝘾𝙤𝙣𝙫𝙞𝙚𝙧𝙩𝙚𝙩𝙚 𝙚𝙣 𝙪𝙣 𝙎𝙪𝙗-𝘽𝙤𝙩 𝙏𝙚𝙢𝙥𝙤𝙧𝙖𝙡*

> ⏳ *𝘼𝙙𝙫𝙚𝙧𝙩𝙚𝙣𝙘𝙞𝙖:* 𝙚𝙨𝙩𝙚 𝙫í𝙣𝙘𝙪𝙡𝙤 𝙚𝙨 𝙙𝙚𝙡𝙞𝙘𝙖𝙙𝙤
> ⚠️ *𝙉𝙤 𝙪𝙨𝙚𝙨 𝙩𝙪 𝙘𝙪𝙚𝙣𝙩𝙖 𝙥𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡*

> 🛡️ *100% 𝘼𝙉𝙏𝙄-𝘽𝘼𝙉 • 𝘾𝙐𝙀𝙉𝙏𝘼 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇*

> 🧿 *𝙎𝙄𝙎𝙏𝙀𝙈𝘼 ➤ [ 𝘾Ó𝘿𝙄𝙂𝙊 𝘼𝘾𝙏𝙄𝙑𝙊 ]*
> ⚔️ *𝘼𝙘𝙩𝙞𝙫𝙖 𝙚𝙡 𝙫í𝙣𝙘𝙪𝙡𝙤 𝙘𝙪𝙖𝙣𝙙𝙤 𝙚𝙨𝙩é𝙨 𝙥𝙧𝙚𝙥𝙖𝙧𝙖𝙙𝙤*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸*

⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ⌬`

const maxSubBots = 500

let blackJBOptions = {}

if (!global.conns) global.conns = []

function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60)
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds
  return minutes + ' m y ' + seconds + ' s '
}

// ========== CONFIGURACIÓN DEL SUB-BOT ==========
const SUB_BOT_NAME = '🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸'
const SUB_BOT_BIO = '—͟͟͞͞ 🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸 ⌬'
const SUB_BOT_PIC = 'https://files.catbox.moe/xdpxey.jpg'

const changeSubBotName = async (sock) => {
  try {
    await sock.updateProfileName(SUB_BOT_NAME)
    console.log(chalk.bold.green(`✅ Sub-Bot renombrado a: ${SUB_BOT_NAME}`))
    return true
  } catch (e) {
    console.log(chalk.bold.red(`❌ Error al cambiar nombre: ${e.message}`))
    return false
  }
}

const changeSubBotBio = async (sock) => {
  try {
    await sock.updateProfileStatus(SUB_BOT_BIO)
    console.log(chalk.bold.green(`✅ Biografía del Sub-Bot actualizada`))
    return true
  } catch (e) {
    console.log(chalk.bold.red(`❌ Error al cambiar biografía: ${e.message}`))
    return false
  }
}

const changeSubBotProfilePic = async (sock) => {
  try {
    const imgRes = await fetch(SUB_BOT_PIC)
    if (imgRes.ok) {
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
      await sock.updateProfilePicture(imgBuffer)
      console.log(chalk.bold.green(`✅ Foto de perfil del Sub-Bot actualizada`))
    }
    return true
  } catch (e) {
    console.log(chalk.bold.red(`❌ Error al cambiar foto: ${e.message}`))
    return false
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) {
    return m.reply(`❌ *El comando ${command} está desactivado temporalmente*`)
  }

  // ========== VERIFICAR COOLDOWN (pero NO activarlo todavía) ==========
  const user = global.db.data.users[m.sender]
  const now = Date.now()
  const cooldownTime = 120000 // 2 minutos
  
  if (user.subCooldown && now - user.subCooldown < cooldownTime) {
    const remaining = cooldownTime - (now - user.subCooldown)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return conn.reply(m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 🛸* —͟͟͞͞\n\n> ⏳ *𝙀𝙨𝙥𝙚𝙧𝙖 ${minutes} 𝙢 ${seconds} 𝙨 𝙥𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙧 𝙪𝙣 𝙎𝙪𝙗-𝘽𝙤𝙩*\n\n⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 ⌬`, m)
  }

  const subBots = [...new Set(
    global.conns.filter(c =>
      c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED
    ).map(c => c)
  )]

  const subBotsCount = subBots.length

  if (subBotsCount >= maxSubBots) {
    return m.reply(`❌ *No hay espacios disponibles para Sub-Bots*`)
  }

  const availableSlots = maxSubBots - subBotsCount

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let id = `${who.split('@')[0]}`
  
  let pathblackJadiBot = path.join(process.cwd(), 'baldwind-core', 'blackJadiBot', id)

  if (!fs.existsSync(pathblackJadiBot)) {
    fs.mkdirSync(pathblackJadiBot, { recursive: true })
  }

  blackJBOptions.pathblackJadiBot = pathblackJadiBot
  blackJBOptions.m = m
  blackJBOptions.conn = conn
  blackJBOptions.args = args
  blackJBOptions.usedPrefix = usedPrefix
  blackJBOptions.command = command
  blackJBOptions.fromCommand = true

  // Guardar el sender para activar cooldown después de conexión exitosa
  blackJBOptions.sender = m.sender

  await blackJadiBot(blackJBOptions)
  
  // NO activar cooldown aquí - se activará cuando el Sub-Bot se conecte exitosamente
}

handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['code']

export default handler

export async function blackJadiBot(options) {
  let { pathblackJadiBot, m, conn, args, usedPrefix, command, sender } = options
  if (command === 'code') {
    command = 'qr'
    args.unshift('code')
  }
  const mcode = true
  let txtCode, codeBot, txtQR
  
  const pathCreds = path.join(pathblackJadiBot, "creds.json")
  if (!fs.existsSync(pathblackJadiBot)) {
    fs.mkdirSync(pathblackJadiBot, { recursive: true })
  }
  try {
    if (args[0] && args[0] != undefined) {
      fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'))
    }
  } catch {
    conn.reply(m.chat, `⚠️ *Uso correcto:* ${usedPrefix + command}`, m)
    return
  }

  const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")

  global.conns = global.conns || []

  exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
    const { version } = await fetchLatestBaileysVersion()
    const msgRetry = () => { }
    const msgRetryCache = new NodeCache()
    const { state, saveCreds } = await useMultiFileAuthState(pathblackJadiBot)

    const connectionOptions = {
      logger: pino({ level: "fatal" }),
      printQRInTerminal: false,
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
      msgRetry,
      msgRetryCache,
      browser: Browsers.macOS("Desktop"),
      version: version,
      generateHighQualityLinkPreview: false
    }

    let sock = makeWASocket(connectionOptions)
    sock.isInit = false
    let isInit = true

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) sock.isInit = false
      
      if (qr && !state.creds.registered) {
        const userNumber = (sender || m.sender).split('@')[0]
        
        if (m?.chat && !txtCode) {
          txtCode = await conn.sendMessage(m.chat, { 
            text: `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 𝙎𝙄𝙎𝙏𝙀𝙈 🛸* —͟͟͞͞

> 🔮 *𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝙐𝘿 𝘿𝙀 𝙑𝙄𝙉𝘾𝙐𝙇𝘼𝘾𝙄𝙊́𝙉*
> 📱 *𝙉𝙪́𝙢𝙚𝙧𝙤:* @${userNumber}
> 🛡️ *𝙈𝙤𝙙𝙤:* 100% 𝘼𝙣𝙩𝙞-𝘽𝙖𝙣

> ⏳ *𝙂𝙚𝙣𝙚𝙧𝙖𝙣𝙙𝙤 𝙘𝙤́𝙙𝙞𝙜𝙤...*

⚔️ *𝙇𝙤𝙨 𝙎𝙪𝙗-𝘽𝙤𝙩𝙨 𝙨𝙤𝙣 𝙨𝙞𝙢𝙥𝙡𝙚𝙨 𝙥𝙞𝙤𝙣𝙚𝙨 𝙖𝙡 𝙨𝙚𝙧𝙫𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙍𝙚𝙞𝙣𝙤*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸*
⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ⌬`,
            mentions: [m.sender]
          }, { quoted: m })
        }
        
        try {
          const secret = await sock.requestPairingCode(userNumber)
          const formattedCode = secret.match(/.{1,4}/g)?.join("-") || secret
          
          codeBot = await conn.sendMessage(m.chat, {
            text: `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 𝙎𝙄𝙎𝙏𝙀𝙈 🛸* —͟͟͞͞

> 🜲 *𝙏𝙐 𝘾Ó𝘿𝙄𝙂𝙊 𝙀𝙎𝙋𝙄𝙍𝙄𝙏𝙐𝘼𝙇*

> 🔢 *${formattedCode}*

> ⚠️ *𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙚𝙨𝙩𝙚 𝙘ó𝙙𝙞𝙜𝙤 𝙚𝙣:*
> 📲 𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥 > 𝘿𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙙𝙤𝙨

> 🛡️ *𝙑𝙞𝙣𝙘𝙪𝙡𝙖𝙘𝙞𝙤́𝙣 100% 𝙨𝙚𝙜𝙪𝙧𝙖 𝙥𝙖𝙧𝙖 𝙘𝙪𝙚𝙣𝙩𝙖 𝙥𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡*

⚔️ *𝘼𝙡 𝙘𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙧𝙩𝙚 𝙚𝙣 𝙎𝙪𝙗-𝘽𝙤𝙩, 𝙩𝙪 𝙚𝙣𝙚𝙧𝙜í𝙖 𝙨𝙚𝙧á 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙙𝙖 𝙥𝙤𝙧 𝙚𝙡 𝙍𝙚𝙞𝙣𝙤*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸*
⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ⌬`,
            mentions: [m.sender]
          }, { quoted: m })
          
          console.log(chalk.bold.yellow(`📱 Código generado para ${userNumber}: ${formattedCode}`))
        } catch (e) {
          console.log(chalk.bold.red(`❌ Error: ${e.message}`))
          await conn.sendMessage(m.chat, {
            text: `❌ *Error al generar el código*\n> ${e.message}\n\n🛸 *BALDWIND IV*`,
            mentions: [m.sender]
          }, { quoted: m })
        }
      }
      
      if (txtCode && txtCode.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key }).catch(() => {}) }, 60000)
      }
      if (codeBot && codeBot.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key }).catch(() => {}) }, 120000)
      }

      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (connection === 'close') {
        if (reason === 428 || reason === 408) {
          console.log(chalk.bold.magentaBright(`\n│ La conexión (+${path.basename(pathblackJadiBot)}) fue cerrada. Reintentando...`))
          await creloadHandler(true).catch(console.error)
        }
        if (reason === 440) {
          console.log(chalk.bold.magentaBright(`\n│ La conexión (+${path.basename(pathblackJadiBot)}) fue reemplazada.`))
          try {
            if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathblackJadiBot)}@s.whatsapp.net`, { text: '🜸 *SESIÓN REEMPLAZADA* 🜸\n\n> Un nuevo Sub-Bot ha tomado tu lugar.\n\n👑 LyonnDev & ValentinaDev' }, { quoted: m || null }) : ""
          } catch {}
        }
        if (reason == 405 || reason == 401) {
          console.log(chalk.bold.magentaBright(`\n│ Sesión (+${path.basename(pathblackJadiBot)}) cerrada.`))
          try {
            if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathblackJadiBot)}@s.whatsapp.net`, { text: '🜸 *SESIÓN CERRADA* 🜸\n\n> Tu vínculo con el Reino se ha roto.\n\n👑 LyonnDev & ValentinaDev' }, { quoted: m || null }) : ""
          } catch {}
          fs.rmSync(pathblackJadiBot, { recursive: true, force: true })
        }
        if (reason === 500) {
          console.log(chalk.bold.magentaBright(`\n│ Conexión perdida (+${path.basename(pathblackJadiBot)})`))
          if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathblackJadiBot)}@s.whatsapp.net`, { text: '🜸 *CONEXIÓN PERDIDA* 🜸\n\n> El Sub-Bot ha perdido la conexión.\n\n👑 LyonnDev & ValentinaDev' }, { quoted: m || null }) : ""
          return creloadHandler(true).catch(console.error)
        }
        if (reason === 515) {
          console.log(chalk.bold.magentaBright(`\n│ Reinicio automático (+${path.basename(pathblackJadiBot)})`))
          await creloadHandler(true).catch(console.error)
        }
        if (reason === 403) {
          console.log(chalk.bold.magentaBright(`\n│ Sesión cerrada (+${path.basename(pathblackJadiBot)})`))
          fs.rmSync(pathblackJadiBot, { recursive: true, force: true })
        }
      }
      if (connection == 'open') {
        let userName = sock.authState.creds.me?.name || 'Anónimo'

        await new Promise(resolve => setTimeout(resolve, 3000))

        await changeSubBotName(sock)
        await changeSubBotBio(sock)
        await changeSubBotProfilePic(sock)

        // ========== ACTIVAR COOLDOWN SOLO CUANDO SE CONECTA EXITOSAMENTE ==========
        if (sender) {
          const userData = global.db.data.users[sender]
          if (userData) {
            userData.subCooldown = Date.now()
            await global.db.write()
          }
        }

        console.log(
          chalk.bold.cyanBright(
            `\n❒────────────【• SUB-BOT BALDWIND IV •】────────────❒\n│\n│ 🟢 ${userName} (+${path.basename(pathblackJadiBot)}) conectado.\n│ 👑 Creadores: LyonnDev & ValentinaDev\n│ 📛 Nuevo nombre: ${SUB_BOT_NAME}\n│\n❒────────────【• CONECTADO •】────────────❒`
          )
        )
        sock.isInit = true
        global.conns.push(sock)

        try {
          await sock.groupAcceptInvite('IJjWzYg976PFSXOJ3uJDOM')
        } catch {}

        if (m?.chat)
          await conn.sendMessage(
            m.chat,
            {
              text: `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 𝙎𝙄𝙎𝙏𝙀𝙈 🛸* —͟͟͞͞

> 🟢 *@${(sender || m.sender).split('@')[0]}*

> ⚔️ *¡𝙂𝙚𝙣𝙞𝙖𝙡! 𝙔𝙖 𝙚𝙧𝙚𝙨 𝙥𝙖𝙧𝙩𝙚 𝙙𝙚 𝙡𝙖 𝙛𝙖𝙢𝙞𝙡𝙞𝙖 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿*

> 🜸 *𝙏𝙪 𝙣𝙪𝙚𝙫𝙤 𝙣𝙤𝙢𝙗𝙧𝙚 𝙚𝙨:* ${SUB_BOT_NAME}

> 🛡️ *100% 𝘼𝙉𝙏𝙄-𝘽𝘼𝙉 • 𝘾𝙐𝙀𝙉𝙏𝘼 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇*

> ⚠️ *𝙍𝙚𝙘𝙪𝙚𝙧𝙙𝙖:* 𝙇𝙤𝙨 𝙎𝙪𝙗-𝘽𝙤𝙩𝙨 𝙨𝙤𝙣 𝙨𝙞𝙢𝙥𝙡𝙚𝙨 𝙥𝙞𝙤𝙣𝙚𝙨 𝙖𝙡 𝙨𝙚𝙧𝙫𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙍𝙚𝙞𝙣𝙤*

> 📌 *𝙐𝙨𝙖 .𝙥𝙚𝙧𝙨𝙤𝙣𝙖𝙡𝙞𝙯𝙖𝙧 𝙥𝙖𝙧𝙖 𝙘𝙖𝙢𝙗𝙞𝙖𝙧 𝙩𝙪 𝙣𝙤𝙢𝙗𝙧𝙚*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸*
⌬ 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ⌬`,
              mentions: [m.sender]
            },
            { quoted: m }
          )
      }
    }

    setInterval(async () => {
      if (!sock.user) {
        try { sock.ws?.close() } catch { }
        sock.ev.removeAllListeners()
        let i = global.conns.indexOf(sock)
        if (i < 0) return
        delete global.conns[i]
        global.conns.splice(i, 1)
      }
    }, 60000)

    let handler = await import('../baldwind-core/handler.js')
    
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../baldwind-core/handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
      } catch (e) { }
      if (restatConn) {
        const oldChats = sock.chats
        try { sock.ws?.close() } catch { }
        sock.ev.removeAllListeners()
        sock = makeWASocket(connectionOptions, { chats: oldChats })
        isInit = true
      }
      if (!isInit) {
        sock.ev.off("messages.upsert", sock.handler)
        sock.ev.off("connection.update", sock.connectionUpdate)
        sock.ev.off('creds.update', sock.credsUpdate)
      }
      sock.handler = handler.handler.bind(sock)
      sock.connectionUpdate = connectionUpdate.bind(sock)
      sock.credsUpdate = saveCreds.bind(sock)
      sock.ev.on("messages.upsert", sock.handler)
      sock.ev.on("connection.update", sock.connectionUpdate)
      sock.ev.on("creds.update", sock.credsUpdate)
      isInit = false
      return true
    }
    creloadHandler(false)
  })
}