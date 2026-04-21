import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando')

  let pluginsDir = path.join(process.cwd(), 'plugins')
  let files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))
  
  if (!text) {
    let total = files.length
    let texto = `*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n`
    texto += `📊 *Plugins disponibles:* ${total}\n\n`
    
    for (let file of files.sort()) {
      texto += `🔖 ${file.replace('.js', '')}\n`
    }
    
    texto += `\n📌 *Uso:* ${usedPrefix + command} <nombre>\n📌 *Ejemplo:* ${usedPrefix + command} menu\n\n*"Selecciona un plugin para ver su código"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
    
    return m.reply(texto)
  }

  let pluginName = text.endsWith('.js') ? text : text + '.js'
  let pluginPath = path.join(pluginsDir, pluginName)

  if (!fs.existsSync(pluginPath)) {
    return m.reply(`*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n➤ ❌ Plugin "${pluginName}" no encontrado.\n\n*"El archivo no existe en el sistema"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let code = fs.readFileSync(pluginPath, 'utf8')
  let lines = code.split('\n').length
  let size = code.length

  await conn.sendMessage(m.chat, {
    document: Buffer.from(code, 'utf8'),
    mimetype: 'application/javascript',
    fileName: pluginName,
    caption: `*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n📄 *Plugin:* ${pluginName}\n📊 *Líneas:* ${lines}\n📦 *Tamaño:* ${size} bytes\n\n*"Código fuente del aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
  }, { quoted: m })
}

handler.help = ['getplugin <nombre>']
handler.tags = ['owner']
handler.command = /^(getplugin|gp)$/i
handler.rowner = true

export default handler