let handler = async (m, { conn, usedPrefix, command }) => {
  let uptime = process.uptime()
  let horas = Math.floor(uptime / 3600)
  let minutos = Math.floor((uptime % 3600) / 60)
  let segundos = Math.floor(uptime % 60)
  
  let totalUsers = Object.keys(global.db.data.users).length
  let totalGroups = Object.keys(global.db.data.chats).filter(v => v.endsWith('@g.us')).length
  let totalCommands = Object.keys(global.plugins).length
  
  let info = `
🌸 *— ✧ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 𝐃𝐄 𝐀𝐍𝐈𝐀 𝐁𝐎𝐓 ✧ —* 🌸

> 💗 *Nombre:* Ania Bot
> 🎀 *Versión:* 1.0.0
> 👑 *Creadora:* Danny Yulieth

> 📊 *Estadísticas:*
> • 👥 Usuarios: ${totalUsers}
> • 👑 Grupos: ${totalGroups}
> • ⚙️ Comandos: ${totalCommands}

> ⏳ *Tiempo activa:*
> • ${horas}h ${minutos}m ${segundos}s

🌸 *"Ania Bot siempre aquí para ti"* 🌸
`.trim()

  await conn.sendMessage(m.chat, { text: info }, { quoted: m })
  await m.react('🌸')
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'informacion', 'botinfo']

export default handler