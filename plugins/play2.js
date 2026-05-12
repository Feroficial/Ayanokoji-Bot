import {
  generateWAMessageFromContent,
  proto
} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

let descargas = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    const buttons = {
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: '🎵 YT2MP3',
        sections: [
          {
            title: '🔗 ENLACE DE YOUTUBE',
            rows: [
              {
                header: '📥 DESCARGA DIRECTA',
                title: '🎵 PEGAR LINK',
                description: 'https://youtu.be/...',
                id: `${usedPrefix}play `
              }
            ]
          }
        ]
      })
    }

    const interactiveMessage = proto.Message.InteractiveMessage.create({
      header: { title: 'αℓуα - ∂σωηℓσα∂єя', subtitle: 'Youtube a Mp3', hasMediaAttachment: false },
      body: { text: `ㅤ    ꒰ 🎵 *αℓуα - ∂σωηℓσα∂єя* ⫏⫏ ꒱
ㅤ    ⿻ ✿ ιηƒσ 木 αтт 性

> ₊· Cσℓσ¢α єℓ єηℓα¢є ∂є Youtube
> ₊· Eᴊᴇᴍᴘʟᴏ: https://youtu.be/M0qv9fTlfdc` },
      footer: { text: '⫏⫏ αℓуα - вσт ✿' },
      nativeFlowMessage: { buttons: [buttons] }
    })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {},
          interactiveMessage
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    return
  }

  let url = text.trim()
  
  if (!url.includes('youtu.be') && !url.includes('youtube.com')) {
    return m.reply(`❌ Link inválido\n\n${usedPrefix + command} https://youtu.be/M0qv9fTlfdc`)
  }

  await m.react('📥')

  try {
    const apiUrl = `https://dvlyonnxz.onrender.com/download/ytaudio?url=${url}`
    
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (!data.status || !data.result) {
      throw new Error('API error')
    }

    const { title, duration, thumbnail, download_url } = data.result
    
    const minutos = Math.floor(duration / 60)
    const segundos = duration % 60
    const duracion = `${minutos}:${segundos.toString().padStart(2, '0')}`

    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

    const thumbPath = path.join(tmpDir, `thumb_${Date.now()}.jpg`)
    const thumbRes = await fetch(thumbnail)
    const thumbBuffer = await thumbRes.buffer()
    fs.writeFileSync(thumbPath, thumbBuffer)

    const media = await conn.prepareWAMessageMedia({ image: fs.readFileSync(thumbPath) }, { upload: conn.waUploadToServer })

    const gameId = m.chat
    descargas[gameId] = {
      url: download_url,
      title: title,
      duracion: duracion
    }

    setTimeout(() => {
      if (descargas[gameId]) delete descargas[gameId]
    }, 60000)

    const buttons = {
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: '🎵 DESCARGA',
        sections: [
          {
            title: '✅ CANCIÓN ENCONTRADA',
            rows: [
              {
                header: '📥 TOCA PARA DESCARGAR',
                title: title.substring(0, 35),
                description: `Duración: ${duracion}`,
                id: `download_${gameId}`
              }
            ]
          }
        ]
      })
    }

    const interactiveMessage = proto.Message.InteractiveMessage.create({
      header: { title: 'αℓуα - ∂σωηℓσα∂єя', subtitle: 'Youtube a Mp3', hasMediaAttachment: true, imageMessage: media.imageMessage },
      body: { text: `ㅤ    ꒰ 🎵 *αℓуα - ∂σωηℓσα∂єя* ⫏⫏ ꒱
ㅤ    ⿻ ✿ ιηƒσ 木 αтт 性

> ₊· *Título:* ${title}
> ₊· *Duración:* ${duracion}
> ₊· *Toca el botón para descargar*` },
      footer: { text: '⫏⫏ αℓуα - вσт ✿' },
      nativeFlowMessage: { buttons: [buttons] }
    })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {},
          interactiveMessage
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    fs.unlinkSync(thumbPath)

  } catch (error) {
    console.log(error)
    m.reply(`❌ Error al procesar el enlace\n\nVerifica que el enlace sea válido`)
  }
}

handler.before = async (m, { conn }) => {
  const nativeFlow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
  if (!nativeFlow) return false

  try {
    const data = JSON.parse(nativeFlow.paramsJson || '{}')
    const id = data.id || data.selectedId || data.selectedRowId || null
    if (!id || !id.startsWith('download_')) return false

    const gameId = id.replace('download_', '')
    const descarga = descargas[gameId]
    
    if (!descarga) {
      await conn.sendMessage(m.chat, { text: `❌ El enlace expiró. Usa *play* nuevamente.` }, { quoted: m })
      return true
    }

    await conn.sendMessage(m.chat, { text: `⏳ *Descargando ${descarga.title}...*` }, { quoted: m })

    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

    const audioPath = path.join(tmpDir, `${Date.now()}.mp3`)
    const audioRes = await fetch(descarga.url)
    const audioBuffer = await audioRes.buffer()
    fs.writeFileSync(audioPath, audioBuffer)

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(audioPath),
      mimetype: 'audio/mpeg',
      fileName: `${descarga.title}.mp3`
    }, { quoted: m })

    fs.unlinkSync(audioPath)
    delete descargas[gameId]
    await m.react('✅')

    return true

  } catch (e) {
    console.error(e)
    return true
  }
}

handler.help = ['ytmp3 <link>']
handler.tags = ['downloader']
handler.command = ['play2', 'ytmp3']

export default handler