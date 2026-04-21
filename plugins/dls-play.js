import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Uso:* #play <canción o link>\n➤ *Ejemplo:* #play Bad Bunny\n\n*"El aula de élite no espera a nadie"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

  let mensajeEspera = await m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Analizando el campo de batalla...*\n➤ *Buscando:* ${text}\n\n*"El conocimiento es poder, pero la estrategia lo es todo"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  let videoUrl = ''
  let videoId = ''
  let titulo = ''
  let creador = ''

  let urlRegex = /(youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/i
  let esLink = urlRegex.test(text)

  if (esLink) {
    let match = text.match(urlRegex)
    videoId = match[2]
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  } else {
    let searchUrl = `https://api.agatz.xyz/api/youtube?query=${encodeURIComponent(text)}`
    let searchRes = await fetch(searchUrl)
    let searchData = await searchRes.json()

    if (!searchData.data || searchData.data.length === 0) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *No se encontraron resultados para:* "${text}"\n➤ *Intenta con otro nombre*\n\n*"Hasta el mejor estratega falla a veces"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }

    let primerResultado = searchData.data[0]
    videoId = primerResultado.videoId
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    titulo = primerResultado.title
    creador = primerResultado.author || 'Desconocido'
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  await conn.sendMessage(m.chat, {
    text: `*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Localizando el objetivo...*\n➤ *música encontrado:* ${titulo || 'Procesando...'}\n➤ *Creador:* ${creador || 'Desconocido'}\n\n*"La preparación es la clave de la victoria"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`,
    edit: mensajeEspera.key
  })

  let apiUrl = `https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(videoUrl)}`
  let res = await fetch(apiUrl)
  let data = await res.json()

  if (!data.status || !data.data || !data.data.link) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Error al descargar el audio*\n➤ *El enemigo ha sido escurridizo*\n➤ *Intenta con otro audio*\n\n*"No todas las batallas se ganan, pero se aprende de ellas"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  let tituloFinal = data.data.title || titulo
  let duracion = data.data.duration || 'Desconocida'
  let tamaño = data.data.size || 'Desconocido'

  await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } })

  await conn.sendMessage(m.chat, {
    text: `*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Descargando audio...*\n➤ *Título:* ${tituloFinal}\n➤ *Duración:* ${duracion}\n➤ *Tamaño:* ${tamaño}\n\n*"La paciencia es el arma del sabio"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`,
    edit: mensajeEspera.key
  })

  await conn.sendMessage(m.chat, {
    audio: { url: data.data.link },
    mimetype: 'audio/mpeg',
    fileName: `${tituloFinal}.mp3`,
    contextInfo: {
      externalAdReply: {
        title: tituloFinal,
        body: creador,
        thumbnailUrl: thumbnail,
        sourceUrl: videoUrl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  await conn.sendMessage(m.chat, {
    text: `*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *¡Misión cumplida!*\n➤ *Audio enviado exitosamente*\n\n*"El aula de élite siempre está un paso adelante"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`,
    edit: mensajeEspera.key
  })
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play|yta|audio)$/i
export default handler