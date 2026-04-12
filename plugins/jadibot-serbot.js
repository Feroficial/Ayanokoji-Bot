/*
⚠ PROHIBIDO EDITAR ⚠ 
SISTEMA DE SUB-BOTS PARA BALDWIND IV
Creado por: 🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 & 𝙑𝙖𝙡𝙚𝙣𝙩𝙞𝙣𝙖𝘿𝙚𝙫 🜸
*/

import { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } from "@whiskeysockets/baileys"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import * as ws from 'ws'
import { fileURLToPath } from 'url'
import { makeWASocket } from '../lib/simple.js'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const maxSubBots = 500

if (!global.conns) global.conns = []
if (!global.subBotStatus) global.subBotStatus = new Map() // Para rastrear estado de sub-bots

// ========== CONFIGURACIÓN DEL SUB-BOT ==========
const SUB_BOT_NAME = '🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸'
const SUB_BOT_BIO = '—͟͟͞͞ 🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸 ⌬'
const SUB_BOT_PIC = 'https://files.catbox.moe/xdpxey.jpg'

// ========== FUNCIÓN PARA ENVIAR NOTIFICACIONES ==========
async function sendNotification(conn, chatId, text, mentions = [], quoted = null) {
  try {
    await conn.sendMessage(chatId, { text, mentions }, { quoted })
    return true
  } catch (e) {
    console.log('Error enviando notificación:', e)
    return false
  }
}

const changeSubBotName = async (sock) => {
  try {
    await sock.updateProfileName(SUB_BOT_NAME)
    console.log(chalk.bold.green(`✅ Sub-Bot renombrado a: ${SUB_BOT_NAME}`))
    return true
  } catch (e) {
    return false
  }
}

const changeSubBotBio = async (sock) => {
  try {
    await sock.updateProfileStatus(SUB_BOT_BIO)
    console.log(chalk.bold.green(`✅ Biografía del Sub-Bot actualizada`))
    return true
  } catch (e) {
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
    return false
  }
}

// ========== HANDLER DEL COMANDO ==========
let handler = async (m, { conn, usedPrefix }) => {
  // Verificar si la función está activada
  if (global.db.data.settings[conn.user.jid]?.jadibotmd === false) {
    return m.reply(`❌ *El sistema de Sub-Bots está desactivado*\n\n> Usa *${usedPrefix}jadibot on* para activarlo`)
  }

  // Verificar cooldown (2 minutos)
  const user = global.db.data.users[m.sender]
  const now = Date.now()
  const cooldownTime = 120000
  
  if (user.subCooldown && now - user.subCooldown < cooldownTime) {
    const remaining = cooldownTime - (now - user.subCooldown)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return m.reply(`—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 🛸* —͟͟͞͞\n\n> ⏳ *Espera ${minutes}m ${seconds}s para volver a vincular*\n\n👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`)
  }

  // Verificar límite de sub-bots
  const activeSubBots = global.conns.filter(c => c.user && c.ws?.socket?.readyState === ws.OPEN).length
  if (activeSubBots >= maxSubBots) {
    return m.reply(`❌ *Límite de Sub-Bots alcanzado (${maxSubBots})*`)
  }

  // Verificar si ya tiene un sub-bot activo
  const existingSubBot = global.conns.find(c => c.subBotOwner === m.sender)
  if (existingSubBot) {
    return m.reply(`—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 🛸* —͟͟͞͞\n\n> ⚠️ *YA TIENES UN SUB-BOT ACTIVO*\n\n> 📌 *Si quieres vincular otro, primero desconecta el actual*\n\n👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`)
  }

  // Mensaje inicial
  await sendNotification(conn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🔮 *INICIANDO VINCULACIÓN*
> 📱 *Número:* ${m.sender.split('@')[0]}

> ⏳ *Generando código mágico...*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)

  // Crear carpeta para el usuario
  const userDir = path.join(process.cwd(), 'baldwind-core', 'blackJadiBot', m.sender.split('@')[0])
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true })
  }

  // Iniciar el sub-bot
  await startSubBot(m, conn, userDir)
}

handler.help = ['code', 'jadibot', 'serbot']
handler.tags = ['jadibot']
handler.command = /^(code|jadibot|serbot|subbot)$/i

export default handler

// ========== FUNCIÓN PRINCIPAL DEL SUB-BOT ==========
async function startSubBot(m, mainConn, sessionPath) {
  try {
    const { version } = await fetchLatestBaileysVersion()
    const msgRetryCache = new NodeCache()
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
      defaultQueryTimeoutMs: undefined,
      keepAliveIntervalMs: 30000
    })

    let codeSent = false
    let pairingComplete = false
    let reconnectAttempts = 0
    let isConnected = false
    
    // Guardar dueño del sub-bot
    sock.subBotOwner = m.sender
    sock.subBotOwnerName = m.pushName || 'Anónimo'
    sock.subBotChatId = m.chat

    // Evento de actualización de conexión
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update
      const statusCode = lastDisconnect?.error?.output?.statusCode

      // ========== GENERAR CÓDIGO ==========
      if (connection === 'open' && !codeSent && !state.creds.registered) {
        codeSent = true
        const userNumber = m.sender.split('@')[0]
        
        try {
          await new Promise(resolve => setTimeout(resolve, 3000))
          const code = await sock.requestPairingCode(userNumber)
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code
          
          await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🜲 *TU CÓDIGO ESPIRITUAL*

> 🔢 *${formattedCode}*

> ⚠️ *Ingresa este código en:*
> 📲 WhatsApp > Dispositivos vinculados > Vincular con número de teléfono

> ⏳ *El código expira en 5 minutos*

> 🛡️ *100% ANTI-BAN • CUENTA PRINCIPAL*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)
          
          console.log(chalk.bold.yellow(`📱 Código generado para ${userNumber}: ${formattedCode}`))
        } catch (e) {
          console.log(chalk.bold.red(`❌ Error: ${e.message}`))
          await sendNotification(mainConn, m.chat, `❌ *Error al generar el código*\n> ${e.message}\n\n🛸 *BALDWIND IV*`, [m.sender], m)
          codeSent = false
        }
      }

      // ========== CONEXIÓN EXITOSA ==========
      if (connection === 'open' && state.creds.registered && !pairingComplete) {
        pairingComplete = true
        isConnected = true
        reconnectAttempts = 0
        
        // Configurar el sub-bot
        await new Promise(resolve => setTimeout(resolve, 3000))
        await changeSubBotName(sock)
        await changeSubBotBio(sock)
        await changeSubBotProfilePic(sock)
        
        // Guardar cooldown
        const user = global.db.data.users[m.sender]
        if (user) user.subCooldown = Date.now()
        
        // Agregar a la lista de sub-bots activos
        global.conns.push(sock)
        global.subBotStatus.set(m.sender, { connected: true, since: Date.now() })
        
        console.log(chalk.bold.green(`✅ Sub-Bot conectado: ${m.sender.split('@')[0]}`))
        
        // ========== NOTIFICACIÓN DE CONEXIÓN EXITOSA ==========
        await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🟢 *¡VINCULACIÓN EXITOSA!*

> ⚔️ *@${m.sender.split('@')[0]} ahora es un Sub-Bot de BALDWIND IV*

> 🜸 *Nombre:* ${SUB_BOT_NAME}
> 📊 *Estado:* 🟢 CONECTADO
> ⏰ *Hora:* ${new Date().toLocaleTimeString()}

> 🛡️ *100% ANTI-BAN*

> ⚠️ *Recuerda: Los Sub-Bots son simples peones al servicio del Reino*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)

        // Enviar mensaje privado al dueño
        try {
          await sendNotification(mainConn, m.sender, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 🛸* —͟͟͞͞

> 🟢 *TU SUB-BOT ESTÁ ACTIVO*

> ⚔️ *¡Bienvenido al ejército de BALDWIND IV!*

> 📌 *Comandos disponibles:*
> • *${global.prefix}menusub* - Ver menú de sub-bot
> • *${global.prefix}infosub* - Información del sub-bot

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`)
        } catch(e) {}
      }

      // ========== DESCONEXIÓN ==========
      if (connection === 'close') {
        isConnected = false
        
        if (statusCode === 401 || statusCode === 405 || statusCode === 403) {
          // Sesión eliminada permanentemente
          console.log(chalk.bold.red(`❌ Sub-Bot eliminado: ${m.sender.split('@')[0]}`))
          
          // ========== NOTIFICACIÓN DE ELIMINACIÓN ==========
          await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🔴 *SUB-BOT DESVINCULADO*

> ⚔️ *@${m.sender.split('@')[0]} ya no es Sub-Bot*

> 📌 *Motivo:* Sesión cerrada permanentemente
> ⏰ *Hora:* ${new Date().toLocaleTimeString()}

> 💫 *Puedes volver a vincular con #code*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)
          
          // Limpiar
          fs.rmSync(sessionPath, { recursive: true, force: true })
          const index = global.conns.indexOf(sock)
          if (index !== -1) global.conns.splice(index, 1)
          global.subBotStatus.delete(m.sender)
          
        } else if (statusCode === 428 || statusCode === 408 || statusCode === 500) {
          // Reconexión automática
          reconnectAttempts++
          console.log(chalk.bold.yellow(`⚠️ Sub-Bot desconectado, reconectando... Intento ${reconnectAttempts}`))
          
          // ========== NOTIFICACIÓN DE DESCONEXIÓN ==========
          await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🟡 *SUB-BOT DESCONECTADO*

> ⚔️ *@${m.sender.split('@')[0]}*

> 📌 *Motivo:* Pérdida de conexión
> 🔄 *Reconectando automáticamente...*
> 📊 *Intento #${reconnectAttempts}*

> ⏰ *Hora:* ${new Date().toLocaleTimeString()}

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)
          
          // Intentar reconectar
          setTimeout(async () => {
            if (!isConnected && sock) {
              try {
                await sock.connect()
              } catch(e) {
                console.log(chalk.bold.red(`❌ Error al reconectar: ${e.message}`))
              }
            }
          }, 5000)
        } else {
          // Desconexión normal
          console.log(chalk.bold.yellow(`⚠️ Sub-Bot desconectado: ${m.sender.split('@')[0]}`))
          
          // ========== NOTIFICACIÓN DE DESCONEXIÓN ==========
          await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🟠 *SUB-BOT DESCONECTADO*

> ⚔️ *@${m.sender.split('@')[0]}*

> 📌 *Motivo:* Conexión cerrada
> ⏰ *Hora:* ${new Date().toLocaleTimeString()}

> 💫 *Usa #code para volver a vincular*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)
        }
      }

      // ========== RECONEXIÓN EXITOSA ==========
      if (connection === 'open' && !isConnected && pairingComplete) {
        isConnected = true
        console.log(chalk.bold.green(`✅ Sub-Bot reconectado: ${m.sender.split('@')[0]}`))
        
        // ========== NOTIFICACIÓN DE RECONEXIÓN ==========
        await sendNotification(mainConn, m.chat, `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🟢 *SUB-BOT RECONECTADO*

> ⚔️ *@${m.sender.split('@')[0]}*

> 📌 *Conexión restablecida exitosamente*
> ⏰ *Hora:* ${new Date().toLocaleTimeString()}

> 🛡️ *Servicio restaurado*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`, [m.sender], m)
      }
    })

    // Guardar credenciales
    sock.ev.on('creds.update', saveCreds)

    // Monitorear salud de la conexión (cada 30 segundos)
    const healthInterval = setInterval(() => {
      if (sock.user && sock.ws?.socket?.readyState === ws.OPEN) {
        if (!isConnected) {
          isConnected = true
          console.log(chalk.bold.green(`✅ Sub-Bot saludable: ${m.sender.split('@')[0]}`))
        }
      } else if (sock.user && sock.ws?.socket?.readyState !== ws.OPEN) {
        if (isConnected) {
          isConnected = false
          console.log(chalk.bold.yellow(`⚠️ Sub-Bot con problemas: ${m.sender.split('@')[0]}`))
        }
      }
    }, 30000)

    // Limpiar intervalo cuando se cierra
    sock.ev.on('connection.update', (update) => {
      if (update.connection === 'close') {
        clearInterval(healthInterval)
      }
    })

    // Manejar mensajes entrantes del sub-bot
    sock.ev.on('messages.upsert', async (msgUpdate) => {
      const msg = msgUpdate.messages[0]
      if (!msg.message) return
      
      // Comando para info del sub-bot
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ''
      if (text.toLowerCase() === '#infosub' || text.toLowerCase() === '!infosub') {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏 🛸* —͟͟͞͞

> 🜸 *INFORMACIÓN DEL SUB-BOT*

> 📛 *Nombre:* ${SUB_BOT_NAME}
> 👑 *Dueño:* @${m.sender.split('@')[0]}
> 📊 *Estado:* ${isConnected ? '🟢 CONECTADO' : '🔴 DESCONECTADO'}
> ⏰ *Vinculado:* ${new Date().toLocaleDateString()}

> 🛡️ *BALDWIND IV - CYBER CORE*

👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`,
          mentions: [m.sender]
        })
      }
    })

  } catch (e) {
    console.log(chalk.bold.red(`❌ Error en Sub-Bot: ${e.message}`))
    await sendNotification(mainConn, m.chat, `❌ *Error al iniciar Sub-Bot*\n> ${e.message}`, [m.sender], m)
  }
}

// ========== COMANDO PARA VER SUB-BOTS ACTIVOS ==========
export async function listSubBots(m, conn) {
  const activeBots = global.conns.filter(c => c.user && c.ws?.socket?.readyState === ws.OPEN)
  
  if (activeBots.length === 0) {
    return m.reply(`—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 🛸* —͟͟͞͞\n\n> 📌 *No hay Sub-Bots activos en este momento*`)
  }
  
  let text = `—͟͟͞͞   *🜸 𝘽𝘼𝙇𝘿𝙒𝙄𝙉𝘿 𝙄𝙑 • 𝙎𝙐𝘽-𝘽𝙊𝙏𝙎 🛸* —͟͟͞͞\n\n> 📊 *SUB-BOTS ACTIVOS: ${activeBots.length}*\n\n`
  
  for (let i = 0; i < activeBots.length; i++) {
    const bot = activeBots[i]
    const owner = bot.subBotOwner?.split('@')[0] || 'Desconocido'
    text += `> ${i + 1}. 👤 @${owner}\n`
  }
  
  text += `\n👑 *🜸 𝙇𝙮𝙤𝙣𝙣𝘿𝙚𝙫 🜸*`
  
  await conn.sendMessage(m.chat, { text, mentions: activeBots.map(b => b.subBotOwner).filter(Boolean) })
}