import fs from 'fs'

let handler = async (m, { conn }) => {
  let gifs = [
    "./tmp/sad1.gif",
    "./tmp/sad2.gif",
    "./tmp/sad3.gif"
  ]
  let randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  let buffer = fs.readFileSync(randomGif)
  
  let respuesta = `> *•───⧼⧼⧼ 𝙰𝙽𝙸𝙼𝙴 𝚂𝙰𝙳 ⧽⧽⧽───•*\n\n> *😔 @${m.sender.split('@')[0]} está triste...*\n\n> *"Hasta el aula de élite tiene momentos de oscuridad"*\n\n> *•───────────────•*`
  
  await conn.sendMessage(m.chat, {
    video: buffer,
    gifPlayback: true,
    caption: respuesta,
    mentions: [m.sender]
  })
}

handler.help = ['sad']
handler.tags = ['anime']
handler.command = ['sad', 'triste', 'depre']

export default handler