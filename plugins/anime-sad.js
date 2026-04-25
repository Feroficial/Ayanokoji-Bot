let handler = async (m, { conn, usedPrefix, command }) => {
  let user = m.sender
  let name = await conn.getName(user)
  
  let gifs = [
    "https://files.catbox.moe/5cm82n.gif",
    "https://files.catbox.moe/t79ulr.gif",
    "https://files.catbox.moe/mvpkmn.gif"
  ]
  
  let randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  
  let respuesta = `
> *•───⧼⧼⧼ 𝙰𝙽𝙸𝙼𝙴 𝚂𝙰𝙳 ⧽⧽⧽───•*

> *😔 @${m.sender.split('@')[0]} está triste...*

> *"Hasta el aula de élite tiene momentos de oscuridad"*

> *•───────────────•*
`

  await conn.sendMessage(m.chat, {
    video: { url: randomGif },
    gifPlayback: true,
    caption: respuesta,
    mentions: [user]
  })
}

handler.help = ["sad"]
handler.tags = ["anime"]
handler.command = ["sad", "triste", "depre"]

export default handler