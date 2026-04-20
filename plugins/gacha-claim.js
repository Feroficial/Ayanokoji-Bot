let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: '🔖', key: m.key } })

  if (!text) return m.reply(`*《 🐉  𝐂𝐋𝐀𝐈𝐌  🗡️ 》*\n\n➤ Uso: #claim <nombre>\n➤ Ejemplo: #claim Kiyotaka\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)

  let user = global.db.data.users[m.sender]
  let fs = require('fs')
  let data = JSON.parse(fs.readFileSync('./gacha.json'))
  let personajesMap = {}
  for (let p of data.personajes) {
    personajesMap[p.nombre.toLowerCase()] = p
  }

  let encontrado = null
  let nombreOriginal = null

  for (let [nombreCompleto, info] of Object.entries(personajesMap)) {
    if (nombreCompleto.toLowerCase().includes(text.toLowerCase())) {
      encontrado = info
      nombreOriginal = nombreCompleto
      break
    }
  }

  if (!encontrado) {
    return m.reply(`*《 🐉  𝐂𝐋𝐀𝐈𝐌  🗡️ 》*\n\n➤ Personaje no encontrado\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  if (!user.inventario || !user.inventario.includes(nombreOriginal)) {
    return m.reply(`*《 🐉  𝐂𝐋𝐀𝐈𝐌  🗡️ 》*\n\n➤ No tienes a ${nombreOriginal} en tu inventario\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let emoji = encontrado.rareza === 'EX' ? '👑' : encontrado.rareza === 'SSR' ? '✨' : encontrado.rareza === 'SR' ? '⭐' : '⬜'

  let texto = `*《 🐉  𝐂𝐋𝐀𝐈𝐌  🗡️ 》*

${emoji} *¡Has reclamado a ${nombreOriginal}!*
🎴 *Rareza:* ${encontrado.rareza}
🎲 *Probabilidad:* ${encontrado.probabilidad}%

*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  if (encontrado.imagen) {
    await conn.sendMessage(m.chat, { image: { url: encontrado.imagen }, caption: texto })
  } else {
    m.reply(texto)
  }
}

handler.help = ['claim']
handler.tags = ['gacha']
handler.command = /^(claim|reclamar)$/i
export default handler