let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando')
  if (!text) return m.reply(`*《 🎭  𝐍𝐔𝐄𝐕𝐎 𝐂𝐎𝐌𝐀𝐍𝐃𝐎  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre>|<código>\n➤ *Ejemplo:* ${usedPrefix + command} hola|m.reply('Hola mundo')\n\n*"Crea nuevos comandos desde WhatsApp"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let [name, code] = text.split('|')
  if (!name || !code) return m.reply('❌ Formato incorrecto. Usa: nombre|código')

  let pluginName = name.endsWith('.js') ? name : name + '.js'
  
  let template = `let handler = async (m, { conn }) => {
  ${code}
}

handler.help = ['${name}']
handler.tags = ['custom']
handler.command = /^${name}$/i

export default handler
`

  const fs = require('fs')
  const path = require('path')
  let pluginPath = path.join(process.cwd(), 'plugins', pluginName)

  fs.writeFileSync(pluginPath, template)
  
  m.reply(`*《 🎭  𝐍𝐔𝐄𝐕𝐎 𝐂𝐎𝐌𝐀𝐍𝐃𝐎  🗡️ 》*\n\n✅ *Comando creado:* ${pluginName}\n📌 *Comando:* #${name}\n🔄 *Recarga el bot para usarlo*\n\n*"El aula de élite expande su poder"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
}

handler.help = ['nuevocomando <nombre>|<código>']
handler.tags = ['owner']
handler.command = /^(nuevocomando|nuevocmd|crearcomando)$/i
handler.rowner = true

export default handler