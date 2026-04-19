process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import cluster from 'cluster'
const { setupMaster, fork } = cluster
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
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
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
const msgRetryCounterMap = (MessageRetryMap) => { }
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

let opcion
const credsExist = fs.existsSync(`./${global.sessions}/creds.json`)

do {
    opcion = await question(
        chalk.bgYellow.black('⌬ BALDWIND IV - SELECCIONA MODO:\n') +
        chalk.bold.yellow('1. Código QR\n') +
        chalk.bold.cyan('2. Código de 8 dígitos\n🜸➤ ')
    )
    if (!/^[1-2]$/.test(opcion)) {
        console.log(chalk.bold.redBright(`✞ Opción inválida. Elige 1 o 2.`))
    }
} while (opcion !== '1' && opcion !== '2')

console.log(chalk.bold.green(`✅ Modo seleccionado: ${opcion === '1' ? 'QR' : 'Código de 8 dígitos'}\n`))

console.info = () => { }
console.debug = () => { }

const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: opcion === '1',
    mobile: MethodMobile,
    browser: opcion === '1' ? [`${global.nameqr}`, 'Edge', '20.0.04'] : ['Windows', 'Chrome', 'Chrome 114.0.5735.198'],
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
    msgRetryCounterMap,
    defaultQueryTimeoutMs: undefined,
    version,
}

global.conn = makeWASocket(connectionOptions)

let pairingRequested = false
let pairingNumber = null

async function updateBotName(nombre) {
    try {
        await global.conn.updateProfileName(nombre)
        console.log(chalk.bold.green(`✅ NOMBRE DEL BOT ACTUALIZADO: ${nombre}`))
        return true
    } catch (e) {
        console.log(chalk.bold.red(`❌ ERROR: ${e.message}`))
        return false
    }
}

async function updateBotStatus(estado) {
    try {
        await global.conn.updateProfileStatus(estado)
        console.log(chalk.bold.green(`✅ DESCRIPCIÓN ACTUALIZADA`))
        return true
    } catch (e) {
        console.log(chalk.bold.red(`❌ ERROR: ${e.message}`))
        return false
    }
}

async function updateBotProfilePicture(imageUrl) {
    try {
        const imgRes = await fetch(imageUrl)
        if (imgRes.ok) {
            const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
            await global.conn.updateProfilePicture(global.conn.user.jid, imgBuffer)
            console.log(chalk.bold.green('✅ FOTO ACTUALIZADA'))
            return true
        }
    } catch (e) {
        console.log(chalk.bold.red(`❌ ERROR: ${e.message}`))
        return false
    }
}

async function getGroupPicture(groupJid) {
    try {
        const url = await global.conn.profilePictureUrl(groupJid, 'image')
        return url
    } catch (e) {
        return 'https://files.catbox.moe/xdpxey.jpg'
    }
}

async function requestPairingCode() {
    if (pairingRequested) return
    pairingRequested = true
    
    try {
        let userNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`✞ INGRESA TU NÚMERO SIN +:\n🜸➤ `)))
        userNumber = userNumber.replace(/\D/g, '')
        pairingNumber = userNumber
        rl.close()
        
        console.log(chalk.yellow(`📱 Solicitando código para: ${userNumber}...`))
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        let codeBot = await global.conn.requestPairingCode(userNumber)
        let formattedCode = codeBot.match(/.{1,4}/g)?.join("-") || codeBot
        
        console.log(chalk.bold.white(chalk.bgMagenta(`🜸 CÓDIGO: ${formattedCode} 🜸`)))
        console.log(chalk.cyan(`📌 Ingresa este código en: WhatsApp > Dispositivos vinculados`))
    } catch (e) {
        console.log(chalk.red('❌ Error:', e.message))
        pairingRequested = false
    }
}

async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update
    const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
    global.stopped = connection

    if (opcion === '2' && !pairingRequested && !global.conn.authState.creds.registered) {
        setTimeout(() => {
            if (!pairingRequested && !global.conn.authState.creds.registered) {
                requestPairingCode()
            }
        }, 1000)
    }

    if (isNewLogin) global.conn.isInit = true
    if (!global.db.data) loadDatabase()

    if ((qr && qr !== '0') && opcion === '1') {
        console.log(chalk.bold.yellow(`\n❐ ESCANEA EL CÓDIGO QR`))
    }

    if (connection === 'open') {
        console.log(chalk.bold.green('\n🜸 BALDWIND IV BOT CONECTADO 🛸'))
        
        await updateBotName('🜸 BALDWIND IV | Cyber Core 🛸')
        
        const uptime = process.uptime()
        const horas = Math.floor(uptime / 3600)
        const minutos = Math.floor((uptime % 3600) / 60)
        await updateBotStatus(`🜸 BALDWIND IV | Activo ${horas}h ${minutos}m | Creado por DevLyonn`)
        
        await updateBotProfilePicture('https://files.catbox.moe/xdpxey.jpg')
    }

    if (connection === 'close') {
        switch (reason) {
            case DisconnectReason.badSession:
            case DisconnectReason.loggedOut:
                console.log(chalk.bold.redBright(`\n⚠︎ SESIÓN INVÁLIDA, BORRA LA CARPETA ${global.sessions} Y REINICIA ⚠︎`))
                break
            case DisconnectReason.connectionClosed:
            case DisconnectReason.connectionLost:
            case DisconnectReason.timedOut:
                console.log(chalk.bold.magentaBright(`\n⚠︎ CONEXIÓN PERDIDA, RECONECTANDO...`))
                break
            case DisconnectReason.connectionReplaced:
                console.log(chalk.bold.yellowBright(`\n⚠︎ CONEXIÓN REEMPLAZADA`))
                return
            case DisconnectReason.restartRequired:
                console.log(chalk.bold.cyanBright(`\n☑ REINICIANDO SESIÓN...`))
                break
            default:
                console.log(chalk.bold.redBright(`\n⚠︎ DESCONEXIÓN DESCONOCIDA`))
                break
        }

        if (global.conn?.ws?.socket === null) {
            await global.reloadHandler(true).catch(console.error)
            global.timestamp.connect = new Date()
        }
    }
}

global.conn.ev.on('connection.update', connectionUpdate)

// ========== SISTEMA DE WELCOME Y EVENTOS ==========
global.conn.ev.on('group-participants.update', async (update) => {
    try {
        const { id, participants, action } = update;
        
        if (!global.db.data) await loadDatabase();
        
        if (!global.db.data.chats[id]) {
            global.db.data.chats[id] = {};
        }
        
        const chat = global.db.data.chats[id];
        const groupMetadata = await global.conn.groupMetadata(id).catch(() => null);
        const groupName = groupMetadata?.subject || 'el grupo';
        const ahora = new Date().toLocaleTimeString();
        const isBotAdmin = groupMetadata?.participants?.find(v => v.id === global.conn.user.jid)?.admin === 'admin' || groupMetadata?.participants?.find(v => v.id === global.conn.user.jid)?.admin === 'superadmin';
        
        const eventos = {
            'add': '➕ SE UNIÓ AL GRUPO ➕',
            'remove': '➖ SALIÓ DEL GRUPO ➖',
            'promote': '👑 NOMBRADO ADMIN 👑',
            'demote': '❌ REMOVIDO ADMIN ❌'
        };
        
        const descripcion = {
            'add': 'nuevo miembro',
            'remove': 'miembro eliminado/salido',
            'promote': 'usuario ascendido a administrador',
            'demote': 'usuario degradado de administrador'
        };
        
        if (eventos[action]) {
            for (const jid of participants) {
                const usuario = jid.split('@')[0];
                let texto = `—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> 🔔 EVENTO DETECTADO 🔔\n\n> ${eventos[action]}\n> 👤 Usuario: @${usuario}\n> 📌 Grupo: ${groupName}\n> 📋 Acción: ${descripcion[action]}\n> ⏰ Hora: ${ahora}\n\n👑 DevLyonn`;
                await global.conn.sendMessage(id, { text: texto, mentions: [jid] });
            }
        }
        
        if (action === 'add') {
            for (const jid of participants) {
                const numeroEntrante = jid.split('@')[0];
                const codigosPeligrosos = ['232', '268', '504', '876', '473', '809', '829', '849', '370', '371', '375', '381', '225', '233', '234', '91', '7', '255', '563', '92'];
                let esPeligroso = false;
                let codigoEncontrado = '';
                for (let codigo of codigosPeligrosos) {
                    if (numeroEntrante.startsWith(codigo)) {
                        esPeligroso = true;
                        codigoEncontrado = codigo;
                        break;
                    }
                }
                if (esPeligroso && isBotAdmin) {
                    try {
                        await global.conn.groupParticipantsUpdate(id, [jid], 'remove');
                        await global.conn.sendMessage(id, { text: `🚫 NÚMERO PROHIBIDO +${codigoEncontrado} bloqueado` });
                    } catch(e) {}
                }
            }
        }
        
        if (!chat || chat.welcome !== true) return;
        
        const memberCount = groupMetadata?.participants?.length || 0;
        const groupIcon = await getGroupPicture(id);
        
        if (action === 'add') {
            for (const jid of participants) {
                try {
                    if (!global.db.data.users[jid]) global.db.data.users[jid] = {};
                    let userData = global.db.data.users[jid];
                    let userLevel = userData.level || 1;
                    let userRole = userData.role || '⚔️ Escudero';
                    
                    let welcomeText = chat.welcomeMessage || `—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> ✨ BIENVENIDO/A ✨\n\n> 👤 @user\n> 📊 Nivel: @level\n> 🛡️ Rol: @role\n> 👥 Miembros: @count\n\n> 🌟 Disfruta @group\n\n👑 DevLyonn`;
                    
                    welcomeText = welcomeText
                        .replace(/@user/g, `@${jid.split('@')[0]}`)
                        .replace(/@level/g, userLevel)
                        .replace(/@role/g, userRole)
                        .replace(/@count/g, memberCount)
                        .replace(/@group/g, groupName);
                    
                    await global.conn.sendMessage(id, { image: { url: groupIcon }, caption: welcomeText, mentions: [jid] });
                    
                    if (chat.welcomeBonus !== false) {
                        userData.monedas = (userData.monedas || 0) + 50;
                        userData.exp = (userData.exp || 0) + 100;
                    }
                } catch(e) {}
            }
        }
        
        if (action === 'remove') {
            for (const jid of participants) {
                try {
                    const goodbyeText = `—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> 👋 HASTA PRONTO 👋\n\n> 👤 @${jid.split('@')[0]} ha abandonado el grupo\n> 👥 Miembros restantes: ${memberCount}\n\n👑 DevLyonn`;
                    await global.conn.sendMessage(id, { image: { url: groupIcon }, caption: goodbyeText, mentions: [jid] });
                } catch(e) {}
            }
        }
    } catch (e) {
        console.log(chalk.red(`❌ Error: ${e.message}`));
    }
});

// ========== CIERRE AUTOMÁTICO POR HORARIO ==========
async function autoLockGroup() {
    try {
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActual = ahora.getMinutes();
        const horaActualCompleta = horaActual + (minutosActual / 60);
        
        const gruposAutomaticos = [];
        
        for (let id in global.db.data.chats) {
            if (id && id.endsWith('@g.us')) {
                const chat = global.db.data.chats[id];
                if (chat && chat.autoLock && chat.autoLock.active === true) {
                    gruposAutomaticos.push({
                        id: id,
                        cierre: chat.autoLock.cierre || 22,
                        apertura: chat.autoLock.apertura || 6
                    });
                }
            }
        }
        
        for (let grupo of gruposAutomaticos) {
            const debeEstarCerrado = (horaActualCompleta >= grupo.cierre || horaActualCompleta < grupo.apertura);
            
            try {
                const metadata = await global.conn.groupMetadata(grupo.id);
                if (!metadata) continue;
                
                const estaCerrado = metadata.announce === true;
                const groupName = metadata.subject || 'el grupo';
                
                if (debeEstarCerrado && !estaCerrado) {
                    await global.conn.groupSettingUpdate(grupo.id, 'announcement');
                    console.log(chalk.yellow(`🔒 ${groupName} se cerró`));
                    
                    await global.conn.sendMessage(grupo.id, {
                        text: `—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> 🔒 *GRUPO CERRADO AUTOMÁTICAMENTE* 🔒\n\n> ⏰ *Horario nocturno activado*\n> 🔐 *Cierra a las: ${grupo.cierre}:00*\n> 🔓 *Abre a las: ${grupo.apertura}:00*\n> 📌 *Solo administradores pueden enviar mensajes*\n\n👑 *DevLyonn*`
                    });
                    
                } else if (!debeEstarCerrado && estaCerrado) {
                    await global.conn.groupSettingUpdate(grupo.id, 'not_announcement');
                    console.log(chalk.green(`🔓 ${groupName} se abrió`));
                    
                    await global.conn.sendMessage(grupo.id, {
                        text: `—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n> 🔓 *GRUPO ABIERTO AUTOMÁTICAMENTE* 🔓\n\n> ⏰ *Horario nocturno finalizado*\n> 🌅 *Ya son las ${grupo.apertura}:00 AM*\n> 📌 *Todos los miembros pueden enviar mensajes*\n\n👑 *DevLyonn*`
                    });
                }
            } catch(e) {
                console.log(chalk.red(`❌ Error con grupo: ${e.message}`));
            }
        }
    } catch(e) {
        console.log(chalk.red(`❌ Error en autoLock: ${e.message}`));
    }
}

setInterval(autoLockGroup, 60000);
setTimeout(autoLockGroup, 5000);

// ========== ACTUALIZAR DESCRIPCIÓN ==========
setInterval(async () => {
    if (global.conn && global.conn.user) {
        const uptime = process.uptime()
        const horas = Math.floor(uptime / 3600)
        const minutos = Math.floor((uptime % 3600) / 60)
        const segundos = Math.floor(uptime % 60)
        await updateBotStatus(`🜸 BALDWIND IV | Activo ${horas}h ${minutos}m ${segundos}s | Creado por DevLyonn`)
    }
}, 60000)

.catch(console.error)
        if (Handler && (Handler.handler || Handler.default)) {
            handler = Handler.default || Handler
        }
    } catch (e) {
        console.error(e)
    }
    if (restatConn) {
        const oldChats = global.conn.chats
        try {
            global.conn.ws.close()
        } catch { }
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

         // ========== RELOAD HANDLER ==========
let isInit = true
let handler = await import('./handler.js')

global.reloadHandler = async function (restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
        if (Handler && (Handler.handler || Handler.default)) {
            handler = Handler.default || Handler
        }
    } catch (e) {
        console.error(e)
    }
    if (restatConn) {
        const oldChats = global.conn.chats
        try {
            global.conn.ws.close()
        } catch { }
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
global.conn.well = false
global.conn.logger.info(` ✞ H E C H O\n`)

if (!opts['test']) {
    if (global.db) setInterval(async () => {
        if (global.db.data) await global.db.write()
    }, 30 * 1000)
}

process.on('uncaughtException', (err) => {
    console.error(chalk.red.bold('✘ ERROR:', err))
})
process.on('unhandledRejection', (reason) => {
    console.error(chalk.red.bold('✘ RECHAZO:', reason))
})

global.rutaJadiBot = join(__dirname, '../baldwind-core/baldwindJadiBot')
if (global.blackJadibts) {
    if (!existsSync(global.rutaJadiBot)) {
        mkdirSync(global.rutaJadiBot, { recursive: true })
        console.log(chalk.bold.cyan(`✅ Carpeta de sub-bots creada`))
    }
}

const pluginFolder = global.__dirname(join(__dirname, '../plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}

async function filesInit() {
    for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            const file = global.__filename(join(pluginFolder, filename))
            const module = await import(file)
            global.plugins[filename] = module.default || module
        } catch (e) {
            global.conn.logger.error(e)
            delete global.plugins[filename]
        }
    }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        const dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in global.plugins) {
            if (existsSync(dir)) global.conn.logger.info(` updated plugin - '${filename}'`)
            else {
                global.conn.logger.warn(`deleted plugin - '${filename}'`)
                return delete global.plugins[filename]
            }
        } else global.conn.logger.info(`new plugin - '${filename}'`)
        const err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true,
        })
        if (err) global.conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else {
            try {
                const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
                global.plugins[filename] = module.default || module
            } catch (e) {
                global.conn.logger.error(`error require plugin '${filename}\n${format(e)}`)
            } finally {
                global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
            }
        }
    }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

async function _quickTest() {
    const test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version']),
    ].map((p) => {
        return Promise.race([
            new Promise((resolve) => {
                p.on('close', (code) => {
                    resolve(code !== 127)
                })
            }),
            new Promise((resolve) => {
                p.on('error', (_) => resolve(false))
            })
        ])
    }))
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
    const s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
    Object.freeze(global.support)
}

function clearTmp() {
    const tmpDir = join(process.cwd(), 'tmp')
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true })
    const filenames = readdirSync(tmpDir)
    filenames.forEach(file => {
        const filePath = join(tmpDir, file)
        try {
            unlinkSync(filePath)
        } catch (e) { }
    })
}

function purgeSession() {
    let prekey = []
    let directorio = readdirSync(`./${global.sessions}`)
    let filesFolderPreKeys = directorio.filter(file => file.startsWith('pre-key-'))
    prekey = [...prekey, ...filesFolderPreKeys]
    filesFolderPreKeys.forEach(files => {
        try {
            unlinkSync(`./${global.sessions}/${files}`)
        } catch (e) { }
    })
}

function purgeSessionSB() {
    try {
        const listaDirectorios = readdirSync(global.rutaJadiBot)
        listaDirectorios.forEach(directorio => {
            if (statSync(join(global.rutaJadiBot, directorio)).isDirectory()) {
                const DSBPreKeys = readdirSync(join(global.rutaJadiBot, directorio)).filter(fileInDir => fileInDir.startsWith('pre-key-'))
                DSBPreKeys.forEach(fileInDir => {
                    if (fileInDir !== 'creds.json') {
                        try {
                            unlinkSync(join(global.rutaJadiBot, directorio, fileInDir))
                        } catch (e) { }
                    }
                })
            }
        })
    } catch (err) {}
}

function purgeOldFiles() {
    const directories = [`./${global.sessions}/`, global.rutaJadiBot]
    directories.forEach(dir => {
        try {
            readdirSync(dir).forEach(file => {
                if (file !== 'creds.json') {
                    try {
                        unlinkSync(join(dir, file))
                    } catch (e) { }
                }
            })
        } catch (err) {}
    })
}

if (!opts['test']) {
    if (global.db) {
        setInterval(async () => {
            if (global.db.data) await global.db.write()
        }, 30000)
    }
}

setInterval(async () => {
    if (global.stopped === 'close' || !global.conn || !global.conn.user) return
    await clearTmp()
}, 1000 * 60 * 4)

setInterval(async () => {
    if (global.stopped === 'close' || !global.conn || !global.conn.user) return
    await purgeSession()
}, 1000 * 60 * 10)

setInterval(async () => {
    if (global.stopped === 'close' || !global.conn || !global.conn.user) return
    await purgeSessionSB()
}, 1000 * 60 * 10)

setInterval(async () => {
    if (global.stopped === 'close' || !global.conn || !global.conn.user) return
    await purgeOldFiles()
}, 1000 * 60 * 10)

_quickTest().then(() => global.conn.logger.info(chalk.bold(`✞ H E C H O\n`.trim()))).catch(console.error)

setInterval(async () => {
    if (global.stopped === 'close' || !global.conn || !global.conn?.user) return
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)
    const bio = `🜸 BALDWIND IV | Activo: ${uptime} | Creado por DevLyonn`
    await global.conn?.updateProfileStatus(bio).catch(_ => _)
}, 60000)

function clockString(ms) {
    const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map((v) => v.toString().padStart(2, 0)).join('')
}

async function isValidPhoneNumber(number) {
    try {
        number = number.replace(/\s+/g, '')
        if (number.startsWith('+521')) number = number.replace('+521', '+52')
        else if (number.startsWith('+52') && number[4] === '1') number = number.replace('+52 1', '+52')
        const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
        return phoneUtil.isValidNumber(parsedNumber)
    } catch {
        return false
    }
}