let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐸𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar imágenes (5 resultados)
> • #pinterest <url> - Descargar pin directo

> 📌 *Ejemplos:*
> • #pinterest gatos
> • #pinterest https://pinterest.com/pin/123456789

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        const pinUrl = text.includes('pinterest.com/pin/') ? text : null
        
        // Descarga directa por URL
        if (pinUrl) {
            await m.reply(`🎭 Obteniendo contenido del pin...`)
            const res = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(pinUrl)}`)
            const data = await res.json()
            if (!data.status || !data.result) throw new Error('No se pudo obtener el pin')
            
            const pin = data.result
            const isVideo = pin.type === 'video'
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${pin.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}
> 🔗 *Fuente:* ${pin.source_url}

🎭 *Alya 2026* 🎭`
            
            if (isVideo) {
                await conn.sendMessage(m.chat, { video: { url: pin.url }, caption, mimetype: 'video/mp4' })
            } else {
                await conn.sendMessage(m.chat, { image: { url: pin.url }, caption })
            }
            await m.react('✅')
            return
        }
        
        // Búsqueda
        await m.reply(`🎭 Buscando "${text}" en Pinterest...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || searchData.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        // Enviar resultados con miniaturas y opción de selección
        for (let i = 0; i < searchData.result.length; i++) {
            const item = searchData.result[i]
            const isVideo = item.type === 'video'
            await conn.sendMessage(m.chat, {
                image: { url: item.thumbnail },
                caption: `🎭 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 ${i+1} ✧ —* 🎭
                
> 🎯 *Título:* ${item.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}
> 📌 *Responde con el número ${i+1} para descargar*

🔗 *API oficial:* https://dvlyonn.onrender.com
🎭 *Alya 2026* 🎭`
            })
            await new Promise(r => setTimeout(r, 600))
        }
        
        await m.reply(`🎭 Responde con el número del resultado (1 al ${searchData.result.length}) para descargar.`)
        
        // Esperar respuesta del usuario (número)
        let selectedNum = null
        const start = Date.now()
        const timeout = 30000
        
        while (!selectedNum && Date.now() - start < timeout) {
            const msgs = await conn.loadMessage(m.chat, 10)
            for (const msg of msgs) {
                if (msg.key.fromMe) continue
                const num = parseInt(msg.message?.conversation?.trim())
                if (!isNaN(num) && num >= 1 && num <= searchData.result.length) {
                    selectedNum = num
                    break
                }
            }
            await new Promise(r => setTimeout(r, 1000))
        }
        
        if (!selectedNum) {
            await m.reply(`🎭 Tiempo agotado. Usa #pinterest <url> para descargar manualmente.`)
            return
        }
        
        const selectedItem = searchData.result[selectedNum - 1]
        await m.reply(`🎭 Descargando resultado ${selectedNum}...`)
        
        const downloadRes = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(selectedItem.link)}`)
        const downloadData = await downloadRes.json()
        
        if (!downloadData.status || !downloadData.result) {
            throw new Error('Error al descargar el pin')
        }
        
        const pin = downloadData.result
        const isVideo = pin.type === 'video'
        const caption = `🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭
        
> 🎯 *Título:* ${pin.title || selectedItem.title}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}

🎭 *Alya 2026* 🎭`
        
        if (isVideo) {
            await conn.sendMessage(m.chat, { video: { url: pin.url }, caption, mimetype: 'video/mp4' })
        } else {
            await conn.sendMessage(m.chat, { image: { url: pin.url }, caption })
        }
        
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['pinterest <búsqueda|url>']
handler.tags = ['downloader']
handler.command = ['pinterest', 'pin']

export default handler