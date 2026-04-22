import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 100 }
  if (user.saes === undefined) user.saes = 100

  if (!text) return m.reply(`
> *•───⧼⧼⧼ 𝙿𝙻𝙰𝚈 ⧽⧽⧽───•*

> *• Uso:* ${usedPrefix + command} <canción>
> *• Ejemplo:* ${usedPrefix + command} Bad Bunny
> *• Costo:* 5 🪙 (Saes)

> *"El aula de élite no espera a nadie"*
> *•───────────────•*
`)

  const costo = 5
  if (user.saes < costo) {
    return m.reply(`
> *•───⧼⧼⧼ 𝚂𝙸𝙽 𝚂𝙰𝙴𝚂 ⧽⧽⧽───•*

> ❌ *No tienes suficientes Saes*

> *• Necesitas:* ${costo} 🪙
> *• Tienes:* ${user.saes} 🪙

> *Gana Saes con:*
> *• #daily* - Recompensa diaria
> *• #minar* - Minar Saes
> *• #work* - Trabajar
> *•───────────────•*
`)
  }

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
      if (!isYouTubeUrl(url)) return m.reply(`> ❌ *Enlace inválido*`)
      const videoId = extractVideoId(url)
      if (!videoId) return m.reply(`> ❌ *No se pudo extraer el ID*`)
      const res = await yts({ videoId })
      if (!res) return m.reply(`> ❌ *Información no disponible*`)
      title = res.title || title
      authorName = res.author?.name || authorName
      durationTimestamp = res.timestamp || durationTimestamp
      views = res.views || views
      thumbnail = res.thumbnail || thumbnail
      url = res.url || url
    } else {
      await m.reply(`
> *•───⧼⧼⧼ 𝙱𝚄𝚂𝙲𝙰𝙽𝙳𝙾 ⧽⧽⧽───•*

> *• ${text}*
> *•───────────────•*
`)
      const res = await yts(url)
      if (!res?.videos?.length) return m.reply(`> ❌ *No se encontraron resultados*`)
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
> *•───⧼⧼⧼ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾 𝙻𝙾𝙲𝙰𝙻𝙸𝚉𝙰𝙳𝙾 ⧽⧽⧽───•*

> *• Título:* ${title}
> *• Creador:* ${authorName}
> *• Vistas:* ${vistas}
> *• Duración:* ${durationTimestamp}
> *•───────────────•*
`

    let thumb = fallbackThumb
    if (thumbnail) {
      try {
        thumb = (await conn.getFile(thumbnail)).data
      } catch { thumb = fallbackThumb }
    }

    await conn.sendMessage(m.chat, { image: thumb, caption }, { quoted: m })
    await downloadMedia(conn, m, url)
    
    user.saes -= costo
    await m.react('✅')
    await m.reply(`
> *•───⧼⧼⧼ 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰 ⧽⧽⧽───•*

> ✅ *Audio enviado*

> *• -${costo} 🪙*
> *• Saes restantes:* ${user.saes} 🪙

> *"El aula de élite cobra por sus servicios"*
> *•───────────────•*
`)
    
  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply(`> ❌ *Error:* ${e.message}`)
  }
}

const downloadMedia = async (conn, m, url) => {
  try {
    await m.reply(`
> *•───⧼⧼⧼ 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝙽𝙳𝙾 ⧽⧽⧽───•*

> *• Procesando audio...*
> *•───────────────•*
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

    await m.reply(`
> *•───⧼⧼⧼ 𝙰𝚄𝙳𝙸𝙾 𝙴𝙽𝚅𝙸𝙰𝙳𝙾 ⧽⧽⧽───•*

> 🎵 *${fileTitle}*
> *•───────────────•*
`)
    
  } catch (e) {
    console.error(e)
    await m.reply(`> ❌ *Error al descargar:* ${e.message}`)
  }
}

const getFallbackThumb = async () => {
  try {
    const res = await fetch("https://i.ibb.co/83pbxQN/5eecaebbc7c3.jpg")
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
handler.command = ["play", "yt", "yta", "audio"]
export default handler