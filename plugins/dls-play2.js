let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #yt <búsqueda> - Buscar y descargar el primer video (360p)
> • #yt <url> - Descargar video directo

> 📌 *Ejemplos:*
> • #yt Bad Bunny
> • #yt https://youtu.be/dQw4w9WgXcQ

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        if (text.includes('youtube.com') || text.includes('youtu.be')) {
            let url = text
            await m.reply(`🎭 Obteniendo información del video...`)
            
            // Primero obtener información para la miniatura
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
            
            // Mostrar miniatura e información
            await conn.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎭 *— ✧ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 ✧ —* 🎭
                
> 🎯 *Título:* ${title}
> 📌 *Canal:* ${channel}
> 💾 *Calidad:* 360p (peso liviano)
> 🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026*`
            }, { quoted: m })
            
            await m.reply(`🎭 Descargando video... un momento`)
            
            const res = await fetch(`https://dvlyonn.onrender.com/download/ytvideo?url=${encodeURIComponent(url)}&quality=360`)
            const data = await res.json()
            
            if (!data.status || !data.result?.download_url) {
                throw new Error('No se pudo obtener el video')
            }
            
            const video = data.result
            const captionVideo = `🎭 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 ✧ —* 🎭
            
> 🎯 *Título:* ${video.title || title}
> 📌 *Calidad:* ${video.quality || '360p'}
> 💾 *Formato:* MP4

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, {
                video: { url: video.download_url },
                caption: captionVideo,
                mimetype: 'video/mp4'
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
        
        // Enviar miniatura + info
        await conn.sendMessage(m.chat, {
            image: { url: primerVideo.thumbnail },
            caption: `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${primerVideo.title}
> 📌 *Canal:* ${primerVideo.channel}
> 👁️ *Vistas:* ${primerVideo.views}
> ⏱️ *Duración:* ${primerVideo.duration}
> 💾 *Calidad:* 360p (peso liviano)

🎭 *Descargando video...*`
        }, { quoted: m })
        
        const downloadRes = await fetch(`https://dvlyonn.onrender.com/download/ytvideo?url=${encodeURIComponent(primerVideo.url)}&quality=360`)
        const downloadData = await downloadRes.json()
        
        if (!downloadData.status || !downloadData.result?.download_url) {
            throw new Error('No se pudo descargar el video')
        }
        
        const video = downloadData.result
        const caption = `🎭 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 ✧ —* 🎭
        
> 🎯 *Título:* ${video.title || primerVideo.title}
> 📌 *Canal:* ${primerVideo.channel}
> 💾 *Calidad:* 360p

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
        
        await conn.sendMessage(m.chat, {
            video: { url: video.download_url },
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m })
        
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar tu solicitud.'}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['yt <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['yt', 'youtube', 'ytdl']

export default handler