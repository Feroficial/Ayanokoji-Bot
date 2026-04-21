import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply(`*《 🎭  𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎  🗡️ 》*\n\n➤ Solo el creador puede usar este comando`)

  await m.react('🔄')

  if (!text) {
    return m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Opciones:*\n• ${usedPrefix + command} pull - Descargar cambios\n• ${usedPrefix + command} hard - Reset forzado\n• ${usedPrefix + command} status - Ver estado\n• ${usedPrefix + command} logs - Ver commits\n• ${usedPrefix + command} all - Todo en uno\n\n*"Elige una opción"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let opcion = text.toLowerCase()

  try {
    if (opcion === 'pull') {
      await m.reply(`⬇️ *Descargando cambios...*`)
      let { stdout, stderr } = await execPromise('git pull')
      let resultado = stdout || stderr || 'Sin cambios'
      await m.reply(`📋 *Resultado:*\n\`\`\`${resultado.slice(0, 1500)}\`\`\``)
    }
    else if (opcion === 'hard') {
      await m.reply(`⚠️ *Reset forzado...*`)
      await execPromise('git fetch origin')
      let { stdout, stderr } = await execPromise('git reset --hard origin/main')
      await m.reply(`✅ *Reset completado*\n\`\`\`${(stdout || stderr).slice(0, 500)}\`\`\``)
    }
    else if (opcion === 'status') {
      let { stdout } = await execPromise('git status')
      await m.reply(`📊 *Estado:*\n\`\`\`${stdout}\`\`\``)
    }
    else if (opcion === 'logs') {
      let { stdout } = await execPromise('git log --oneline -5')
      await m.reply(`📜 *Últimos commits:*\n\`\`\`${stdout}\`\`\``)
    }
    else if (opcion === 'all') {
      await m.reply(`🔄 *Actualizando...*`)
      await execPromise('git pull')
      await execPromise('npm install')
      await m.reply(`✅ *Actualización completada*`)
      await m.react('✅')
      setTimeout(() => process.exit(0), 2000)
    }
    else {
      await m.reply(`❌ *Opción no válida*\n➤ Usa: pull, hard, status, logs, all`)
    }
    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    await m.reply(`❌ *Error:* ${e.message}`)
  }
}

handler.help = ['update <opción>']
handler.tags = ['owner']
handler.command = /^(update|actualizar|up)$/i
handler.rowner = true

export default handler