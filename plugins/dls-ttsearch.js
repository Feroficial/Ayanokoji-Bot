let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #tt <búsqueda> - Buscar y descargar videos
> • #tt <url> - Descargar video directo

> 📌 *Ejemplos:*
> • #tt Bad Bunny
> • #tt https://vm.tiktok.com/xxxxx

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya Bot - Potencia en tus manos* 🎭`)

    await m.react('🎭')
    
    try {
        const baseApi = 'https://dvlyonn.onrender.com'
        
        if (text.includes('tiktok.com')) {
            let url = text
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

🎭 *Alya Bot - Potencia en tus manos* 🎭`
            
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
        
        const res = await fetch(`${baseApi}/search/tiktok?query=${encodeURIComponent(query)}&limit=5`)
        const data = await res.json()
        
        if (!data.status || data.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        let txt = `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 𝐓𝐈𝐊𝐓𝐎𝐊 ✧ —* 🎭\n\n`
        for (let i = 0; i < data.result.length; i++) {
            const v = data.result[i]
            txt += `> 🎯 *${i + 1}.* ${v.title}\n`
            txt += `> 📌 👤 ${v.author.name} | ❤️ ${v.stats.likes} | 👁️ ${v.stats.plays}\n\n`
        }
        txt += `🎭 *Responde con el número del video que deseas descargar (1-${data.result.length})*\n🔗 *O usa:* #tt <url>\n\n🎭 *Alya Bot - Siempre contigo* 🎭`
        
        await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
        
        const timeout = 30000
        const collector = async (msg) => {
            if (msg.key.remoteJid !== m.chat) return false
            if (msg.key.fromMe) return false
            if (!msg.message?.conversation) return false
            
            const response = msg.message.conversation.trim()
            const selected = parseInt(response)
            
            if (isNaN(selected) || selected < 1 || selected > data.result.length) {
                await m.reply(`🎭 *Opción inválida*\n> 📌 Responde con un número entre 1 y ${data.result.length}`)
                return false
            }
            
            const selectedVideo = data.result[selected - 1]
            await m.reply(`🎭 Descargando video ${selected}...`)
            
            const downloadRes = await fetch(`${baseApi}/download/tiktok?url=${encodeURIComponent(selectedVideo.url)}`)
            const downloadData = await downloadRes.json()
            
            if (!downloadData.status || !downloadData.result?.video) {
                await m.reply(`🎭 *Error*\n> 📌 No se pudo descargar el video`)
                return false
            }
            
            const video = downloadData.result
            const caption = `🎭 *— ✧ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 ✧ —* 🎭
            
> 🎯 *Título:* ${video.title || selectedVideo.title}
> 📌 *Autor:* ${video.author?.name || selectedVideo.author.name}
> ❤️ *Likes:* ${video.likes || 0}
> 💬 *Comentarios:* ${video.comments || 0}
> 👁️ *Vistas:* ${video.views || 0}

🎭 *Alya Bot - Potencia en tus manos* 🎭`
            
            await conn.sendMessage(m.chat, {
                video: { url: video.video },
                caption: caption,
                mimetype: 'video/mp4'
            }, { quoted: m })
            
            await m.react('✅')
            return true
        }
        
        const startTime = Date.now()
        while (Date.now() - startTime < timeout) {
            const messages = await conn.loadMessage(m.chat, 5)
            for (const msg of messages) {
                const result = await collector(msg)
                if (result) break
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message || 'No se pudo procesar tu solicitud.'}`)
        await m.react('❌')
    }
}

handler.help = ['tt <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['tt', 'tiktok']

export default handler