let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐀𝐔𝐃𝐈𝐎 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #play <búsqueda> - Buscar y enviar audio del primer resultado
> • #play <url> - Descargar audio directo

> 📌 *Ejemplos:*
> • #play Bad Bunny
> • #play https://youtu.be/dQw4w9WgXcQ

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        if (text.includes('youtube.com') || text.includes('youtu.be')) {
            let url = text
            await m.reply(`🎭 Obteniendo información...`)
            
            const infoRes = await fetch(`https://dvlyonn.onrender.com/search/youtube?q=${encodeURIComponent(url)}`)
            const infoData = await infoRes.json()
            
            let thumbnail = 'https://i.ytimg.com/vi/XXXXX/hqdefault.jpg'
            let title = 'Sin título'
            let channel = 'Desconocido'
            
            if (infoData.status && infoData.result.length > 0) {
                thumbnail = infoData.result[0].thumbnail
                title = infoData.result[0].title
                channel = infoData.result[0].channel
            }
            
            await conn.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎭 *— ✧ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 ✧ —* 🎭
                
> 🎯 *Título:* ${title}
> 📌 *Canal:* ${channel}
> 🎵 *Formato:* MP3
> 🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026*`
            }, { quoted: m })
            
            await m.reply(`🎭 Descargando audio...`)
            
            const res = await fetch(`https://dvlyonn.onrender.com/download/ytaudio?url=${encodeURIComponent(url)}`)
            const data = await res.json()
            
            if (!data.status || !data.result?.download_url) {
                throw new Error('No se pudo obtener el audio')
            }
            
            const audio = data.result
            const captionAudio = `🎭 *— ✧ 𝐀𝐔𝐃𝐈𝐎 𝐋𝐈𝐒𝐓𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${audio.title || title}
> 🎵 *Formato:* MP3
> 📌 *Calidad:* Alta

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, {
                audio: { url: audio.download_url },
                mimetype: 'audio/mpeg',
                fileName: `${audio.title || 'audio'}.mp3`,
                caption: captionAudio
            }, { quoted: m })
            
            await m.react('✅')
            return
        }
        
        let query = text
        await m.reply(`🎭 Buscando "${query}"...`)
        
        const searchRes = await fetch(`https://dvlyonn.onrender.com/search/youtube?q=${encodeURIComponent(query)}`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || searchData.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        const primerVideo = searchData.result[0]
        
        await conn.sendMessage(m.chat, {
            image: { url: primerVideo.thumbnail },
            caption: `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${primerVideo.title}
> 📌 *Canal:* ${primerVideo.channel}
> 👁️ *Vistas:* ${primerVideo.views}
> ⏱️ *Duración:* ${primerVideo.duration}
> 🎵 *Formato:* MP3

🎭 *Descargando audio...*`
        }, { quoted: m })
        
        const downloadRes = await fetch(`https://dvlyonn.onrender.com/download/ytaudio?url=${encodeURIComponent(primerVideo.url)}`)
        const downloadData = await downloadRes.json()
        
        if (!downloadData.status || !downloadData.result?.download_url) {
            throw new Error('No se pudo descargar el audio')
        }
        
        const audio = downloadData.result
        const caption = `🎭 *— ✧ 𝐀𝐔𝐃𝐈𝐎 𝐋𝐈𝐒𝐓𝐎 ✧ —* 🎭
        
> 🎯 *Título:* ${audio.title || primerVideo.title}
> 📌 *Canal:* ${primerVideo.channel}
> 🎵 *Formato:* MP3

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
        
        await conn.sendMessage(m.chat, {
            audio: { url: audio.download_url },
            mimetype: 'audio/mpeg',
            fileName: `${audio.title || primerVideo.title}.mp3`,
            caption: caption
        }, { quoted: m })
        
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar tu solicitud.'}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['play <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['play', 'audio', 'mp3']

export default handler