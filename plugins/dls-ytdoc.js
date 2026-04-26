import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`
🌸 *— ✧ 𝐘𝐓 𝐃𝐎𝐂 ✧ —* 🌸

> 🎀 *Uso:* ${command} <nombre o enlace>
> 💗 *Ejemplo:* ${command} Bad Bunny

🌸 *"Ania Bot descarga lo que necesitas"* 🌸
`)

  await m.react("🎀")

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
        return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *El enlace no es válido*

🌸 *"Verifica el enlace antes de continuar"* 🌸
`)
      }

      const videoId = extractVideoId(url)
      if (!videoId) {
        return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *No se pudo obtener el ID del video*

🌸 *"El código ha sido corrompido"* 🌸
`)
      }

      const res = await yts({ videoId })

      if (!res) {
        return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *No se pudo obtener información del video*

🌸 *"La información se oculta a veces"* 🌸
`)
      }

      title = res.title || title
      authorName = res.author?.name || authorName
      durationTimestamp = res.timestamp || durationTimestamp
      views = res.views || views
      thumbnail = res.thumbnail || thumbnail
      url = res.url || url
    } else {
      const res = await yts(url)

      if (!res?.videos?.length) {
        return m.reply(`
🌸 *— ✧ 𝐍𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 ✧ —* 🌸

> 💗 *No encontré resultados para:* "${text}"

🌸 *"Hasta la mejor estratega falla a veces"* 🌸
`)
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

    // Foto de catbox
    const fallbackThumbRes = await fetch("https://files.catbox.moe/74aty6.jpg")
    const fallbackThumb = Buffer.from(await fallbackThumbRes.arrayBuffer())

    const caption = `
🌸 *— ✧ 𝐘𝐓 𝐃𝐎𝐂 ✧ —* 🌸

> 🎀 *Título:* ${title}
> 💗 *Creador:* ${authorName}
> ✨ *Vistas:* ${vistas}
> 🧸 *Duración:* ${durationTimestamp}

🌸 *"Contenido extraído con éxito"* 🌸
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
      { quoted: m }
    )

    if (command === "ytmp4doc") {
      await downloadAsDocument(conn, m, url, title, "video")
    } else if (command === "ytmp3doc") {
      await downloadAsDocument(conn, m, url, title, "audio")
    } else {
      return m.reply(`
🌸 *— ✧ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎 𝐕Á𝐋𝐈𝐃𝐎 ✧ —* 🌸

> 💗 *Usa:* ytmp3doc (audio) o ytmp4doc (video)

🌸 *"Elige tu opción sabiamente"* 🌸
`)
    }

    await m.react("✅")
  } catch (e) {
    console.error(e)
    await m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *Error:* ${e.message}

🌸 *"El sistema ha fallado"* 🌸
`)
    await m.react("❌")
  }
}

const downloadAsDocument = async (conn, m, url, title, type) => {
  try {
    const isVideo = type === "video"
    const emoji = isVideo ? "🎀" : "🎵"
    const tipoTexto = isVideo ? "video" : "audio"
    const extension = isVideo ? ".mp4" : ".mp3"
    const apiEndpoint = isVideo ? "ytvideo" : "ytaudio"

    const sent = await conn.sendMessage(
      m.chat,
      { text: `
🌸 *— ✧ ${isVideo ? "𝐄𝐗𝐓𝐑𝐀𝐘𝐄𝐍𝐃𝐎 𝐕𝐈𝐃𝐄𝐎" : "𝐄𝐗𝐓𝐑𝐀𝐘𝐄𝐍𝐃𝐎 𝐀𝐔𝐃𝐈𝐎"} ✧ —* 🌸

> 🎀 *Procesando...*
> 💗 *Un momento por favor*

🌸 *"Preparando tu ${tipoTexto}"* 🌸
` },
      { quoted: m }
    )

    const apiUrl = `https://api-gohan.onrender.com/download/${apiEndpoint}?url=${encodeURIComponent(url)}`
    const r = await fetch(apiUrl)

    if (!r.ok) {
      return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *Error HTTP ${r.status}*

🌸 *"El servidor no responde"* 🌸
`)
    }

    const data = await r.json()

    if (!data?.status || !data?.result?.download_url) {
      return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *No se pudo obtener el ${tipoTexto}*

🌸 *"El enlace puede estar caído"* 🌸
`)
    }

    const fileUrl = data.result.download_url
    const fileTitle = cleanName(data.result.title || title || tipoTexto)

    const fileRes = await fetch(fileUrl)
    const fileBuffer = Buffer.from(await fileRes.arrayBuffer())

    await conn.sendMessage(
      m.chat,
      {
        document: fileBuffer,
        mimetype: isVideo ? "video/mp4" : "audio/mpeg",
        fileName: `${fileTitle}${extension}`,
        caption: `
🌸 *— ✧ ${isVideo ? "𝐕𝐈𝐃𝐄𝐎" : "𝐀𝐔𝐃𝐈𝐎"} 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *Título:* ${fileTitle}
> 💗 *Tamaño:* ${formatBytes(fileBuffer.length)}

🌸 *"Para tu colección personal"* 🌸
`
      },
      { quoted: m }
    )

    try {
      await conn.sendMessage(
        m.chat,
        {
          text: `
🌸 *— ✧ 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *Descarga completada*
> 💗 *${tipoTexto.toUpperCase()} guardado como documento*

🌸 *"Ania Bot siempre contigo"* 🌸
`,
          edit: sent.key
        }
      )
    } catch {}
  } catch (e) {
    console.error(e)
    await m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *Error:* ${e.message}

🌸 *"Fallo en la descarga"* 🌸
`)
    await m.react("❌")
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

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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

handler.command = ["ytmp3doc", "ytmp4doc"]
handler.tags = ["downloader"]
handler.help = ['ytmp3doc', 'ytmp4doc']
handler.register = false

export default handler