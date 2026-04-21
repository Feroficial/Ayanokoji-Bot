let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐂𝐑𝐄𝐀𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre del paquete>\n➤ *Ejemplo:* ${usedPrefix + command} Kiyotaka Pack\n\n*"Crea un nuevo paquete de stickers"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let user = global.db.data.users[m.sender]
  if (!user.stickerPacks) user.stickerPacks = {}
  
  if (user.stickerPacks[text]) {
    return m.reply(`*《 🎭  𝐂𝐑𝐄𝐀𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ ❌ El paquete "${text}" ya existe\n\n*"Usa otro nombre"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  user.stickerPacks[text] = {
    name: text,
    stickers: [],
    created: Date.now()
  }

  m.reply(`*《 🎭  𝐂𝐑𝐄𝐀𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ ✅ Paquete "${text}" creado\n➤ 📌 Ahora responde a stickers con #packadd ${text} para agregarlos\n\n*"El aula de élite colecciona stickers"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
}

handler.help = ['createpack <nombre>']
handler.tags = ['sticker']
handler.command = /^(createpack|nuevopack|crearpaquete)$/i

export default handler