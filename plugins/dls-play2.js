import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`
🌸 *— ✧ 𝐏𝐋𝐀𝐘𝟐 (𝐕𝐈𝐃𝐄𝐎) ✧ —* 🌸

> 🎀 *Uso:* #play2 <nombre o link>
> 💗 *Ejemplo:* #play2 Bad Bunny video

🌸 *"Ania Bot trae el video que buscas"* 🌸
`)

  await m.react('🎀')

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

🌸 *"El sistema tiene un pequeño fallo"* 🌸
`)
      }

      const res = await yts({ videoId })

      if (!res) {
        return m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *Información no disponible*

🌸 *"Intenta de nuevo más tarde"* 🌸
`)
      }

      title = res.title || title
      authorName = res.author?.name || authorName
      durationTimestamp = res.timestamp || durationTimestamp
      views = res.views || views
      thumbnail = res.thumbnail || thumbnail
      url = res.url || url
    } else {
      await m.reply(`
🌸 *— ✧ 𝐁𝐔𝐒𝐂𝐀𝐍𝐃𝐎 ✧ —* 🌸

> 🎀 *${text}*
> 💗 *Rastreando en YouTube...*

🌸 *"Preparando el video"* 🌸
`)

      const res = await yts(url)

      if (!res?.videos?.length) {
        return m.reply(`
🌸 *— ✧ 𝐍𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 ✧ —* 🌸

> 💗 *No encontré:* "${text}"

🌸 *"Prueba con otro nombre"* 🌸
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

    // Fallback con tu foto de catbox
    const fallbackThumbRes = await fetch("https://files.catbox.moe/74aty6.jpg")
    const fallbackThumb = Buffer.from(await fallbackThumbRes.arrayBuffer())

    // Mensaje con estilo elegante (sin el fake contact de antes)
    const caption = `
🌸 *— ✧ 𝐎𝐁𝐉𝐄𝐓𝐈𝐕𝐎 𝐋𝐎𝐂𝐀𝐋𝐈𝐙𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *Título:* ${title}
> 💗 *Creador:* ${authorName}
> ✨ *Vistas:* ${vistas}
> 🧸 *Duración:* ${durationTimestamp}

🌸 *"El video está listo para descargar"* 🌸
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

    await downloadVideo(conn, m, url)
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.reply(`
🌸 *— ✧ 𝐄𝐑𝐑𝐎𝐑 ✧ —* 🌸

> 💗 *Error:* ${e.message}

🌸 *"Algo salió mal, intenta de nuevo"* 🌸
`)
    await m.react('❌')
  }
}

const downloadVideo = async (conn, m, url) => {
  try {
    const sent = await conn.sendMessage(
      m.chat,
      { text: `
🌸 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 ✧ —* 🌸

> 🎀 *Procesando video...*
> 💗 *Un momento por favor*

🌸 *"Preparando tu video"* 🌸
` },
      { quoted: m }
    )

    const apiUrl = `https://api-gohan.onrender.com/download/ytvideo?url=${encodeURIComponent(url)}`
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

> 💗 *No se pudo obtener el video*

🌸 *"El enlace puede estar caído"* 🌸
`)
    }

    const fileUrl = data.result.download_url
    const fileTitle = cleanName(data.result.title || "video")

    await conn.sendMessage(
      m.chat,
      {
        video: { url: fileUrl },
        mimetype: "video/mp4",
        fileName: `${fileTitle}.mp4`,
        caption: `
🌸 *— ✧ 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *${fileTitle}*
> 💗 *Disfruta tu video*

🌸 *Ania Bot siempre contigo* 🌸
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

> 🎀 *${fileTitle}*
> 💗 *Video enviado con éxito*

🌸 *"Misión cumplida"* 🌸
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
    await m.react('❌')
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

handler.command = ["play2", "ytmp4", "ytvideo"]
handler.tags = ["downloader"]
handler.help = ['play2']
export default handler