let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply(`*《 🐉  𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎  🗡️ 》*\n\n➤ Solo el creador puede usar este comando`)

  await conn.sendMessage(m.chat, { react: { text: '🔄', key: m.key } })
  await m.reply(`*《 ⚔️  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍  🛡️ 》*\n\n➤ Buscando actualizaciones en el repositorio...`)

  let { exec } = await import('child_process')
  
  exec('git fetch origin', async (fetchError, fetchStdout, fetchStderr) => {
    if (fetchError) {
      return m.reply(`*《 🔱  𝐄𝐑𝐑𝐎𝐑  🏯 》*\n\n➤ Error al conectar con el repositorio\n➤ ${fetchError.message}`)
    }

    exec('git log HEAD..origin/main --oneline', async (logError, logStdout, logStderr) => {
      if (logError) {
        return m.reply(`*《 🔱  𝐄𝐑𝐑𝐎𝐑  🏯 》*\n\n➤ Error al verificar cambios\n➤ ${logError.message}`)
      }

      if (!logStdout.trim()) {
        return m.reply(`*《 🐉  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍  🗡️ 》*\n\n➤ No hay cambios pendientes\n➤ Ya estás en la última versión\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      }

      let cambios = logStdout.trim().split('\n')
      let listaCambios = cambios.slice(0, 10).map(c => `   🔖 ${c}`).join('\n')
      
      await m.reply(`*《 ⚔️  𝐂𝐀𝐌𝐁𝐈𝐎𝐒 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎𝐒  🛡️ 》*\n\n${listaCambios}\n\n➤ Descargando cambios...`)

      exec('git pull origin main', async (pullError, pullStdout, pullStderr) => {
        if (pullError) {
          return m.reply(`*《 🔱  𝐄𝐑𝐑𝐎𝐑  🏯 》*\n\n➤ Error al actualizar\n➤ ${pullError.message}`)
        }

        let resultado = pullStdout || pullStderr
        
        if (resultado.includes('Already up to date')) {
          m.reply(`*《 🐉  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍  🗡️ 》*\n\n➤ No había cambios que aplicar\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
        } else {
          await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
          m.reply(`*《 ⚔️  𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍 𝐄𝐗𝐈𝐓𝐎𝐒𝐀  🛡️ 》*\n\n➤ Se han descargado los nuevos cambios\n➤ Los nuevos comandos ya están disponibles\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
        }
      })
    })
  })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar)$/i

export default handler