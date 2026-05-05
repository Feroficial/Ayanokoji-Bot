import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`
ㅤ    ꒰  ㅤ 📹 ㅤ *αℓуα - νι∂єσ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υsσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *υsσ:* ${usedPrefix}νι∂єσ <cαnción σ νι∂єσ>
> ₊· ⫏⫏ ㅤ *єjємρℓσ:* ${usedPrefix}νι∂єσ Alejo igoa 

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  await m.react('📹')

  try {
    await m.reply(`
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - νι∂єσ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вυscαη∂σ 木 🎬 ㅤ 性

> ₊· ⫏⫏ ㅤ *вυscαη∂σ:* ${text}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

    const searchUrl = `https://api.alyacore.xyz/search/yt?query=${encodeURIComponent(text)}&key=Alya-WDxN0Sg4`
    const busqueda = await fetch(searchUrl)
    const searchData = await busqueda.json()

    if (!searchData.status || !searchData.result?.length) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єrrσr 木 вúsqυє∂α ㅤ 性

> ₊· ⫏⫏ ㅤ No sє єncσntró: *${text}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

    const video = searchData.result[0]

    await m.reply(`
ㅤ    ꒰  ㅤ ⏳ ㅤ *αℓуα - νι∂єσ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ∂єscαrgαη∂σ 木 📥 ㅤ 性

> ₊· ⫏⫏ ㅤ *τíτυℓσ:* ${video.title.substring(0, 50)}...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

    const downloadUrl = `https://dvlyonn.onrender.com/download/ytvideo?url=${encodeURIComponent(video.url)}`
    const descarga = await fetch(downloadUrl)
    const downloadData = await descarga.json()

    if (!downloadData.status || !downloadData.result?.download_url) {
      throw new Error('No se pudo obtener el video')
    }

    const caption = `
ㅤ    ꒰  ㅤ 📹 ㅤ *αℓуα - νι∂єσ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єท αíяє 木 🎬 ㅤ 性

> ₊· ⫏⫏ ㅤ *τíτυℓσ:* ${downloadData.result.title || video.title}
> ₊· ⫏⫏ ㅤ *∂υrαción:* ${downloadData.result.duration || video.duration}
> ₊· ⫏⫏ ㅤ *cяєα∂σr:* ${video.autor}
> ₊· ⫏⫏ ㅤ *👁️ νιѕтαѕ:* ${video.views}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *αρι:* https://api.alyacore.xyz
    `.trim()

    await conn.sendMessage(m.chat, {
      video: { url: downloadData.result.download_url },
      caption: caption,
      mimetype: 'video/mp4'
    }, { quoted: m })

    await m.react('✅')
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - νι∂єσ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єทvíα∂σ 木 🎥 ㅤ 性

> ₊· ⫏⫏ ㅤ *∂isfrυτα тυ νι∂єσ*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

  } catch (error) {
    console.error(error)
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ғαℓℓσ 木 cσทєxión ㅤ 性

> ₊· ⫏⫏ ㅤ *єrrσr:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *αρι:* https://api.alyacore.xyz
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['ytvideo']
handler.tags = ['downloader']
handler.command = ['video', 'ytvideo', 'descargarvideo']

export default handler