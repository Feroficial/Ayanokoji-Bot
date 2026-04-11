// ⚔️ Código creado por 🜸 𝘿𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - ACTUALIZAR REPOSITORIO

import { execSync } from 'child_process'

// ========== TU NÚMERO FIJO (CAMBIA SOLO ESTO SI ES NECESARIO) ==========
const MI_NUMERO = '59177474230'
const MI_NUMERO_JID = MI_NUMERO + '@s.whatsapp.net'

// Función para verificar si es el creador
const isCreator = (sender) => {
  const senderNumber = sender.split('@')[0]
  return senderNumber === MI_NUMERO
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Verificación de creador
  if (!isCreator(m.sender)) {
    return conn.reply(m.chat, `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ⚙️🔒 *MÓDULO BLOQUEADO*\n\n> 🛡️ *Acceso denegado*\n> 📌 Esta función es exclusiva para *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*\n\n👑 *BALDWIND IV*`, m)
  }

  try {
    await conn.reply(m.chat, '—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ⏳ *Actualizando el bot...*', m)

    const output = execSync('git pull' + (args.length ? ' ' + args.join(' ') : '')).toString()
    const isUpdated = output.includes('Already up to date')

    const updateMsg = isUpdated
      ? `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ✅ *BALDWIND IV ya está actualizado.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
      : `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ✅ *Actualización aplicada:*\n\n📦 \`${output.trim()}\`\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`

    await conn.reply(m.chat, updateMsg, m)

  } catch (error) {
    let conflictMsg = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *Error al actualizar.*\n\n`

    try {
      const status = execSync('git status --porcelain').toString().trim()
      if (status) {
        const conflictedFiles = status
          .split('\n')
          .map(line => line.slice(3))
          .filter(file =>
            !file.startsWith('.npm/') &&
            !file.startsWith('node_modules/') &&
            !file.startsWith('package-lock.json') &&
            !file.startsWith('database.json') &&
            !file.startsWith('tmp/')
          )

        if (conflictedFiles.length > 0) {
          conflictMsg += `⚠️ *Conflictos:*\n` +
            conflictedFiles.map(f => `• ${f}`).join('\n') +
            `\n\n🔧 *Solución:* Reinstala el bot o resuelve manualmente.\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
        } else {
          conflictMsg += `⚠️ *Error desconocido.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
        }
      } else {
        conflictMsg += `⚠️ *Error desconocido.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
      }
    } catch (statusError) {
      conflictMsg += `⚠️ *No se pudieron verificar los conflictos.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
    }

    await conn.reply(m.chat, conflictMsg, m)
  }
}

handler.help = ['fix', 'update', 'actualizar']
handler.tags = ['owner']
handler.command = ['fix', 'update', 'actualizar']

// Desactivamos rowner para que use nuestra verificación manual
handler.rowner = false

export default handler