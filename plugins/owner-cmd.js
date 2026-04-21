import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando')
  if (!text) return m.reply(`*《 🎭  𝐍𝐔𝐄𝐕𝐎 𝐂𝐎𝐌𝐀𝐍𝐃𝐎  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre>|<código>|<categoría>\n➤ *Ejemplo:* ${usedPrefix + command} hola|m.reply('Hola mundo')|main\n\n📌 *Categorías disponibles:* main, group, admin, owner, downloader, game, rpg, sticker, ai\n\n*"Crea nuevos comandos desde WhatsApp"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let parts = text.split('|')
  let name = parts[0]
  let code = parts[1]
  let categoria = parts[2] || 'rpg'

  if (!name || !code) return m.reply('❌ Formato incorrecto. Usa: nombre|código|categoría')

  let pluginName = name.endsWith('.js') ? name : name + '.js'
  
  let template = `let handler = async (m, { conn, isAdmin, isOwner, isROwner, args, text, usedPrefix, command }) => {
  ${code}
}

handler.help = ['${name.replace('.js', '')}']
handler.tags = ['${categoria}']
handler.command = /^${name.replace('.js', '')}$/i
handler.group = false
export default handler
`

  let pluginPath = path.join(process.cwd(), 'plugins', pluginName)
  fs.writeFileSync(pluginPath, template)
  
  m.reply(`*《 🎭  𝐍𝐔𝐄𝐕𝐎 𝐂𝐎𝐌𝐀𝐍𝐃𝐎  🗡️ 》*\n\n✅ *Comando creado:* ${pluginName}\n📌 *Comando:* #${name.replace('.js', '')}\n🏷️ *Categoría:* ${categoria}\n🔄 *Recarga el bot para usarlo*\n\n*"El aula de élite expande su poder"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
}

handler.help = ['nuevocomando <nombre>|<código>|<categoría>']
handler.tags = ['owner']
handler.command = /^(nuevocomando|nuevocmd|crearcomando)$/i
handler.rowner = true

export default handler