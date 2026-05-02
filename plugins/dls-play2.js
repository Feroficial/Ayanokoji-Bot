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
            await m.reply(`🎭 Descargando video (360p)... un momento`)
            
            const res = await fetch(`https://dvlyonn.onrender.com/download/ytvideo?url=${encodeURIComponent(url)}&quality=360`)
            const data = await res.json()
            
            if (!data.status || !data.result?.download_url) {
                throw new Error('No se pudo obtener el video')
            }
            
            const video = data.result
            const caption = `🎭 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 ✧ —* 🎭
            
> 🎯 *Título:* ${video.title || 'Sin título'}
> 📌 *Calidad:* ${video.quality || '360p'}
> 💾 *Formato:* MP4

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, {
                video: { url: video.download_url },
                caption: caption,
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
        
        const info = `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 ✧ —* 🎭
        
> 🎯 *Título:* ${primerVideo.title}
> 📌 *Canal:* ${primerVideo.channel}
> 👁️ *Vistas:* ${primerVideo.views}
> ⏱️ *Duración:* ${primerVideo.duration}

🎭 *Descargando video (360p)...*`
        
        await m.reply(info)
        
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