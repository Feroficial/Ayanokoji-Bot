import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Uso:* #play <canción o link>\n➤ *Ejemplo:* #play Bad Bunny\n\n*"El aula de élite no espera a nadie"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  await m.react('🔍')

  try {
    let url = text.trim()
    let title = "Desconocido"
    let authorName = "Desconocido"
    let durationTimestamp = "Desconocida"
    let views = 0
    let thumbnail = ""

    const isUrl = /^https?:\/\/\S+/i.test(url)

    if (isUrl) {
      if (!isYouTubeUrl(url)) {
        return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *El enlace no es válido de YouTube*\n\n*"El enemigo ha usado un señuelo"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      }

      const videoId = extractVideoId(url)
      if (!videoId) {
        return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *No pude extraer el ID del video*\n\n*"El código ha sido manipulado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      }

      const res = await yts({ videoId })

      if (!res) {
        return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *No pude obtener información del video*\n\n*"La información es poder, pero a veces se oculta"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      }

      title = res.title || title
      authorName = res.author?.name || authorName
      durationTimestamp = res.timestamp || durationTimestamp
      views = res.views || views
      thumbnail = res.thumbnail || thumbnail
      url = res.url || url
    } else {
      await m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Analizando el campo de batalla...*\n➤ *Buscando:* ${text}\n\n*"El conocimiento es poder, pero la estrategia lo es todo"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

      const res = await yts(url)

      if (!res?.videos?.length) {
        return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *No encontré resultados para:* "${text}"\n\n*"Hasta el mejor estratega falla a veces"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
      }

      const video = res.videos[0]
      title = video.title || title
      authorName = video.author?.name || authorName
      durationTimestamp = video.timestamp || durationTimestamp
      views = video.views || views
      url = video.url || url
      thumbnail = video.thumbnail || thumbnail
    }

    const vistas = formatViews(views)

    const fallbackThumbRes = await fetch("https://i.ibb.co/83pbxQN/5eecaebbc7c3.jpg")
    const fallbackThumb = Buffer.from(await fallbackThumbRes.arrayBuffer())

    const fkontak = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        locationMessage: {
          name: `『 ${title} 』`,
          jpegThumbnail: fallbackThumb
        }
      }
    }

    const caption = `
*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*

➤ *Localizando el objetivo...*

🎼 *Título:* ${title}
📺 *Creador:* ${authorName}
👁️ *Vistas:* ${vistas}
⏳ *Duración:* ${durationTimestamp}

*"La preparación es la clave de la victoria"*
*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*
`

    let thumb = fallbackThumb

    if (thumbnail) {
      try {
        thumb = (await conn.getFile(thumbnail)).data
      } catch {
        thumb = fallbackThumb
      }
    }

    await conn.sendMessage(
      m.chat,
      {
        image: thumb,
        caption
      },
      { quoted: fkontak }
    )

    await downloadMedia(conn, m, url, fkontak)
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Error:* ${e.message}\n\n*"El sistema ha sido comprometido"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    await m.react('❌')
  }
}

const downloadMedia = async (conn, m, url, quotedMsg) => {
  try {
    const sent = await conn.sendMessage(
      m.chat,
      { text: `*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Descargando audio...*\n\n*"La paciencia es el arma del sabio"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*` },
      { quoted: m }
    )

    const apiUrl = `https://api-gohan.onrender.com/download/ytaudio?url=${encodeURIComponent(url)}`
    const r = await fetch(apiUrl)

    if (!r.ok) {
      return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Error HTTP ${r.status} al obtener el audio*\n\n*"El enemigo ha bloqueado el ataque"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }

    const data = await r.json()

    if (!data?.status || !data?.result?.download_url) {
      return m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *No se pudo obtener el audio*\n\n*"El código ha sido corrompido"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }

    const fileUrl = data.result.download_url
    const fileTitle = cleanName(data.result.title || "audio")

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: fileUrl },
        mimetype: "audio/mpeg",
        fileName: `${fileTitle}.mp3`,
        ptt: false
      },
      { quoted: quotedMsg }
    )

    try {
      await conn.sendMessage(
        m.chat,
        {
          text: `*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *¡Misión cumplida!*\n➤ *Audio enviado exitosamente*\n\n🎼 *Título:* ${fileTitle}\n\n*"El aula de élite siempre está un paso adelante"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`,
          edit: sent.key
        }
      )
    } catch {
      await m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *¡Misión cumplida!*\n➤ *Audio enviado exitosamente*\n\n🎼 *Título:* ${fileTitle}\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    }
  } catch (e) {
    console.error(e)
    await m.reply(`*《 🐉  𝐊𝐈𝐘𝐎𝐓𝐀𝐊𝐀 𝐀𝐘𝐀𝐍𝐎𝐊𝐎𝐉𝐈  🗡️ 》*\n\n➤ *Error:* ${e.message}\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
    await m.react('💀')
  }
}

const cleanName = (name) =>
  String(name).replace(/[^\w\s._-]/gi, "").substring(0, 50)

const formatViews = (views) => {
  const n = Number(views)
  if (!n || Number.isNaN(n)) return "No disponible"
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}

const isYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url)
}

const extractVideoId = (url) => {
  const match =
    url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&/]|\b)/) ||
    url.match(/youtu\.be\/([0-9A-Za-z_-]{11})/)
  return match?.[1] || null
}

handler.command = ["play", "yt", "ytsearch", "yta", "audio"]
handler.tags = ["downloader"]

export default handler