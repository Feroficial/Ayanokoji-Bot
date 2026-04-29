import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('dbyulieth.xo.je/union.json')
    let data = await res.json()
    
    let texto = `
🌸 *Unión Lyonn & Yulieth* 🌸

> 🎭 *${data.nombre1}* 🤍 *${data.nombre2}*
> 💗 *Frase:* "${data.frase}"
> 📅 *Desde:* ${data.fecha}
> 🤖 *Bot:* ${data.bot}

🌸 *"Esto no se borra con el tiempo"* 🌸
    `.trim()
    
    await m.reply(texto)
  } catch (error) {
    console.error(error)
    await m.reply(`🌸 *Error al cargar la unión* 🌸\n> 💗 ${error.message}`)
  }
}

handler.command = ['union']
handler.help = ['union']
handler.tags = ['main']

export default handler