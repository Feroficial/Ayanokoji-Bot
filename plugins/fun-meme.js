let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('😂')
  
  await m.reply(`
ㅤ    ꒰  ㅤ ⏳ ㅤ *αℓуα - мємє* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вυѕ¢αη∂σ 木 мємє ㅤ 性

> ₊· ⫏⫏ ㅤ Cαяgαη∂σ мємє αℓєαтσяισ...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  try {
    const res = await fetch('https://dvlyonn.onrender.com/random/meme')
    const data = await res.json()
    
    if (!data.status || !data.resultado?.url) throw new Error('No se encontró meme')
    
    const meme = data.resultado
    const caption = `
ㅤ    ꒰  ㅤ 😂 ㅤ *αℓуα - мємє* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ мємє 木 ∂є нσу ㅤ 性

> ₊· ⫏⫏ ㅤ *📝 Tíтυℓσ:* ${meme.titulo || 'Sin título'}
> ₊· ⫏⫏ ㅤ *👤 Aυтσя:* ${meme.autor || 'Desconocido'}
> ₊· ⫏⫏ ㅤ *📅 Cяєα∂σ:* ${meme.creado || 'Reciente'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim()
    
    await conn.sendMessage(m.chat, {
      image: { url: meme.url },
      caption: caption
    }, { quoted: m })
    
    await m.react('✅')
  } catch (error) {
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 мємє ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['meme']
handler.tags = ['fun']
handler.command = ['meme', 'memes']

export default handler