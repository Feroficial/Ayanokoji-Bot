let handler = async (m, { conn }) => {
  let union = global.db.data.union || {}
  
  if (!union.nombre1 || !union.nombre2) {
    return m.reply(`🌸 *Unión no registrada* 🌸\n\n> 💗 La creadora aún no ha guardado la unión.\n> 🎀 Usa #guardarunion para crearla.`)
  }
  
  let texto = `
🌸 *Unión Lyonn & Yulieth* 🌸

> 🎭 *${union.nombre1}* ❤️ *${union.nombre2}*
> 💗 *Frase:* "${union.frase}"
> 📅 *Desde:* ${union.fecha}
> 🤖 *Bot:* ${union.bot || 'Ania Bot'}

🌸 *"Esto no se borra con el tiempo"* 🌸
  `.trim()
  
  await m.reply(texto)
}

handler.help = ['union']
handler.tags = ['main']
handler.command = ['union']

export default handler