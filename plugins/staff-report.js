let handler = async (m, { conn, text, usedPrefix }) => {
  let ownerNumber1 = '59177474230@s.whatsapp.net'
  let ownerNumber2 = '5219611207992@s.whatsapp.net'
  
  if (!text && !m.quoted) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ 1:* #яєρσят <тєхтσ>
> ₊· ⫏⫏ ㅤ *Uѕσ 2:* Rєѕρση∂є αℓ мєηѕαנє + #яєρσят

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  let reporte = ''
  let usuarioReportado = ''
  let tipo = ''
  
  if (m.quoted) {
    reporte = m.quoted.text || 'Mensaje multimedia (imagen/video/audio)'
    usuarioReportado = m.quoted.sender
    tipo = '📌 *Tipo:* Mensaje reportado'
  } else {
    reporte = text.trim()
    tipo = '📌 *Tipo:* Texto reportado'
  }
  
  let nombreReportado = usuarioReportado ? usuarioReportado.split('@')[0] : 'No especificado'
  let nombreReportante = m.sender.split('@')[0]
  
  let contienePorno = /porno|porn|xxx|desnudo|nude|tetas|culo|penes|vagina|sexo|gore|violacion/i.test(reporte)
  let contieneAcoso = /privado|md|hablar|escribir|molestar|acoso|insulto|amenaza/i.test(reporte)
  
  let tipoAviso = ''
  if (contienePorno) tipoAviso = '🔞 *CONTENIDO +18* 🔞'
  else if (contieneAcoso) tipoAviso = '👤 *POSIBLE ACOSO* 👤'
  else tipoAviso = '⚠️ *REPORTE GENERAL* ⚠️'
  
  let mensajeStaff = `
╭━━━━━━━━━━━━━━━━━━━━╮
┃ 🛡️ *NUEVO REPORTE* 🛡️
┃ 🌸 αℓуα - вσт - ALERTA
╰━━━━━━━━━━━━━━━━━━━━╯

${tipoAviso}

> ₊· ⫏⫏ 👤 *Reportante:* @${nombreReportante}
> ₊· ⫏⫏ 👤 *Reportado:* @${nombreReportado}
> ₊· ⫏⫏ ${tipo}
> ₊· ⫏⫏ 📝 *Detalles:* ${reporte.substring(0, 300)}
> ₊· ⫏⫏ 📅 *Fecha:* ${new Date().toLocaleString()}

ㅤ    ꒰ ㅤ ⚡ ㅤ *ACCIÓN REQUERIDA* ㅤ ⫏⫏  ꒱

> ₊· ⫏⫏ ✅ Revisar el mensaje reportado
> ₊· ⫏⫏ ✅ Tomar capturas de evidencia
> ₊· ⫏⫏ ✅ Aplicar warn o expulsión
> ₊· ⫏⫏ ❌ No ignorar el reporte

ㅤ    ꒰ ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
`

  let mensajeConfirmacion = `
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєρσятє 木 єηνια∂σ ㅤ 性

> ₊· ⫏⫏ 👤 *Reportaste:* ${reporte.substring(0, 100)}${reporte.length > 100 ? '...' : ''}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ 🛡️ El staff revisará tu reporte
  `.trim()

  try {
    await conn.sendMessage(ownerNumber1, { text: mensajeStaff, mentions: [m.sender, usuarioReportado] })
    await conn.sendMessage(ownerNumber2, { text: mensajeStaff, mentions: [m.sender, usuarioReportado] })
    await m.reply(mensajeConfirmacion)
    await m.react('📌')
  } catch (e) {
    console.error(e)
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 яєρσятє ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* No se pudo enviar el reporte

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    await m.react('❌')
  }
}

handler.help = ['report']
handler.tags = ['main']
handler.command = ['report', 'reportar']

export default handler