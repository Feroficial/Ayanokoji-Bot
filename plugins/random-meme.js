let handler = async (m, { conn }) => {
    await m.react('🌸')
    
    try {
        const res = await fetch('https://dvlyonn.onrender.com/random/meme')
        const data = await res.json()
        
        if (!data.status) throw new Error('No se pudo obtener el meme')
        
        const meme = data.resultado
        const caption = `🌸 *— ✧ 𝐌𝐄𝐌𝐄 𝐀𝐋𝐄𝐀𝐓𝐎𝐑𝐈𝐎 ✧ —* 🌸
        
> 🎀 *Título:* ${meme.titulo}
> 💗 *Subreddit:* ${meme.subreddit}
> ✨ *Votos:* ${meme.votos} 👍
> 🧸 *Comentarios:* ${meme.comentarios}
> 👤 *Autor:* ${meme.autor}
> 📅 *Fecha:* ${meme.creado}

🌸 *"Alya Bot te trae el mejor contenido"* 🌸`
        
        await conn.sendMessage(m.chat, {
            image: { url: meme.url },
            caption: caption
        }, { quoted: m })
        
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🌸 *Error* 🌸\n> 💗 No se pudo obtener el meme. Intenta de nuevo.`)
        await m.react('❌')
    }
}

handler.help = ['meme']
handler.tags = ['random']
handler.command = ['meme', 'memes']

export default handler