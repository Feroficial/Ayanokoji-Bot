import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

let handler = async (m, { conn, isROwner }) => {
  if (!isROwner) return m.reply(`🌸 *— ✧ 𝐀𝐂𝐂𝐄𝐒𝐎 𝐑𝐄𝐒𝐓𝐑𝐈𝐍𝐆𝐈𝐃𝐎 ✧ —* 🌸\n\n> 💗 Solo la creadora puede usar este comando\n\n🌸 *Danny Yulieth* 🌸`)

  await m.react('🔄')

  try {
    const { stdout: commitActual } = await execPromise('git rev-parse --short HEAD')
    
    await m.reply(`🌸 *— ✧ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐍𝐃𝐎 ✧ —* 🌸\n\n> 🎀 *Commit actual:* ${commitActual.trim()}\n> 💗 Descargando cambios...\n\n🌸 *"Ania Bot se está actualizando"* 🌸`)

    const { stdout, stderr } = await execPromise('git pull')
    
    if (stderr && !stderr.includes('Ya está actualizado') && !stderr.includes('Already up to date')) throw new Error(stderr)
    
    if (stdout.includes('Ya está actualizado') || stdout.includes('Already up to date')) {
      await m.reply(`🌸 *— ✧ 𝐘𝐀 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐀 ✧ —* 🌸\n\n> 💗 El bot ya está en la última versión\n> 🎀 No hay cambios pendientes\n\n🌸 *Ania Bot siempre al día* 🌸`)
      await m.react('✅')
      return
    }
    
    const { stdout: nuevoCommit } = await execPromise('git rev-parse --short HEAD')
    
    await m.reply(`🌸 *— ✧ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈Ó𝐍 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🌸\n\n> 🎀 *Commit anterior:* ${commitActual.trim()}\n> 💗 *Nuevo commit:* ${nuevoCommit.trim()}\n> ✨ Cambios descargados correctamente\n\n🌸 *"Reinicia el bot para aplicar los cambios"* 🌸`)
    await m.react('✅')
    
  } catch (error) {
    await m.reply(`🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸\n\n> 💗 Error: ${error.message}\n\n🌸 *"Verifica la conexión a internet"* 🌸`)
    await m.react('❌')
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar']
handler.rowner = true

export default handler