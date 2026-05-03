let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`
ㅤ    ꒰  ㅤ 📌 ㅤ *αℓуα - ριηтєяєѕт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ριηтєяєѕт <вúѕqυє∂α>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #ριηтєяєѕт ραιѕαנєѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())

    await m.react('📌')
    
    try {
        await m.reply(`
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - ριηтєяєѕт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вυѕ¢αη∂σ 木 🔎 ㅤ 性

> ₊· ⫏⫏ ㅤ Bυѕ¢αη∂σ: *${text}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
        
        const res = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const data = await res.json()
        
        if (!data.status || data.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        for (let i = 0; i < data.result.length; i++) {
            const item = data.result[i]
            const caption = `
ㅤ    ꒰  ㅤ 📌 ㅤ *αℓуα - ριηтєяєѕт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕυℓтα∂σ 木 ${i+1}/${data.result.length} ㅤ 性

> ₊· ⫏⫏ ㅤ *📝 Tíтυℓσ:* ${item.title || 'Sin título'}
> ₊· ⫏⫏ ㅤ *👤 Aυтσя:* ${item.author || 'Desconocido'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
            `.trim()
            
            await conn.sendMessage(m.chat, {
                image: { url: item.image },
                caption: caption
            }, { quoted: m })
            
            await new Promise(r => setTimeout(r, 500))
        }
        
        await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - ριηтєяєѕт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σмρℓєтα∂σ 木 📌 ㅤ 性

> ₊· ⫏⫏ ㅤ Se enviaron *${data.result.length}* resultados de *${text}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
        `.trim())
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ριηтєяєѕт ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
        `.trim())
        await m.react('❌')
    }
}

handler.help = ['pinterest <búsqueda>']
handler.tags = ['downloader']
handler.command = ['pinterest', 'pin', 'ριηтєяєѕт']

export default handler