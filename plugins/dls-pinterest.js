let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar y descargar 5 imágenes (sin videos)
> • #pinterest <url> - Descargar imagen de un pin (solo foto)

> 📌 *Ejemplos:*
> • #pinterest gatos
> • #pinterest https://pinterest.com/pin/123456789

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        const pinUrl = text.includes('pinterest.com/pin/') ? text : null
        
        // Descarga directa por URL (solo si es imagen)
        if (pinUrl) {
            await m.reply(`🎭 Obteniendo imagen del pin...`)
            const res = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(pinUrl)}`)
            const data = await res.json()
            if (!data.status || !data.result) throw new Error('No se pudo obtener el pin')
            
            const contentUrl = data.result.download_url || data.result.url || data.result.dl
            if (!contentUrl) throw new Error('No se encontró URL de descarga')
            
            const isVideo = contentUrl.match(/\.(mp4|webm|mov)/i) || data.result.type === 'video'
            if (isVideo) {
                throw new Error('Este pin es un video. Solo se permiten imágenes.')
            }
            
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍 𝐃𝐄𝐒𝐶𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${data.result.title || 'Sin título'}
> 🎭 *Tipo:* Imagen 🖼️

🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, { image: { url: contentUrl }, caption })
            await m.react('✅')
            return
        }
        
        // Búsqueda y descarga automática (solo imágenes)
        await m.reply(`🎭 Buscando imágenes de "${text}" en Pinterest...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=10`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || !searchData.result || searchData.result.length === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        let imagenes = []
        // Obtener URLs de descarga y filtrar solo imágenes
        for (let i = 0; i < searchData.result.length && imagenes.length < 5; i++) {
            const item = searchData.result[i]
            const pinUrl = item.url || item.link
            if (!pinUrl) continue
            
            const downloadRes = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(pinUrl)}`)
            const downloadData = await downloadRes.json()
            if (!downloadData.status || !downloadData.result) continue
            
            const contentUrl = downloadData.result.download_url || downloadData.result.url || downloadData.result.dl
            if (!contentUrl) continue
            
            const isVideo = contentUrl.match(/\.(mp4|webm|mov)/i) || downloadData.result.type === 'video'
            if (!isVideo) {
                imagenes.push({
                    url: contentUrl,
                    title: downloadData.result.title || item.title || 'Sin título'
                })
            }
        }
        
        if (imagenes.length === 0) {
            throw new Error('No se encontraron imágenes en los resultados. Solo se envían fotos, no videos.')
        }
        
        for (let i = 0; i < imagenes.length; i++) {
            const img = imagenes[i]
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ${i+1}/${imagenes.length} ✧ —* 🎭
            
> 🎯 *Título:* ${img.title}
> 🎭 *Tipo:* Imagen 🖼️

🎭 *Alya 2026* 🎭`
            
            await conn.sendMessage(m.chat, { image: { url: img.url }, caption })
            await new Promise(r => setTimeout(r, 800))
        }
        
        await m.reply(`🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭\n> 📌 Se enviaron ${imagenes.length} imágenes de "${text}"\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
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