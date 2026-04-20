let handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: '📦', key: m.key } })

  let user = global.db.data.users[m.sender]
  let fs = require('fs')
  let data = JSON.parse(fs.readFileSync('./gacha.json'))
  let personajesMap = {}
  for (let p of data.personajes) {
    personajesMap[p.nombre] = p
  }

  if (!user.inventario || user.inventario.length === 0) {
    return m.reply(`*《 🐉  𝐈𝐍𝐕𝐄𝐍𝐓𝐀𝐑𝐈𝐎  🗡️ 》*\n\n➤ No tienes personajes aún\n➤ Usa #gacha para obtener uno\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`)
  }

  let lista = {}
  for (let item of user.inventario) {
    lista[item] = (lista[item] || 0) + 1
  }

  let texto = `*《 🐉  𝐈𝐍𝐕𝐄𝐍𝐓𝐀𝐑𝐈𝐎  🗡️ 》*\n\n`
  for (let [nombre, cantidad] of Object.entries(lista)) {
    let info = personajesMap[nombre]
    let emoji = info ? (info.rareza === 'EX' ? '👑' : info.rareza === 'SSR' ? '✨' : info.rareza === 'SR' ? '⭐' : '⬜') : '⬜'
    texto += `➤ ${emoji} ${nombre} x${cantidad}\n`
  }
  texto += `\n➤ Usa #claim <nombre> para reclamar un personaje\n\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  m.reply(texto)
}

handler.help = ['inventario']
handler.tags = ['gacha']
handler.command = /^(inventario|personajes)$/i
export default handler