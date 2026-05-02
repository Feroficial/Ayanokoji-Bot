let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #tt search <texto> - Buscar videos
> • #tt <url> - Descargar video

> 📌 *Ejemplos:*
> • #tt search Bad Bunny
> • #tt https://vm.tiktok.com/xxxxx

> 🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya Bot - Potencia en tus manos* 🎭`)

    await m.react('🎭')
    
    try {
        const baseApi = 'https://dvlyonn.onrender.com'
        
        if (command === 'ttsearch' || (text.startsWith('search ') && command === 'tt')) {
            let query = text
            if (command === 'tt' && text.startsWith('search ')) {
                query = text.replace('search ', '')
            }
            if (!query) return m.reply('🎭 Ingresa una palabra para buscar')
            
            await m.reply(`🎭 Buscando "${query}"...`)
            
            const res = await fetch(`${baseApi}/search/tiktok?query=${encodeURIComponent(query)}&limit=3`)
            const data = await res.json()
            
            if (!data.status || data.total_results === 0) {
                throw new Error('No se encontraron resultados')
            }
            
            let txt = `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 𝐓𝐈𝐊𝐓𝐎𝐊 ✧ —* 🎭\n\n`
            for (let i = 0; i < data.result.length; i++) {
                const v = data.result[i]
                txt += `> 🎯 *${i + 1}.* ${v.title}\n`
                txt += `> 📌 👤 ${v.author.name} | ❤️ ${v.stats.likes} | 👁️ ${v.stats.plays}\n`
                txt += `> 🔗 *Para descargar usa:* #tt ${v.url}\n\n`
            }
            txt += `🎭 *API oficial:* ${baseApi}\n🎭 *Alya Bot - Siempre contigo* 🎭`
            
            await m.reply(txt)
            await m.react('✅')
            return
        }
        
        let url = text
        if (!url.includes('tiktok.com')) {
            return m.reply('🎭 URL de TikTok no válida. Ejemplo: #tt https://vm.tiktok.com/xxxxx')
        }
        
        await m.reply('🎭 Descargando video... un momento')
        
        const res = await fetch(`${baseApi}/download/tiktok?url=${encodeURIComponent(url)}`)
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

🎭 *API oficial:* ${baseApi}
🎭 *Alya Bot - Potencia en tus manos* 🎭`
        
        await conn.sendMessage(m.chat, {
            video: { url: video.video },
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m })
        
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar tu solicitud.'}`)
        await m.react('❌')
    }
}

handler.help = ['tt <url|search>']
handler.tags = ['downloader']
handler.command = ['tt', 'ttsearch', 'tiktok']

export default handler