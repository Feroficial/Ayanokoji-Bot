import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`*《 🐉  𝐘𝐓 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ Uso: ${usedPrefix}ytsearch <canción>\n➤ Ejemplo: ${usedPrefix}ytsearch Bad Bunny\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

  let apiUrl = `https://dv-yer-api.online/ytsearch?q=${encodeURIComponent(text)}&limit=5&apikey=dvyer233962325851`
  let res = await fetch(apiUrl)
  let data = await res.json()

  if (!data.ok || data.count === 0) {
    return m.reply(`*《 🐉  𝐘𝐓 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ No se encontraron resultados para "${text}"\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  global.tempSearch = global.tempSearch || {}
  global.tempSearch[m.sender] = {
    results: data.results,
    timestamp: Date.now()
  }

  let texto = `*《 🐉  𝐘𝐓 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ *Resultados para:* ${text}\n\n`
  
  for (let i = 0; i < data.results.length; i++) {
    let video = data.results[i]
    texto += `${i + 1}. *${video.title}*\n   📹 ${video.duration || 'Desconocido'}\n\n`
  }
  
  texto += `➤ *Responde con el número* (1-${data.results.length}) para descargar el audio\n➤ *Ejemplo:* Envía el número 1\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  m.reply(texto)
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play|yts|buscar)$/i
export default handler