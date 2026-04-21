import { exec } from 'child_process'
import util from 'util'
import fs from 'fs'
import path from 'path'

const execPromise = util.promisify(exec)

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply(`*《 🎭  𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎  🗡️ 》*\n\n➤ Solo el creador puede usar este comando\n\n*"El aula de élite tiene jerarquías"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await m.react('🔄')

  let menu = `
*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄 𝟐.𝟎  🗡️ 》*

➤ *Opciones disponibles:*

1️⃣ *Normal* - git pull normal
2️⃣ *Forzado* - git reset --hard
3️⃣ *Estado* - ver cambios pendientes
4️⃣ *Logs* - últimos commits
5️⃣ *Rama* - cambiar de rama
6️⃣ *Todo en uno* - pull + install + restart

📌 *Ejemplos:*
• ${usedPrefix + command} 1
• ${usedPrefix + command} normal
• ${usedPrefix + command} todo

*"La evolución es constante en el aula de élite"*
*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  if (!text) return m.reply(menu)

  let opcion = text.toLowerCase()

  try {
    if (opcion === '1' || opcion === 'normal') {
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Ejecutando git pull...*\n\n*"Obteniendo los últimos cambios"*`)
      let { stdout, stderr } = await execPromise('git pull')
      let resultado = stdout || stderr || 'Sin cambios'
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Resultado:*\n\`\`\`${resultado.slice(0, 1500)}\`\`\`\n\n*"Actualización completada"*`)
      if (resultado.includes('Updating') || resultado.includes('Already up to date')) {
        await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n✅ *Actualización exitosa*\n🔄 *Recomiendo reiniciar el bot*`)
      }
    }
    else if (opcion === '2' || opcion === 'forzado') {
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Ejecutando git reset --hard...*\n\n*"Forzando la actualización"*`)
      await execPromise('git fetch origin')
      let { stdout, stderr } = await execPromise('git reset --hard origin/main')
      let resultado = stdout || stderr || 'Actualización forzada completada'
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Resultado:*\n\`\`\`${resultado.slice(0, 1500)}\`\`\`\n\n*"Actualización forzada completada"*`)
    }
    else if (opcion === '3' || opcion === 'estado') {
      let { stdout } = await execPromise('git status')
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Estado del repositorio:*\n\`\`\`${stdout}\`\`\``)
    }
    else if (opcion === '4' || opcion === 'logs') {
      let { stdout } = await execPromise('git log --oneline -10')
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Últimos 10 commits:*\n\`\`\`${stdout}\`\`\``)
    }
    else if (opcion === '5' || opcion === 'rama') {
      let { stdout } = await execPromise('git branch')
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Ramas disponibles:*\n\`\`\`${stdout}\`\`\``)
    }
    else if (opcion === '6' || opcion === 'todo') {
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Actualización completa en progreso...*\n\n📌 Paso 1: Git pull\n📌 Paso 2: Instalar dependencias\n📌 Paso 3: Reiniciar bot\n\n*"Preparando el aula de élite"*`)
      
      await m.reply(`⬇️ *Descargando cambios...*`)
      await execPromise('git pull')
      
      await m.reply(`📦 *Instalando dependencias...*`)
      await execPromise('npm install')
      
      await m.reply(`✅ *Actualización completada*\n🔄 *Reiniciando el bot...*`)
      await m.react('✅')
      setTimeout(() => {
        process.exit(0)
      }, 2000)
    }
    else {
      await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Opción no válida*\n➤ Usa: ${usedPrefix + command} 1-6\n\n*"Elige sabiamente"*`)
    }
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply(`*《 🎭  𝐔𝐏𝐃𝐀𝐓𝐄  🗡️ 》*\n\n➤ *Error:* ${e.message}\n\n*"El sistema ha fallado"*`)
  }
}

handler.help = ['update <opción>']
handler.tags = ['owner']
handler.command = /^(update|actualizar)$/i
handler.rowner = true

export default handler