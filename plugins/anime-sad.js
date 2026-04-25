let handler = async (m, { conn }) => {
  let gifs = [
    "https://media.tenor.com/-Kw6P1jJqcoAAAAC/anime-sad.gif",
    "https://media.tenor.com/oB8UuNuYfZQAAAAC/sad-anime.gif",
    "https://media.tenor.com/YpHw7QV6hbMAAAAC/anime-cry.gif"
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