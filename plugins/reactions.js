let handler = async (m, { conn, command }) => {
    let query = ''
    let emoji = ''
    let texto = ''
    
    if (command === 'sad') {
        query = 'anime sad crying'
        emoji = '😢'
        texto = 'єѕтá тяιѕтє'
    } else if (command === 'punch') {
        query = 'anime punch'
        emoji = '👊'
        texto = '∂ισ υη gσℓρє'
    } else if (command === 'happy') {
        query = 'anime happy smile'
        emoji = '😊'
        texto = 'єѕтá ƒєℓιz'
    } else if (command === 'kiss') {
        query = 'anime kiss'
        emoji = '😘'
        texto = '∂ισ υη вєѕσ'
    } else if (command === 'hug') {
        query = 'anime hug'
        emoji = '🤗'
        texto = '∂ισ υη αвяαzσ'
    } else {
        return
    }
    
    await m.react(emoji)
    
    try {
        const res = await fetch(`https://dvlyonn.onrender.com/random/gif?q=${encodeURIComponent(query)}&limit=1`)
        const data = await res.json()
        
        if (!data.status || !data.result.length) throw new Error('No se encontró GIF')
        
        const gifUrl = data.result[0].url
        const caption = `
ㅤ    ꒰  ㅤ ${emoji} ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ${command} 木 α¢¢ιóη ㅤ 性

> ₊· ⫏⫏ ㅤ *${m.pushName || 'Aℓgυιєη'}* ${texto}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: ℓʏσηη
        `.trim()
        
        await conn.sendMessage(m.chat, {
            image: { url: gifUrl },
            caption: caption
        }, { quoted: m })
        
        await m.react('✅')
    } catch (e) {
        await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 gιƒ ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${e.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
        await m.react('❌')
    }
}

handler.help = ['sad', 'punch', 'happy', 'kiss', 'hug']
handler.tags = ['reaction']
handler.command = ['sad', 'triste', 'punch', 'golpe', 'happy', 'feliz', 'kiss', 'besar', 'hug', 'abrazar']

export default handler