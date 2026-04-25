let handler = async (m, { conn }) => {
  let gifs = [
    "https://i.imgur.com/KcYvRw7.gif",
    "https://i.imgur.com/3X4YwzQ.gif",
    "https://i.imgur.com/7YKpG4v.gif"
  ]
  let randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  
  let respuesta = `> *•───⧼⧼⧼ 𝙰𝙽𝙸𝙼𝙴 𝚂𝙰𝙳 ⧽⧽⧽───•*\n\n> *😔 @${m.sender.split('@')[0]} está triste...*\n\n> *"Hasta el aula de élite tiene momentos de oscuridad"*\n\n> *•───────────────•*`
  
  await conn.sendMessage(m.chat, {
    video: { url: randomGif },
    gifPlayback: true,
    caption: respuesta,
    mentions: [m.sender]
  })
}

handler.help = ['sad']
handler.tags = ['anime']
handler.command = ['sad', 'triste', 'depre']

export default handler