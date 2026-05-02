// plugins/pinterest.js
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ✧ —* 🎭
    
> 🎯 *Comandos:*
> • #pinterest <búsqueda> - Buscar y mostrar 5 imágenes.
> • #pinterest <url> - Mostrar la imagen de un pin específico.

> 📌 *Ejemplos:*
> • #pinterest gatos
> • #pinterest https://pinterest.com/pin/123456789

🔗 *API oficial:* https://dvlyonn.onrender.com

🎭 *Alya 2026* 🎭`)

    await m.react('🎭')
    
    try {
        const pinUrl = text.includes('pinterest.com/pin/') ? text : null
        
        // Manejo de URL directa de un pin
        if (pinUrl) {
            await m.reply(`🎭 Obteniendo imagen del pin...`)
            // Nota: Este endpoint parece no estar funcionando. Por ahora, solo manejamos búsquedas.
            throw new Error('La descarga directa por URL no está soportada en este momento. Por favor, usa una búsqueda por palabra clave.');
        }
        
        // --- BÚSQUEDA Y ENVÍO DE IMÁGENES ---
        await m.reply(`🎭 Buscando imágenes de "${text}" en Pinterest...`)
        const searchRes = await fetch(`https://dvlyonn.onrender.com/pinterest?query=${encodeURIComponent(text)}&limit=5`)
        const searchData = await searchRes.json()
        
        if (!searchData.status || !searchData.result || searchData.result.length === 0) {
            throw new Error('No se encontraron resultados para tu búsqueda.')
        }
        
        let enviadas = 0
        // Itera sobre los resultados y envía cada imagen.
        for (let i = 0; i < searchData.result.length; i++) {
            const imagen = searchData.result[i]
            // Asegúrate de que 'image' es la URL de la imagen de alta calidad.
            const imageUrl = imagen.image
            if (!imageUrl) continue

            const caption = `🎭 *— ✧ 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ${i+1}/${searchData.result.length} ✧ —* 🎭
            
> 🎯 *Título:* ${imagen.title || 'Sin título'}

🎭 *Alya 2026* 🎭`
            
            try {
                await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption })
                enviadas++
                await new Promise(r => setTimeout(r, 800))
            } catch (err) {
                console.error(`Error enviando imagen ${i+1}:`, err)
            }
        }
        
        if (enviadas === 0) {
            throw new Error('No se pudo enviar ninguna imagen. Verifica que la API devuelva URLs válidas.')
        }
        
        await m.reply(`🎭 *— ✧ 𝐃𝐄𝐒𝐂𝐀𝐫𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ✧ —* 🎭\n> 📌 Se enviaron ${enviadas} imágenes de "${text}".\n> 🔗 *API oficial:* https://dvlyonn.onrender.com\n\n🎭 *Alya 2026* 🎭`)
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🎭 *Error* 🎭\n> 📌 ${error.message}\n> 🔗 *API oficial:* https://dvlyonn.onrender.com`)
        await m.react('❌')
    }
}

handler.help = ['pinterest <búsqueda>']
handler.tags = ['downloader']
handler.command = ['pinterest', 'pin']

export default handler