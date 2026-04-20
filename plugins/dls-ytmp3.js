import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let numero = parseInt(m.text)
  
  if (isNaN(numero)) return
  
  let tempData = global.tempSearch?.[m.sender]
  if (!tempData) return
  
  if (Date.now() - tempData.timestamp > 300000) {
    delete global.tempSearch[m.sender]
    return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ La búsqueda ha expirado\n➤ Usa #ytsearch nuevamente\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  if (numero < 1 || numero > tempData.results.length) {
    return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ Número inválido. Elige entre 1 y ${tempData.results.length}\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  let selected = tempData.results[numero - 1]
  let videoUrl = `https://www.youtube.com/watch?v=${selected.video_id}`
  let apiUrl = `https://dv-yer-api.online/ytmp3?mode=link&url=${encodeURIComponent(videoUrl)}&apikey=dvyer233962325851`

  let res = await fetch(apiUrl)
  let data = await res.json()

  if (!data.ok) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ Error al descargar el audio\n➤ Intenta con otro video\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } })

  let texto = `*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n🎵 *Título:* ${data.title}\n📥 *Descargando audio...*`

  await conn.sendMessage(m.chat, {
    audio: { url: data.download_url },
    mimetype: 'audio/mpeg',
    fileName: `${data.title}.mp3`,
    caption: `*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n🎵 *${data.title}*\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
  })

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  
  delete global.tempSearch[m.sender]
}

handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = /^(\d+)$/i
export default handler