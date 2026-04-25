import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let gifs = [
    "https://files.catbox.moe/5cm82n.gif",
    "https://files.catbox.moe/t79ulr.gif",
    "https://files.catbox.moe/mvpkmn.gif"
  ]
  
  let randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  
  // Descargar el GIF
  let res = await fetch(randomGif)
  let buffer = await res.buffer()
  
  let respuesta = `
> *•───⧼⧼⧼ 𝙰𝙽𝙸𝙼𝙴 𝚂𝙰𝙳 ⧽⧽⧽───•*

> *😔 @${m.sender.split('@')[0]} está triste...*

> *"Hasta el aula de élite tiene momentos de oscuridad"*

> *•───────────────•*
`

  await conn.sendMessage(m.chat, {
    video: buffer,
    gifPlayback: true,
    caption: respuesta,
    mentions: [m.sender]
  })
}

handler.help = ["sad"]
handler.tags = ["anime"]
handler.command = ["sad", "triste", "depre"]

export default handler