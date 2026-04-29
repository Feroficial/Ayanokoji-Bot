let handler = async (m, { conn }) => {
  let data = {
    nombre1: "Lyonn",
    nombre2: "Danny Yulieth",
    frase: "Hicimos un bot, pero construimos un recuerdo",
    fecha: "2026-04-26",
    bot: "Ania Bot"
  }
  
  let texto = `
🌸 *Unión Lyonn & Yulieth* 🌸

> 🎭 *${data.nombre1}* 🤍 *${data.nombre2}*
> 💗 *Frase:* "${data.frase}"
> 📅 *Desde:* ${data.fecha}
> 🤖 *Bot:* ${data.bot}

🌸 *"Esto no se borra con el tiempo"* 🌸
  `.trim()
  
  await m.reply(texto)
}

handler.command = ['union']
handler.help = ['union']
handler.tags = ['main']

export default handler