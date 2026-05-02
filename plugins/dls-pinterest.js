let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar y descargar 5 resultados
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
            
            // Asegurar que tenemos la URL del contenido
            const contentUrl = data.result.download_url || data.result.url || data.result.dl
            if (!contentUrl) throw new Error('No se encontró URL de descarga')
            
            const isVideo = contentUrl.match(/\.(mp4|webm|mov)/i) || data.result.type === 'video'
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎 ✧ —* 🎭
            
> 🎯 *Título:* ${data.result.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}
> 🔗 *Fuente:* ${pinUrl}

🎭 *Alya 2026* 🎭`
            
            if (isVideo) {
                await conn.sendMessage(m.chat, { video: { url: contentUrl }, caption, mimetype: 'video/mp4' })
            } else {
                await conn.sendMessage(m.chat, { image: { url: contentUrl }, caption })
            }
            await m.react('✅')
            return
        }
        
        // Búsqueda y descarga automática
        await m.reply(`🎭 Buscando "${text}" en Pinterest...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || !searchData.result || searchData.result.length === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        let enviados = 0
        for (let i = 0; i < searchData.result.length; i++) {
            const item = searchData.result[i]
            // La URL del pin puede estar en `item.url` o `item.link`
            const pinUrl = item.url || item.link
            if (!pinUrl) continue
            
            // Llamar al endpoint de descarga con la URL del pin
            const downloadRes = await fetch(`https://dvlyonn.onrender.com/pinterest?url=${encodeURIComponent(pinUrl)}`)
            const downloadData = await downloadRes.json()
            
            if (!downloadData.status || !downloadData.result) continue
            
            const contentUrl = downloadData.result.download_url || downloadData.result.url || downloadData.result.dl
            if (!contentUrl) continue
            
            const isVideo = contentUrl.match(/\.(mp4|webm|mov)/i) || downloadData.result.type === 'video'
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ${enviados+1}/5 ✧ —* 🎭
            
> 🎯 *Título:* ${downloadData.result.title || item.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}

🎭 *Alya 2026* 🎭`
            
            try {
                if (isVideo) {
                    await conn.sendMessage(m.chat, { video: { url: contentUrl }, caption, mimetype: 'video/mp4' })
                } else {
                    await conn.sendMessage(m.chat, { image: { url: contentUrl }, caption })
                }
                enviados++
                await new Promise(r => setTimeout(r, 800))
            } catch (err) {
                console.error(`Error enviando item ${i+1}:`, err)
            }
        }
        
        if (enviados === 0) {
            throw new Error('No se pudo descargar ningún resultado. Verifica que la API devuelva URLs válidas.')
        }
        
        await m.reply(`🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭\n> 📌 Se enviaron ${enviados} de ${searchData.result.length} resultados de "${text}"\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
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