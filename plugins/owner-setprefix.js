let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando')
  
  if (!text) {
    let prefixActual = global.prefix || "#"
    return m.reply(`*《 🎭  𝐒𝐄𝐓𝐏𝐑𝐄𝐅𝐈𝐗  🗡️ 》*\n\n➤ *Prefijo actual:* ${prefixActual}\n➤ *Uso:* ${usedPrefix + command} <nuevo prefijo>\n➤ *Ejemplo:* ${usedPrefix + command} #\n➤ *Ejemplo sin prefijo:* ${usedPrefix + command} ""\n\n*"Cambia el prefijo del bot desde WhatsApp"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let nuevoPrefijo = text === '""' ? "" : text
  
  global.prefix = nuevoPrefijo
  
  // Guardar en config.js permanentemente
  const fs = require('fs')
  const path = require('path')
  const configPath = path.join(process.cwd(), 'kiyotaka-ayanokoji', 'config.js')
  
  let configContent = fs.readFileSync(configPath, 'utf8')
  
  if (configContent.includes('global.prefix =')) {
    configContent = configContent.replace(/global\.prefix = .*;/g, `global.prefix = ${nuevoPrefijo === "" ? '""' : `"${nuevoPrefijo}"`};`)
  } else {
    configContent += `\nglobal.prefix = ${nuevoPrefijo === "" ? '""' : `"${nuevoPrefijo}"`};`
  }
  
  fs.writeFileSync(configPath, configContent)
  
  let mensaje = nuevoPrefijo === "" 
    ? `*《 🎭  𝐒𝐄𝐓𝐏𝐑𝐄𝐅𝐈𝐗  🗡️ 》*\n\n➤ ✅ *Prefijo eliminado*\n➤ 📌 *Ahora los comandos funcionan sin prefijo*\n➤ *Ejemplo:* escribe "menu" en lugar de "#menu"\n\n*"El aula de élite ahora responde a tu llamada directa"*`
    : `*《 🎭  𝐒𝐄𝐓𝐏𝐑𝐄𝐅𝐈𝐗  🗡️ 》*\n\n➤ ✅ *Prefijo cambiado a:* ${nuevoPrefijo}\n➤ *Ejemplo:* ${nuevoPrefijo}menu\n\n*"El aula de élite se adapta a tu estilo"*`
  
  m.reply(`${mensaje}\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
}

handler.help = ['setprefix <prefijo>']
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.rowner = true

export default handler