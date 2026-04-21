import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

let handler = async (m, { conn, text, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando')
  if (!text) return m.reply(`*《 🎭  𝐄𝐗𝐄𝐂  🗡️ 》*\n\n➤ *Uso:* #exec <comando>\n➤ *Ejemplo:* #exec ls -la\n\n*"Ejecuta comandos en la terminal del servidor"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await m.react('⚙️')

  try {
    let { stdout, stderr } = await execPromise(text)
    let output = stdout || stderr || 'Sin salida'
    
    if (output.length > 4000) {
      await conn.sendMessage(m.chat, {
        document: Buffer.from(output, 'utf-8'),
        mimetype: 'text/plain',
        fileName: 'output.txt',
        caption: `📄 *Salida del comando:* ${text}`
      }, { quoted: m })
    } else {
      m.reply(`*《 🎭  𝐄𝐗𝐄𝐂  🗡️ 》*\n\n➤ *Comando:* ${text}\n➤ *Salida:*\n\`\`\`${output}\`\`\`\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }
    await m.react('✅')
  } catch (e) {
    m.reply(`*《 🎭  𝐄𝐗𝐄𝐂  🗡️ 》*\n\n➤ ❌ Error: ${e.message}\n\n*"El comando ha fallado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    await m.react('❌')
  }
}

handler.help = ['exec <comando>']
handler.tags = ['owner']
handler.command = /^(exec|terminal|cmd)$/i
handler.rowner = true

export default handler