let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ Rєѕρση∂є α υηα ιмαgєη σ νι∂єσ
> ₊· ⫏⫏ ㅤ *Uѕσ:* ${usedPrefix + command}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (!/image|video/.test(mime)) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ fσямαтσ 木 ιηváℓι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ ιмαgєηєѕ σ νι∂єσѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  await m.react('🎨')

  try {
    let media = await q.download()
    let isVideo = /video/.test(mime)
    
    await conn.sendMessage(m.chat, {
      sticker: media,
      mimetype: 'image/webp',
      packname: 'αℓуα - вσт',
      author: 'ℓʏσηη'
    }, { quoted: m })
    
    await m.react('✅')
  } catch (error) {
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ѕтι¢кєя ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['sticker', 's', 'stiker']

export default handler