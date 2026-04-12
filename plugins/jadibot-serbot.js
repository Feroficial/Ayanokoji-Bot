/*
⚠ PROHIBIDO EDITAR ⚠ 
SISTEMA DE SUB-BOTS PARA BALDWIND IV
*/

import { useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } from "@whiskeysockets/baileys"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import * as ws from 'ws'
import { fileURLToPath } from 'url'
import { makeWASocket } from '../lib/simple.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const maxSubBots = 500

if (!global.conns) global.conns = []

const SUB_BOT_NAME = '🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸'
const SUB_BOT_BIO = '—͟͟͞͞ 🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸 ⌬'
const SUB_BOT_PIC = 'https://files.catbox.moe/xdpxey.jpg'

let handler = async (m, { conn, usedPrefix }) => {
  if (global.db.data.settings[conn.user.jid]?.jadibotmd === false) {
    return m.reply(`❌ *Sistema de Sub-Bots desactivado*\n> Usa *${usedPrefix}jadibot on* para activarlo`)
  }

  const user = global.db.data.users[m.sender]
  const now = Date.now()
  const cooldownTime = 120000
  
  if (user.subCooldown && now - user.subCooldown < cooldownTime) {
    const remaining = cooldownTime - (now - user.subCooldown)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return m.reply(`⏳ *Espera ${minutes}m ${seconds}s para volver a vincular*`)
  }

  const activeSubBots = global.conns.filter(c => c.user && c.ws?.socket?.readyState === ws.OPEN).length
  if (activeSubBots >= maxSubBots) {
    return m.reply(`❌ *Límite de Sub-Bots alcanzado (${maxSubBots})*`)
  }

  // Mensaje inicial
  await m.reply(`🔮 *INICIANDO VINCULACIÓN*\n📱 Número: ${m.sender.split('@')[0]}\n\n⏳ Generando código...`)

  const userDir = path.join(process.cwd(), 'baldwind-core', 'blackJadiBot', m.sender.split('@')[0])
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true })
  }

  await startSubBot(m, conn, userDir)
}

handler.help = ['code']
handler.tags = ['jadibot']
handler.command = /^(code|jadibot|serbot|subbot)$/i

export default handler

async function startSubBot(m, mainConn, sessionPath) {
  try {
    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath)

    const sock = makeWASocket({
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      browser: Browsers.macOS("Desktop"),
      version: version,
      generateHighQualityLinkPreview: false,
      keepAliveIntervalMs: 30000
    })

    let codeSent = false
    let pairingComplete = false
    
    sock.subBotOwner = m.sender
    sock.subBotOwnerName = m.pushName || 'Anónimo'
    sock.subBotChatId = m.chat

    // ========== ESCUCHAR EL EVENTO DE CONEXIÓN ==========
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update
      const statusCode = lastDisconnect?.error?.output?.statusCode

      // Cuando la conexión está abierta y no hay credenciales, pedir código
      if (connection === 'open' && !state.creds.registered && !codeSent) {
        codeSent = true
        const userNumber = m.sender.split('@')[0]
        
        try {
          console.log(chalk.yellow(`🔑 Solicitando código para: ${userNumber}`))
          
          // Pequeña espera para asegurar
          await new Promise(r => setTimeout(r, 2000))
          
          const code = await sock.requestPairingCode(userNumber)
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code
          
          // ENVIAR EL CÓDIGO
          await mainConn.sendMessage(m.chat, {
            text: `*🜸 TU CÓDIGO ESPIRITUAL 🜸*\n\n*${formattedCode}*\n\n⚠️ Ingresa este código en:\nWhatsApp > Dispositivos vinculados > Vincular con número\n\n🛡️ 100% ANTI-BAN`,
            mentions: [m.sender]
          })
          
          console.log(chalk.green(`✅ Código enviado a ${userNumber}: ${formattedCode}`))
        } catch (e) {
          console.log(chalk.red(`❌ Error: ${e.message}`))
          await mainConn.sendMessage(m.chat, {
            text: `❌ *Error al generar código*\n> ${e.message}\n\n⚠️ Asegúrate que el número sea correcto: ${userNumber}`,
            mentions: [m.sender]
          })
          codeSent = false
        }
      }

      // CONEXIÓN EXITOSA (ya vinculado)
      if (connection === 'open' && state.creds.registered && !pairingComplete) {
        pairingComplete = true
        
        // Configurar perfil
        try {
          await sock.updateProfileName(SUB_BOT_NAME)
          await sock.updateProfileStatus(SUB_BOT_BIO)
        } catch(e) {}
        
        if (user) user.subCooldown = Date.now()
        global.conns.push(sock)
        
        console.log(chalk.green(`✅ Sub-Bot conectado: ${m.sender.split('@')[0]}`))
        
        // NOTIFICACIÓN DE ÉXITO
        await mainConn.sendMessage(m.chat, {
          text: `🟢 *¡VINCULACIÓN EXITOSA!*\n\n⚔️ @${m.sender.split('@')[0]} ahora es Sub-Bot de BALDWIND IV\n\n🛡️ 100% ANTI-BAN`,
          mentions: [m.sender]
        })
      }

      // DESCONEXIÓN
      if (connection === 'close') {
        if (statusCode === 401 || statusCode === 405 || statusCode === 403) {
          await mainConn.sendMessage(m.chat, {
            text: `🔴 *SUB-BOT DESVINCULADO*\n\n⚔️ @${m.sender.split('@')[0]} ya no es Sub-Bot\n\n💫 Usa #code para volver a vincular`,
            mentions: [m.sender]
          })
          fs.rmSync(sessionPath, { recursive: true, force: true })
          const index = global.conns.indexOf(sock)
          if (index !== -1) global.conns.splice(index, 1)
        } else if (statusCode === 428 || statusCode === 408 || statusCode === 500) {
          await mainConn.sendMessage(m.chat, {
            text: `🟡 *SUB-BOT DESCONECTADO*\n\n⚔️ @${m.sender.split('@')[0]}\n🔄 Reconectando automáticamente...`,
            mentions: [m.sender]
          })
        }
      }
    })

    sock.ev.on('creds.update', saveCreds)

  } catch (e) {
    console.log(chalk.red(`❌ Error: ${e.message}`))
    await mainConn.sendMessage(m.chat, { text: `❌ *Error al iniciar Sub-Bot*\n> ${e.message}` })
  }
}