process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import pino from 'pino'
import path, { join, dirname } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from '../lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import store from '../lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
import fetch from 'node-fetch'

const { CONNECTING } = ws
const { chain } = lodash
protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.timestamp = { start: new Date() }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/!.]')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('./src/database/database.json'))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
        return new Promise((resolve) => setInterval(async function () {
            if (!global.db.READ) {
                clearInterval(this)
                resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
            }
        }, 1 * 1000))
    }
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {}),
    }
    global.db.chain = chain(global.db.data)
}
loadDatabase()

const { state, saveState, saveCreds } = await useMultiFileAuthState(global.sessions)
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion()

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const configFile = './bot-config.json'
let config = { modo: '1', numero: '' }

if (fs.existsSync(configFile)) {
    try {
        config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
        console.log(chalk.bold.green(`✅ ᴄᴏɴғɪɢᴜʀᴀᴄɪóɴ ᴄᴀʀɢᴀᴅᴀ: ᴍᴏᴅᴏ ${config.modo === '1' ? 'QR' : 'Cóᴅɪɢᴏ ᴅᴇ 8 ᴅíɢɪᴛᴏs'}${config.numero ? ` - Núᴍᴇʀᴏ: ${config.numero}` : ''}`))
    } catch (e) {
        console.log(chalk.bold.red('❌ ᴇʀʀᴏʀ ʟᴇʏᴇɴᴅᴏ ᴄᴏɴғɪɢᴜʀᴀᴄɪóɴ'))
        await solicitarConfiguracion()
    }
} else {
    await solicitarConfiguracion()
}

async function solicitarConfiguracion() {
    let opcion
    do {
        opcion = await question(
            chalk.bgMagenta.black('🌸 αℓуα - вσт - sᴇʟᴇᴄᴄɪᴏɴᴀ ᴍᴏᴅᴏ:\n') +
            chalk.bold.magenta('1. Cóᴅɪɢᴏ QR\n') +
            chalk.bold.cyan('2. Cóᴅɪɢᴏ ᴅᴇ 8 ᴅíɢɪᴛᴏs\n🌸➤ ')
        )
        if (!/^[1-2]$/.test(opcion)) {
            console.log(chalk.bold.redBright(`✨ ᴏᴘᴄɪóɴ ɪɴᴠáʟɪᴅᴀ. ᴇʟɪɢᴇ 1 ᴏ 2.`))
        }
    } while (opcion !== '1' && opcion !== '2')

    config.modo = opcion

    if (opcion === '2') {
        let numero = await question(chalk.bgMagenta(chalk.bold.white(`🌸 ɪɴɢʀᴇsᴀ ᴛᴜ Núᴍᴇʀᴏ ᴄᴏɴ Cóᴅɪɢᴏ ᴅᴇ ᴘᴀís sɪɴ +:\n🌸➤ `)))
        numero = numero.replace(/\D/g, '')
        config.numero = numero
        console.log(chalk.bold.green(`✅ Núᴍᴇʀᴏ ɢᴜᴀʀᴅᴀᴅᴏ: ${numero}`))
    }

    fs.writeFileSync(configFile, JSON.stringify(config, null, 2))
    console.log(chalk.bold.green(`✅ ᴄᴏɴғɪɢᴜʀᴀᴄɪóɴ ɢᴜᴀʀᴅᴀᴅᴀ`))
}

console.log(chalk.bold.green(`✅ ᴍᴏᴅᴏ sᴇʟᴇᴄᴄɪᴏɴᴀᴅᴏ: ${config.modo === '1' ? 'QR' : 'Cóᴅɪɢᴏ ᴅᴇ 8 ᴅíɢɪᴛᴏs'}\n`))

console.info = () => { }
console.debug = () => { }

const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: config.modo === '1',
    browser: config.modo === '1' ? [`${global.nameqr}`, 'Edge', '20.0.04'] : ['Windows', 'Chrome', 'Chrome 114.0.5735.198'],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid)
        let msg = await store.loadMessage(jid, clave.id)
        return msg?.message || ""
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
    version,
    keepAliveIntervalMs: 30000,
}

global.conn = makeWASocket(connectionOptions)

let pairingRequested = false
let reconnectAttempts = 0
let reconnectTimer = null
let keepAlivePing = null

function startKeepAlive() {
    if (keepAlivePing) clearInterval(keepAlivePing)
    keepAlivePing = setInterval(() => {
        if (global.conn && global.conn.user && global.stopped === 'open') {
            global.conn.sendPresenceUpdate('available').catch(() => {})
            if (global.conn.ws && global.conn.ws.send) {
                try { global.conn.ws.send('2') } catch(e) {}
            }
        }
    }, 25000)
}

async function reconnectBot() {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    if (reconnectAttempts > 15) {
        console.log(chalk.red('❌ ᴅᴇᴍᴀsɪᴀᴅᴏs ʀᴇɪɴᴛᴇɴᴛᴏs. ʀᴇɪɴɪᴄɪᴀɴᴅᴏ ᴇɴ 30 sᴇɢᴜɴᴅᴏs...'))
        setTimeout(() => process.exit(1), 30000)
        return
    }
    const delay = Math.min(5000 * Math.pow(1.3, reconnectAttempts), 45000)
    console.log(chalk.yellow(`🔄 ʀᴇɪɴᴛᴇɴᴛᴀɴᴅᴏ ᴇɴ ${delay / 1000}s (ɪɴᴛᴇɴᴛᴏ ${reconnectAttempts + 1}/15)...`))
    reconnectTimer = setTimeout(async () => {
        reconnectAttempts++
        try {
            if (global.conn && global.conn.ws) try { global.conn.ws.close() } catch(e) {}
            global.conn.ev.removeAllListeners()
            global.conn = makeWASocket(connectionOptions)
            await global.reloadHandler(true)
            console.log(chalk.green('✅ ʀᴇᴄᴏɴᴇxɪóɴ ᴇxɪᴛᴏsᴀ'))
        } catch (err) {
            console.error(chalk.red('❌ ᴇʀʀᴏʀ:', err.message))
            reconnectBot()
        }
    }, delay)
}

async function updateBotProfilePicture(imageUrl) {
    try {
        const imgRes = await fetch(imageUrl)
        if (imgRes.ok) {
            const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
            await global.conn.updateProfilePicture(global.conn.user.jid, imgBuffer)
            console.log(chalk.bold.green('✅ ғᴏᴛᴏ ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴀ 🌸'))
        }
    } catch (e) {
        console.log(chalk.bold.red(`❌ ᴇʀʀᴏʀ: ${e.message}`))
    }
}

async function getGroupPicture(groupJid) {
    try {
        return await global.conn.profilePictureUrl(groupJid, 'image')
    } catch (e) {
        return 'https://files.catbox.moe/z4qgf1.jpeg'
    }
}

async function requestPairingCode() {
    if (pairingRequested) return
    pairingRequested = true
    if (!config.numero) {
        console.log(chalk.red('❌ Nᴏ ʜᴀʏ Núᴍᴇʀᴏ ɢᴜᴀʀᴅᴀᴅᴏ'))
        return
    }
    try {
        console.log(chalk.yellow(`📱 Sᴏʟɪᴄɪᴛᴀɴᴅᴏ Cóᴅɪɢᴏ ᴘᴀʀᴀ: ${config.numero}...`))
        let codeBot = await global.conn.requestPairingCode(config.numero)
        let formattedCode = codeBot.match(/.{1,4}/g)?.join("-") || codeBot
        console.log(chalk.bold.white(chalk.bgMagenta(`🌸 Cóᴅɪɢᴏ: ${formattedCode} 🌸`)))
        console.log(chalk.cyan(`📌 Iɴɢʀᴇsᴀ ᴇsᴛᴇ Cóᴅɪɢᴏ ᴇɴ WʜᴀᴛsAᴘᴘ > Dɪsᴘᴏsɪᴛɪᴠᴏs Vɪɴᴄᴜʟᴀᴅᴏs`))
    } catch (e) {
        console.log(chalk.red('❌ Eʀʀᴏʀ:', e.message))
        pairingRequested = false
    }
}

async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update
    const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
    global.stopped = connection

    if (config.modo === '2' && !pairingRequested && !global.conn.authState.creds.registered) {
        setTimeout(() => {
            if (!pairingRequested && !global.conn.authState.creds.registered) requestPairingCode()
        }, 1000)
    }

    if (isNewLogin) {
        global.conn.isInit = true
        reconnectAttempts = 0
        console.log(chalk.green('✅ Nᴜᴇᴠᴀ sᴇsɪóɴ ɪɴɪᴄɪᴀᴅᴀ'))
    }
    if (!global.db.data) loadDatabase()

    if ((qr && qr !== '0') && config.modo === '1') {
        console.log(chalk.bold.magenta(`\n❐ ESCANEA EL CÓDIGO QR 🌸`))
    }

    if (connection === 'open') {
        console.log(chalk.bold.magenta('\n🌸 αℓуα - вσт ᴄᴏɴᴇᴄᴛᴀᴅᴀ 🌸'))
        await updateBotProfilePicture('https://files.catbox.moe/z4qgf1.jpeg')
        startKeepAlive()
    }

    if (connection === 'close') {
        if (keepAlivePing) clearInterval(keepAlivePing)
        if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.bold.redBright(`\n⚠︎ SESIÓN INVÁLIDA, BORRA LA CARPETA ${global.sessions} Y REINICIA ⚠︎`))
        } else {
            console.log(chalk.bold.magentaBright(`\n⚠︎ CONEXIÓN PERDIDA, RECONECTANDO...`))
            reconnectBot()
        }
    }
}

global.conn.ev.on('connection.update', connectionUpdate)

global.conn.ev.on('group-participants.update', async (update) => {
    try {
        const { id, participants, action } = update
        if (!global.db.data) await loadDatabase()
        if (!global.db.data.chats[id]) global.db.data.chats[id] = {}
        const chat = global.db.data.chats[id]
        const welcomeEnabled = 'welcome' in chat ? chat.welcome : true
        if (!welcomeEnabled) return

        const groupMetadata = await global.conn.groupMetadata(id).catch(() => null)
        const groupName = groupMetadata?.subject || 'ᴇʟ ɢʀᴜᴘᴏ'
        const memberCount = groupMetadata?.participants?.length || 0
        let groupIcon = 'https://files.catbox.moe/z4qgf1.jpeg'
        try {
            const icon = await global.conn.profilePictureUrl(id, 'image')
            if (icon) groupIcon = icon
        } catch (e) {}

        if (action === 'add') {
            for (const jid of participants) {
                try {
                    if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
                    let userData = global.db.data.users[jid]
                    let userLevel = userData.level || 1
                    let userRole = userData.role || '🌱 Aᴘʀᴇɴᴅɪᴢ'

                    let welcomeText = chat.welcomeMessage || `
ㅤ    ꒰  ㅤ 🌸 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вιєηνєηι∂@ 木 ✨ ㅤ 性

> ₊· ⫏⫏ ㅤ 👤 @${jid.split('@')[0]}
> ₊· ⫏⫏ ㅤ 📊 Nɪᴠᴇʟ: ${userLevel}
> ₊· ⫏⫏ ㅤ 🌸 Rᴏʟ: ${userRole}
> ₊· ⫏⫏ ㅤ 👥 Mɪᴇᴍʙʀᴏs: ${memberCount}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌟 Dɪsғʀᴜᴛᴀ ${groupName}`

                    await global.conn.sendMessage(id, { 
                        image: { url: groupIcon }, 
                        caption: welcomeText, 
                        mentions: [jid] 
                    })
                    
                    if (chat.welcomeBonus !== false) {
                        userData.monedas = (userData.monedas || 0) + 50
                        userData.exp = (userData.exp || 0) + 100
                    }
                } catch(e) { console.log('Error en welcome:', e) }
            }
        }

        if (action === 'remove') {
            for (const jid of participants) {
                try {
                    const goodbyeText = `
ㅤ    ꒰  ㅤ 👋 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ нαsтα 木 ρʀᴏɴтᴏ ㅤ 性

> ₊· ⫏⫏ ㅤ 👤 @${jid.split('@')[0]} нᴀ ᴀʙᴀɴᴅᴏɴᴀᴅᴏ
> ₊· ⫏⫏ ㅤ 👥 Mɪᴇᴍʙʀᴏs ʀᴇsᴛᴀɴᴛᴇs: ${memberCount}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱`
                    
                    await global.conn.sendMessage(id, { 
                        image: { url: groupIcon }, 
                        caption: goodbyeText, 
                        mentions: [jid] 
                    })
                } catch(e) {}
            }
        }
    } catch (e) { console.log('Error en group-participants:', e) }
})

let isInit = true
let handler = await import('./handler.js')

global.reloadHandler = async function (restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
        if (Handler && (Handler.handler || Handler.default)) handler = Handler.default || Handler
    } catch (e) { console.error(e) }
    if (restatConn) {
        const oldChats = global.conn.chats
        try { global.conn.ws.close() } catch { }
        global.conn.ev.removeAllListeners()
        global.conn = makeWASocket(connectionOptions, { chats: oldChats })
        isInit = true
    }
    if (!isInit) {
        global.conn.ev.off('messages.upsert', global.conn.handler)
        global.conn.ev.off('connection.update', global.conn.connectionUpdate)
        global.conn.ev.off('creds.update', global.conn.credsUpdate)
    }
    global.conn.handler = (handler.handler || handler).bind(global.conn)
    global.conn.connectionUpdate = connectionUpdate
    global.conn.credsUpdate = saveCreds.bind(global.conn, true)

    global.conn.ev.on('messages.upsert', async (m) => {
        if (m.messages && m.messages[0] && m.messages[0].key && m.messages[0].key.remoteJid) {
            const jid = m.messages[0].key.remoteJid
            await global.conn.sendPresenceUpdate('composing', jid)
            await global.conn.handler(m)
            await global.conn.readMessages([m.messages[0].key])
            await global.conn.sendPresenceUpdate('paused', jid)
        }
    })
    global.conn.ev.on('connection.update', global.conn.connectionUpdate)
    global.conn.ev.on('creds.update', global.conn.credsUpdate)

    isInit = false
    return true
}

global.conn.isInit = false
global.conn.logger.info(` 🌸 αℓуα - вσт ɪɴɪᴄɪᴀᴅᴀ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ 🌸\n`)

if (!opts['test']) {
    if (global.db) setInterval(async () => { if (global.db.data) await global.db.write() }, 30 * 1000)
}

process.on('uncaughtException', (err) => { console.error(chalk.red.bold('✘ ERROR:', err)); reconnectBot() })
process.on('unhandledRejection', (reason) => { console.error(chalk.red.bold('✘ RECHAZO:', reason)); reconnectBot() })

const pluginFolder = global.__dirname(join(__dirname, '../plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}

async function filesInit() {
    for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            const file = global.__filename(join(pluginFolder, filename))
            const module = await import(file)
            global.plugins[filename] = module.default || module
        } catch (e) { console.error(e); delete global.plugins[filename] }
    }
}
filesInit().catch(console.error)

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        const dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in global.plugins) {
            if (existsSync(dir)) global.conn.logger.info(` updated plugin - '${filename}'`)
            else { global.conn.logger.warn(`deleted plugin - '${filename}'`); return delete global.plugins[filename] }
        } else global.conn.logger.info(`new plugin - '${filename}'`)
        const err = syntaxerror(readFileSync(dir), filename, { sourceType: 'module', allowAwaitOutsideFunction: true })
        if (err) global.conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else {
            try {
                const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
                global.plugins[filename] = module.default || module
            } catch (e) { global.conn.logger.error(`error require plugin '${filename}\n${format(e)}`) }
            finally { global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))) }
        }
    }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

function clearTmp() {
    const tmpDir = join(process.cwd(), 'tmp')
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true })
    readdirSync(tmpDir).forEach(file => { try { unlinkSync(join(tmpDir, file)) } catch (e) {} })
}

setInterval(async () => { if (global.stopped !== 'close' && global.conn && global.conn.user) await clearTmp() }, 1000 * 60 * 4)

async function _quickTest() {
    const test = await Promise.all([
        spawn('ffmpeg'), spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'), spawn('magick'), spawn('gm'), spawn('find', ['--version'])
    ].map(p => Promise.race([new Promise(resolve => p.on('close', code => resolve(code !== 127))), new Promise(resolve => p.on('error', () => resolve(false)))])))
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
    global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
    Object.freeze(global.support)
}
_quickTest().catch(console.error)