let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* ${usedPrefix}ғα¢євσσк <υяℓ>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* ${usedPrefix}ғα¢євσσк https://www.facebook.com/.../video...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (!text.includes('facebook.com') && !text.includes('fb.com')) {
    return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υяℓ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Eѕσ ησ єѕ υη єηℓα¢є ∂є Facebook

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }

  await m.react('📱')
  await m.reply(`
ㅤ    ꒰  ㅤ ⏳ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ρяσ¢єѕαη∂σ 木 📥 ㅤ 性

> ₊· ⫏⫏ ㅤ Dєѕ¢αяgαη∂σ νí∂єσ...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  try {
    const apiUrl = `https://dvlyonn.onrender.com/download/facebook?url=${encodeURIComponent(text)}`
    const res = await fetch(apiUrl)
    const data = await res.json()

    if (!data.status || !data.result) throw new Error('No se pudo obtener el video')

    const video = data.result
    const videoUrl = video.hd || video.sd
    const calidad = video.hd ? 'HD' : 'SD'

    const caption = `
ㅤ    ꒰  ㅤ 📱 ㅤ *αℓуα - ғα¢євσσк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σмρℓєтα∂σ 木 🎬 ㅤ 性

> ₊· ⫏⫏ ㅤ *τíτυℓσ:* ${video.title || 'Sin título'}
> ₊· ⫏⫏ ㅤ *∂υяα¢ιón:* ${video.duration || 'Desconocida'}
> ₊· ⫏⫏ ㅤ *¢αℓι∂α∂:* ${calidad}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim()

    if (video.thumbnail) {
      await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: caption
      }, { quoted: m })
    } else {
      await m.reply(caption)
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      fileName: `${video.title || 'facebook_video'}.mp4`
    }, { quoted: m })

    await m.react('✅')

  } catch (error) {
    console.error(error)
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ∂єѕ¢αяgα ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}
> ₊· ⫏⫏ ㅤ Vєяιƒι¢α qυє єℓ єηℓα¢є ѕєα νáℓι∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = ['facebook', 'fb', 'fbvideo']

export default handler