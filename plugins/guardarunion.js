let handler = async (m, { conn, text, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) return m.reply('🌸 Solo la creadora puede usar este comando')
  
  if (!text) return m.reply(`🌸 *Guardar Unión* 🌸\n\n> 🎀 Usa: #guardarunion nombre1|nombre2|frase\n> 💗 Ejemplo: #guardarunion Lyonn|Danny Yulieth|Hicimos un bot juntos`)
  
  let [nombre1, nombre2, frase] = text.split('|')
  if (!nombre1 || !nombre2 || !frase) return m.reply('🌸 Formato incorrecto. Usa: nombre1|nombre2|frase')
  
  global.db.data.union = {
    nombre1: nombre1.trim(),
    nombre2: nombre2.trim(),
    frase: frase.trim(),
    fecha: new Date().toISOString().split('T')[0],
    bot: 'Ania Bot'
  }
  
  await global.db.write()
  m.reply(`🌸 *Unión guardada* 🌸\n\n> 🎭 ${nombre1} 🤍 ${nombre2}\n> 💗 "${frase}"\n> 📅 Desde hoy\n\n🌸 *"Quedará para siempre"* 🌸`)
}

handler.help = ['guardarunion <nombre1|nombre2|frase>']
handler.tags = ['owner']
handler.command = ['guardarunion']
handler.owner = true

export default handler