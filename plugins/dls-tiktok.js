let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`
ㅤ    ꒰  ㅤ 🎵 ㅤ *αℓуα - тιктσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ 1 (вúsqυє∂α):* ${usedPrefix + command} <тєхтσ>
> ₊· ⫏⫏ ㅤ *📌 Ejemplo:* ${usedPrefix + command} Goku Black

> ₊· ⫏⫏ ㅤ *Uѕσ 2 (ℓιηк ∂ιяєcтσ):* ${usedPrefix + command} <υяℓ>
> ₊· ⫏⫏ ㅤ *📌 Ejemplo:* ${usedPrefix + command} https://www.tiktok.com/@usuario/video/123456789

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  await m.react('🎵')
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  try {
    let videoUrl = null
    let titulo = ''
    let autor = ''
    let likes = 0
    let comentarios = 0
    let vistas = 0

    if (text.includes('tiktok.com')) {
      const downloadApiUrl = `https://dvlyonn.onrender.com/download/tiktok?url=${encodeURIComponent(text)}`
      const res = await fetch(downloadApiUrl)
      const data = await res.json()

      if (!data.status || !data.result?.video) throw new Error('No se pudo obtener el video')

      videoUrl = data.result.video
      titulo = data.result.title || 'Sin título'
      autor = data.result.author?.nickname || data.result.author?.name || 'Usuario'
      likes = data.result.likes || 0
      comentarios = data.result.comments || 0
      vistas = data.result.views || 0

    } else {
      const searchApiUrl = `https://dvlyonn.onrender.com/search/tiktok?query=${encodeURIComponent(text)}`
      const res = await fetch(searchApiUrl)
      const data = await res.json()

      if (!data.status || !data.result?.length) throw new Error('No se encontraron resultados')

      const primerVideo = data.result[0]
      const downloadApiUrl = `https://dvlyonn.onrender.com/download/tiktok?url=${encodeURIComponent(primerVideo.url)}`
      const resDescarga = await fetch(downloadApiUrl)
      const dataDescarga = await resDescarga.json()

      if (!dataDescarga.status || !dataDescarga.result?.video) throw new Error('No se pudo obtener el video')

      videoUrl = dataDescarga.result.video
      titulo = primerVideo.title || dataDescarga.result.title || 'Sin título'
      autor = primerVideo.author?.nickname || primerVideo.author?.name || dataDescarga.result.author?.nickname || 'Usuario'
      likes = primerVideo.stats?.likes || dataDescarga.result.likes || 0
      comentarios = primerVideo.stats?.comments || dataDescarga.result.comments || 0
      vistas = primerVideo.stats?.plays || dataDescarga.result.views || 0
    }

    const caption = `
ㅤ    ꒰  ㅤ 🎵 ㅤ *αℓуα - тιктσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єη αíяє 木 🎶 ㅤ 性

> ₊· ⫏⫏ ㅤ *τíτυℓσ:* ${titulo.substring(0, 60)}${titulo.length > 60 ? '...' : ''}
> ₊· ⫏⫏ ㅤ *¢яєα∂σя:* @${autor}
> ₊· ⫏⫏ ㅤ *❤️ ℓιкєѕ:* ${likes.toLocaleString()}
> ₊· ⫏⫏ ㅤ *💬 ¢σмєηтαяισѕ:* ${comentarios.toLocaleString()}
> ₊· ⫏⫏ ㅤ *👁️ νιѕтαѕ:* ${vistas.toLocaleString()}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *αρι:* https://dvlyonn.onrender.com
    `.trim()

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
      mimetype: 'video/mp4'
    }, { quoted: m })

    await m.react('✅')

  } catch (error) {
    console.error(error)
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 тιктσк ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}
> ₊· ⫏⫏ ㅤ *Pσѕιвℓє ѕσℓυ¢ιóη:* Vєяιƒι¢α єℓ єηℓα¢є σ тяα∂α υη тéямιησ ∂є вúsqυє∂α

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *αρι:* https://dvlyonn.onrender.com
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = ['tiktok', 'tt', 'tk']

export default handler