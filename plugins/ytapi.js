let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`
🌸 *— ✧ 𝐘𝐓 𝐀𝐏𝐈 ✧ —* 🌸

> 🎀 *Usa:* ${command} <url>
> 💗 *Ejemplo:* ${command} https://youtu.be/dQw4w9WgXcQ

🌸 *Comandos disponibles:*
> • #ytinfo - Ver información del video
> • #ytaudio - Descargar audio MP3
> • #ytvideo - Descargar video MP4
`)

  let url = encodeURIComponent(text)
  let apiBase = 'https://appreciated-river-measurements-universal.trycloudflare.com'

  try {
    if (command === 'ytinfo') {
      await m.react('🔍')
      let res = await fetch(`${apiBase}/api/info?url=${url}`)
      let data = await res.json()
      
      let txt = `
🌸 *— ✧ 𝐈𝐍𝐅𝐎 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 ✧ —* 🌸

> 🎀 *Título:* ${data.titulo}
> 💗 *Canal:* ${data.canal}
> ⏱️ *Duración:* ${data.duracion} segundos
> 👁️ *Vistas:* ${data.vistas}

🌸 *"Ania Bot siempre contigo"* 🌸
      `.trim()
      await m.reply(txt)
      await m.react('✅')
    }
    
    else if (command === 'ytaudio') {
      await m.react('🎵')
      await m.reply(`🌸 *Descargando audio...* 🌸\n> 🎀 Un momento por favor`)
      
      let audioUrl = `${apiBase}/api/download?url=${url}&type=audio`
      
      await conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: 'audio.mp3'
      }, { quoted: m })
      await m.react('✅')
    }
    
    else if (command === 'ytvideo') {
      await m.react('🎬')
      await m.reply(`🌸 *Descargando video...* 🌸\n> 🎀 Un momento por favor`)
      
      let videoUrl = `${apiBase}/api/download?url=${url}&type=video`
      
      await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: '🌸 *Video descargado con Ania API* 🌸'
      }, { quoted: m })
      await m.react('✅')
    }
    
  } catch (error) {
    console.error(error)
    await m.reply(`🌸 *Error* 🌸\n> 💗 ${error.message}`)
    await m.react('❌')
  }
}

handler.help = ['ytinfo <url>', 'ytaudio <url>', 'ytvideo <url>']
handler.tags = ['downloader']
handler.command = ['ytinfo', 'ytaudio', 'ytvideo']

export default handler