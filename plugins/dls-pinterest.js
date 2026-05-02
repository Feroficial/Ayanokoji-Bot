let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar y descargar 5 imágenes
> • #pinterest <url> - Descargar pin directo

> 📌 *Ejemplos:*
> • #pinterest gatos
> • #pinterest https://pinterest.com/pin/123456789

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        const pinUrl = text.includes('pinterest.com/pin/') ? text : null
        
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
        
        await m.reply(`🎭 Buscando y descargando 5 resultados de "${text}"...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || searchData.total_results === 0) {
            throw new Error('No se encontraron resultados')
        }
        
        for (let i = 0; i < searchData.result.length; i++) {
            const item = searchData.result[i]
            const isVideo = item.type === 'video'
            const caption = `🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ${i+1}/5 ✧ —* 🎭
            
> 🎯 *Título:* ${item.title || 'Sin título'}
> 🎭 *Tipo:* ${isVideo ? 'Video 📹' : 'Imagen 🖼️'}

🎭 *Alya 2026* 🎭`
            
            if (isVideo) {
                await conn.sendMessage(m.chat, { video: { url: item.url }, caption, mimetype: 'video/mp4' })
            } else {
                await conn.sendMessage(m.chat, { image: { url: item.url }, caption })
            }
            await new Promise(r => setTimeout(r, 1000))
        }
        
        await m.reply(`🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭\n> 📌 Se enviaron ${searchData.result.length} imágenes de "${text}"\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
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