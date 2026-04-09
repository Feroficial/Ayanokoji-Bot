// ⚔️ Código creado por 🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸
// 🛡️ BALDWIND IV - ACTUALIZAR REPOSITORIO

import { execSync } from 'child_process'

// Configuración del owner
const ownerNumber = '59177474230@s.whatsapp.net'
const ownerNumber2 = '59177474230' // Sin @s.whatsapp.net

const handler = async (m, { conn, args }) => {
  try {
    await conn.reply(m.chat, '—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ⏳ *Actualizando el bot... Por favor espera.*', m)

    const output = execSync('git pull' + (args.length ? ' ' + args.join(' ') : '')).toString()
    const isUpdated = output.includes('Already up to date')

    const updateMsg = isUpdated
      ? `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ✅ *BALDWIND IV ya está actualizado.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
      : `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ✅ *Actualización aplicada correctamente:*\n\n📦 \`${output.trim()}\`\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`

    await conn.reply(m.chat, updateMsg, m)

  } catch (error) {
    let conflictMsg = '—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *Error al actualizar el bot.*\n\n'

    try {
      const status = execSync('git status --porcelain').toString().trim()

      if (status) {
        const conflictedFiles = status
          .split('\n')
          .map(line => line.slice(3))
          .filter(file =>
            !file.startsWith('.npm/') &&
            !file.startsWith('Sessions/Principal/') &&
            !file.startsWith('node_modules/') &&
            !file.startsWith('package-lock.json') &&
            !file.startsWith('database.json') &&
            !file.startsWith('.cache/') &&
            !file.startsWith('tmp/')
          )

        if (conflictedFiles.length > 0) {
          conflictMsg += `⚠️ *Conflictos detectados en los siguientes archivos:*\n\n` +
            conflictedFiles.map(f => `• ${f}`).join('\n') +
            `\n\n🔧 *Solución recomendada:* reinstala el bot o resuelve los conflictos manualmente.\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
        } else {
          conflictMsg += `⚠️ *Error desconocido al actualizar.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
        }
      } else {
        conflictMsg += `⚠️ *Error desconocido al actualizar.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
      }
    } catch (statusError) {
      console.error('Error al verificar conflictos:', statusError)
      conflictMsg += `⚠️ *No se pudieron verificar los conflictos.*\n\n👑 *🜸 𝘋𝙀𝙑𝙇𝙔𝙊𝙉𝙉 🜸*`
    }

    await conn.reply(m.chat, conflictMsg, m)
  }
}

const keywords = ['update', 'up', 'fix']

handler.help = ['fix']
handler.tags = ['owner']
handler.command = ['update', 'up', 'fix']

// ========== CONFIGURACIÓN DE OWNER ==========
handler.rowner = true
handler.owner = [ownerNumber, ownerNumber2]

// Handler para comandos directos
handler.all = async function (m) {
  if (!m.text || typeof m.text !== 'string') return

  // Verificar si el usuario es owner
  const sender = m.sender
  const isOwner = sender === ownerNumber || sender === ownerNumber2 || sender.split('@')[0] === '59177474230'

  if (!isOwner) return

  const input = m.text.trim().toLowerCase()

  for (const keyword of keywords) {
    if (input === keyword) {
      return handler(m, { conn: this, args: [] })
    }
  }
}

export default handler