import fs from 'fs'

let handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: '🎲', key: m.key } })

  let user = global.db.data.users[m.sender]
  let data = JSON.parse(fs.readFileSync('./gacha.json'))
  let personajes = data.personajes

  let totalProb = 0
  for (let p of personajes) totalProb += p.probabilidad

  let random = Math.random() * totalProb
  let acumulado = 0
  let obtenido = null

  for (let p of personajes) {
    acumulado += p.probabilidad
    if (random < acumulado) {
      obtenido = p
      break
    }
  }

  if (!user.inventario) user.inventario = []
  user.inventario.push(obtenido.nombre)

  let emoji = obtenido.rareza === 'EX' ? '👑' : obtenido.rareza === 'SSR' ? '✨' : obtenido.rareza === 'SR' ? '⭐' : '⬜'

  let texto = `*《 🐉  𝐆𝐀𝐂𝐇𝐀  🗡️ 》*

${emoji} *¡Obtuviste!* ${obtenido.nombre}
🎴 *Rareza:* ${obtenido.rareza}
🎲 *Probabilidad:* ${obtenido.probabilidad}%

➤ Usa #inventario para ver tus personajes

*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  if (obtenido.imagen) {
    await conn.sendMessage(m.chat, { image: { url: obtenido.imagen }, caption: texto })
  } else {
    m.reply(texto)
  }
}

handler.help = ['claim']
handler.tags = ['gacha']
handler.command = /^(gacha|tirar|c)$/i
export default handler