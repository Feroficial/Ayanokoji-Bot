import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐄𝐍𝐕𝐈𝐀𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre del paquete>\n➤ *Ejemplo:* ${usedPrefix + command} Kiyotaka Pack\n\n*"Envía todos los stickers de un paquete"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let user = global.db.data.users[m.sender]
  if (!user.stickerPacks || !user.stickerPacks[text]) {
    return m.reply(`❌ El paquete "${text}" no existe`);
  }

  let pack = user.stickerPacks[text]
  
  if (pack.stickers.length === 0) {
    return m.reply(`❌ El paquete "${text}" no tiene stickers`);
  }

  await m.reply(`*《 🎭  𝐄𝐍𝐕𝐈𝐀𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ 📦 Enviando ${pack.stickers.length} stickers de "${text}"...\n\n*"El aula de élite comparte su colección"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  for (let stickerData of pack.stickers) {
    let stickerBuffer = Buffer.from(stickerData.data, 'base64')
    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

handler.help = ['sendpack <nombre>']
handler.tags = ['sticker']
handler.command = /^(sendpack|enviarpack)$/i

export default handler