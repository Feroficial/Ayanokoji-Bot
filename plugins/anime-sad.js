import fs from 'fs'

let handler = async (m, { conn }) => {
  // Intentar usar GIFs locales primero
  let gifsLocales = [
    "./tmp/sad1.gif",
    "./tmp/sad2.gif",
    "./tmp/sad3.gif"
  ]
  
  let gifsBackup = [
    "https://i.imgur.com/KcYvRw7.gif",
    "https://i.imgur.com/3X4YwzQ.gif",
    "https://i.imgur.com/7YKpG4v.gif"
  ]
  
  let buffer = null
  let randomIndex = Math.floor(Math.random() * 3)
  
  // Verificar si existe el GIF local
  if (fs.existsSync(gifsLocales[randomIndex])) {
    buffer = fs.readFileSync(gifsLocales[randomIndex])
  } else {
    // Usar URL de respaldo
    buffer = { url: gifsBackup[randomIndex] }
  }
  
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