let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🌸 *— ✧ 𝐓𝐑𝐀𝐃𝐔𝐂𝐈𝐑 ✧ —* 🌸
    
> 🎀 *Usa:* #traducir <texto> | <idioma>
> 💗 *Ejemplo:* #traducir Hello world | es
> ✨ *Ejemplo 2:* #traducir Buenos días | en

> 📌 *Idiomas disponibles:*
> es (Español), en (Inglés), fr (Francés), it (Italiano), pt (Portugués), de (Alemán), ja (Japonés), ko (Coreano), zh (Chino), ru (Ruso)

🌸 *"Alya Bot te ayuda con los idiomas"* 🌸`)

    await m.react('🌐')
    
    try {
        let [texto, target] = text.split('|').map(s => s.trim())
        if (!target) {
            target = 'es'
        }
        
        const apiUrl = `https://dvlyonn.onrender.com/translate?text=${encodeURIComponent(texto)}&target=${target}`
        const res = await fetch(apiUrl)
        const data = await res.json()
        
        if (!data.status) throw new Error('Error en la traducción')
        
        const resultado = data.resultado
        
        const caption = `🌐 *— ✧ 𝐓𝐑𝐀𝐃𝐔𝐂𝐂𝐈Ó𝐍 ✧ —* 🌐
        
> 🎀 *Original:* ${resultado.original}
> 💗 *Traducido:* ${resultado.traducido}
> ✨ *Idioma origen:* ${resultado.idioma_origen}
> 🧸 *Idioma destino:* ${resultado.idioma_destino}

🌸 *"Alya Bot siempre contigo"* 🌸`
        
        await m.reply(caption)
        await m.react('✅')
        
    } catch (error) {
        console.error(error)
        await m.reply(`🌸 *Error* 🌸\n> 💗 No se pudo traducir el texto. Intenta de nuevo.`)
        await m.react('❌')
    }
}

handler.help = ['traducir <texto> | <idioma>']
handler.tags = ['tools']
handler.command = ['traducir', 'translate', 'traductor']

export default handler