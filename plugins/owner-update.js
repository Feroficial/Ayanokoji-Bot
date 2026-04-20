let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply(`*《 🐉  𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎  🗡️ 》*\n\n➤ Solo el creador puede usar este comando`)

  await m.reply(`*《 ⚔️  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍  🛡️ 》*\n\n➤ Buscando actualizaciones en el repositorio...`)

  let { exec } = await import('child_process')
  
  exec('git pull', async (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      return m.reply(`*《 🔱  𝐄𝐑𝐑𝐎𝐑  🏯 》*\n\n➤ ${error.message}`)
    }
    
    if (stdout.includes('Already up to date')) {
      m.reply(`*《 🐉  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍  🗡️ 》*\n\n➤ Ya estás en la última versión\n➤ No hay cambios pendientes\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    } else if (stdout.includes('Updating')) {
      m.reply(`*《 ⚔️  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍 𝐄𝐗𝐈𝐓𝐎𝐒𝐀  🛡️ 》*\n\n➤ Se han descargado los nuevos cambios\n➤ Reiniciando el bot para aplicar cambios...\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      
      setTimeout(() => {
        process.exit(0)
      }, 3000)
    } else {
      m.reply(`*《 🔱  𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎  🏯 》*\n\n➤ ${stdout}\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }
  })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar)$/i

export default handler
