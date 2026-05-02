let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #tt <búsqueda> - Buscar y descargar 3 videos
> • #tt <url> - Descargar video directo

> 📌 *Ejemplos:*
> • #tt Bad Bunny
> • #tt https://vm.tiktok.com/xxxxx

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        if (text.includes('tiktok.com')) {
            let url = text
            await m.reply('🎭 Descargando video... un momento')
            
            const res = await fetch(`https://dvlyonn.onrender.com/download/tiktok?url=${encodeURIComponent(url)}`)
            const data = await res.json()
            
            if (!data.status || !data.result?.video) {
                throw new Error('No se pudo obtener el video')
            }
            
            const video = data.result
            const caption = `🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 ✧ —* 🎭
            
> 🎯 *Título:* ${video.title || 'Sin título'}
> 📌 *Autor:* ${video.author?.name || 'Desconocido'}
> ❤️ *Likes:* ${video.likes || 0}
> 💬 *Comentarios:* ${video.comments || 0}
> 👁️ *Vistas:* ${video.views || 0}

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, {
                video: { url: video.video },
                caption: caption,
                mimetype: 'video/mp4'
            }, { quoted: m })
            
            await m.react('✅')
            return
        }
        
        let query = text
        await m.reply(`🎭 Buscando "${query}"...`)
        
        const res = await fetch(`https://dvlyonn.onrender.com/search/tiktok?query=${encodeURIComponent(query)}&limit=3`)
        const data = await res.json()
        
        if (!data.status || data.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        let lista = `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 ✧ —* 🎭\n\n`
        for (let i = 0; i < data.result.length; i++) {
            const v = data.result[i]
            lista += `> 🎯 *${i + 1}.* ${v.title.substring(0, 50)}\n`
            lista += `> 📌 👤 ${v.author.name} | ❤️ ${v.stats.likes}\n`
            lista += `> 🔗 ${v.url}\n\n`
        }
        lista += `🎭 *Descargando los 3 videos...*\n🔗 *API oficial:* https://dvlyonn.onrender.com\n🎭 *Alya 2026* 🎭`
        
        await m.reply(lista)
        
        for (let i = 0; i < data.result.length; i++) {
            const videoInfo = data.result[i]
            
            const downloadRes = await fetch(`https://dvlyonn.onrender.com/download/tiktok?url=${encodeURIComponent(videoInfo.url)}`)
            const downloadData = await downloadRes.json()
            
            if (!downloadData.status || !downloadData.result?.video) {
                await m.reply(`🎭 *Error* - No se pudo descargar el video ${i + 1}`)
                continue
            }
            
            const video = downloadData.result
            const caption = `🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 ${i + 1}/${data.result.length} ✧ —* 🎭
            
> 🎯 *Título:* ${video.title || videoInfo.title}
> 📌 *Autor:* ${video.author?.name || videoInfo.author.name}
> ❤️ *Likes:* ${video.likes || videoInfo.stats.likes}
> 👁️ *Vistas:* ${video.views || videoInfo.stats.plays}

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, {
                video: { url: video.video },
                caption: caption,
                mimetype: 'video/mp4'
            }, { quoted: m })
            
            await new Promise(resolve => setTimeout(resolve, 1500))
        }
        
        await m.reply(`🎭 *— ✧ 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎 ✧ —* 🎭\n> 📌 Se enviaron ${data.result.length} videos\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar tu solicitud.'}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['tt <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['tt', 'tiktok']

export default handler