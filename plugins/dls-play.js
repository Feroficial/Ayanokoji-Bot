import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ Uso: #ytmp3 <canción o link>\n➤ Ejemplo: #ytmp3 Bad Bunny\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

  let videoUrl = ''
  let videoId = ''
  let titulo = ''
  let creador = ''

  let urlRegex = /(youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/i
  let esLink = urlRegex.test(text)

  if (esLink) {
    let match = text.match(urlRegex)
    videoId = match[2]
    videoUrl = text
  } else {
    let searchUrl = `https://dv-yer-api.online/ytsearch?q=${encodeURIComponent(text)}&limit=1&apikey=dvyer233962325851`
    let searchRes = await fetch(searchUrl)
    let searchData = await searchRes.json()

    if (!searchData.ok || searchData.count === 0) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ No se encontraron resultados para "${text}"\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }

    let primerResultado = searchData.results[0]
    videoId = primerResultado.video_id
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    titulo = primerResultado.title
    creador = primerResultado.channel_name || 'Desconocido'
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  let apiUrl = `https://dv-yer-api.online/ytmp3?mode=link&url=${encodeURIComponent(videoUrl)}&apikey=dvyer233962325851`
  let res = await fetch(apiUrl)
  let data = await res.json()

  if (!data.ok) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    return m.reply(`*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n➤ Error al descargar el audio\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  let tituloFinal = data.title || titulo
  let creadorFinal = data.creator || creador

  let texto = `*《 🐉  𝐘𝐓 𝐌𝐏𝟑  🗡️ 》*\n\n🎵 *${tituloFinal}*\n👤 *Creador:* ${creadorFinal}\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } })

  await conn.sendMessage(m.chat, {
    audio: { url: data.download_url },
    mimetype: 'audio/mpeg',
    fileName: `${tituloFinal}.mp3`,
    contextInfo: {
      externalAdReply: {
        title: tituloFinal,
        body: creadorFinal,
        thumbnailUrl: thumbnail,
        sourceUrl: videoUrl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play|yta|audio)$/i
export default handler