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

  const newsletter = {
    jid: "120363407253203904@newsletter",
    nombre: "αℓуα - ¢нαηηєℓ"
  }

  try {
    let videoUrl = null
    let titulo = ''
    let autor = ''
    let likes = 0
    let comentarios = 0
    let vistas = 0

    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    await m.reply(`
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - тιктσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вυѕ¢αη∂σ 木 🎬 ㅤ 性

> ₊· ⫏⫏ ㅤ *вυѕ¢αη∂σ:* ${text}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

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
      
      await m.reply(`
ㅤ    ꒰  ㅤ 📥 ㅤ *αℓуα - тιктσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ∂єѕ¢αяgαη∂σ 木 💿 ㅤ 性

> ₊· ⫏⫏ ㅤ *∂єѕ¢αяgαη∂σ:* ${primerVideo.title?.substring(0, 40) || text}...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
      `.trim())

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

    const contextInfo = {
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: newsletter.jid,
        newsletterName: newsletter.nombre,
        serverMessageId: 1
      }
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
      mimetype: 'video/mp4',
      contextInfo: contextInfo
    }, { quoted: m })

    await m.react('✅')
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - тιктσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єηvíα∂σ 木 🎬 ㅤ 性

> ₊· ⫏⫏ ㅤ Vídєσ єηvíα∂σ cσrrєctαмєηтє

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

  } catch (error) {
    console.error(error)
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 тιктσк ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

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