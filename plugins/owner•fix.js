// ⚔️ Código creado por DEVLYONN 👑
// 🛡️ BALDWIND IV - ACTUALIZAR REPOSITORIO

import { execSync } from 'child_process'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let rwait = '⏳'
  let done = '✅'
  let error = '❌'

  try {
    await m.react(rwait)
    
    if (conn.user.jid == conn.user.jid) {
      let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
      
      let caption = `—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n`
      caption += `> 🔄 *ACTUALIZACIÓN COMPLETADA*\n\n`
      caption += `✦ 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 ✦\n`
      caption += `> 📦 \`${stdout.toString().trim()}\`\n\n`
      caption += `👑 *DEVLYONN*\n`
      caption += `⌬ ʙᴀʟᴅᴡɪɴᴅ ɪᴠ ᴄʏʙᴇʀ ᴍᴇɴᴜ 🧬`
      
      await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
      await m.react(done)
    }
  } catch (e) {
    await m.react(error)
    await m.reply(`—͟͟͞͞   *🜸 ʙᴀʟᴅᴡɪɴᴅ ɪᴠ  🛸  ᴄʏʙᴇʀ ᴄᴏʀᴇ  🜸* »\n> ❌ *ERROR EN ACTUALIZACIÓN*\n\n> ⚠️ Se han hecho cambios locales que entran en conflicto con las actualizaciones del repositorio.\n\n> 📌 Para actualizar, reinstala el bot o realiza las actualizaciones manualmente.\n\n👑 *DEVLYONN*`)
  }
}

handler.help = ['fix', 'update', 'actualizar']
handler.tags = ['owner']
handler.command = ['fix', 'update', 'actualizar']
handler.rowner = true

export default handler