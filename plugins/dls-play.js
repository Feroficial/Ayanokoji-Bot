import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`
🌸 *— ✧ 𝐏𝐋𝐀𝐘 ✧ —* 🌸

> 🎀 *Uso:* ${usedPrefix + command} <canción>
> 💗 *Ejemplo:* ${usedPrefix + command} Bad Bunny

🌸 *"Ania Bot reproduce tu música favorita"* 🌸
`)

  await m.react('🌸')

  try {
    let url = text.trim()
    let title = "Desconocido"
    let authorName = "Desconocido"
    let durationTimestamp = "Desconocida"
    let views = 0
    let thumbnail = ""

    const isUrl = /^https?:\/\/\S+/i.test(url)

    if (isUrl) {
      if (!isYouTubeUrl(url)) return m.reply(`> 💗 *Enlace inválido*`)
      const videoId = extractVideoId(url)
      if (!videoId) return m.reply(`> 💗 *No se pudo extraer el ID*`)
      const res = await yts({ videoId })
      if (!res) return m.reply(`> 💗 *Información no disponible*`)
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
> 💗 *Buscando en YouTube...*

🌸 *"Preparando tu música"* 🌸
`)
      const res = await yts(url)
      if (!res?.videos?.length) return m.reply(`> 💗 *No se encontraron resultados*`)
      const video = res.videos[0]
      title = video.title || title
      authorName = video.author?.name || authorName
      durationTimestamp = video.timestamp || durationTimestamp
      views = video.views || views
      url = video.url || url
      thumbnail = video.thumbnail || thumbnail
    }

    const vistas = formatViews(views)
    const fallbackThumb = await getFallbackThumb()

    const caption = `
🌸 *— ✧ 𝐎𝐁𝐉𝐄𝐓𝐈𝐕𝐎 𝐋𝐎𝐂𝐀𝐋𝐈𝐙𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *Título:* ${title}
> 💗 *Creador:* ${authorName}
> ✨ *Vistas:* ${vistas}
> 🧸 *Duración:* ${durationTimestamp}

🌸 *"Reproduciendo..."* 🌸
`

    let thumb = fallbackThumb
    if (thumbnail) {
      try {
        thumb = (await conn.getFile(thumbnail)).data
      } catch { thumb = fallbackThumb }
    }

    await conn.sendMessage(m.chat, { image: thumb, caption }, { quoted: m })
    await downloadMedia(conn, m, url)

    await m.react('✅')
    await m.reply(`
🌸 *— ✧ 𝐀𝐔𝐃𝐈𝐎 𝐄𝐍𝐕𝐈𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *${title}*
> 💗 *¡Disfruta la música!*

🌸 *Ania Bot siempre contigo* 🌸
`)

  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply(`> 💗 *Error:* ${e.message}`)
  }
}

const downloadMedia = async (conn, m, url) => {
  try {
    await m.reply(`
🌸 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 ✧ —* 🌸

> 🎀 *Procesando audio...*
> 💗 *Un momento por favor*

🌸 *"Preparando tu canción"* 🌸
`)

    const apiUrl = `https://api-gohan.onrender.com/download/ytaudio?url=${encodeURIComponent(url)}`
    const r = await fetch(apiUrl)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)

    const data = await r.json()
    if (!data?.status || !data?.result?.download_url) throw new Error('Sin enlace de descarga')

    const fileUrl = data.result.download_url
    const fileTitle = cleanName(data.result.title || "audio")

    await conn.sendMessage(m.chat, {
      audio: { url: fileUrl },
      mimetype: "audio/mpeg",
      fileName: `${fileTitle}.mp3`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.reply(`> 💗 *Error al descargar:* ${e.message}`)
  }
}

const getFallbackThumb = async () => {
  try {
    const res = await fetch("https://files.catbox.moe/74aty6.jpg")
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}

const cleanName = (name) => String(name).replace(/[^\w\s._-]/gi, "").substring(0, 50)

const formatViews = (views) => {
  const n = Number(views)
  if (!n || isNaN(n)) return "N/A"
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}

const isYouTubeUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url)

const extractVideoId = (url) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&/]|\b)/) || url.match(/youtu\.be\/([0-9A-Za-z_-]{11})/)
  return match?.[1] || null
}

handler.help = ["play"]
handler.tags = ["downloader"]
handler.command = ["play", "yt", "yta", "audio"
handler.register = false
export default handler