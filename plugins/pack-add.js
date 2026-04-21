import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐀𝐆𝐑𝐄𝐆𝐀𝐑 𝐀 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre del paquete>\n➤ *Ejemplo:* ${usedPrefix + command} Kiyotaka Pack\n\n*"Responde a un sticker o imagen para agregarlo al paquete"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let user = global.db.data.users[m.sender]
  if (!user.stickerPacks) user.stickerPacks = {}
  
  if (!user.stickerPacks[text]) {
    return m.reply(`*《 🎭  𝐀𝐆𝐑𝐄𝐆𝐀𝐑 𝐀 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ ❌ El paquete "${text}" no existe\n➤ 📌 Crea el paquete con: ${usedPrefix}createpack ${text}\n\n*"Primero crea el paquete"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  let quoted = m.quoted ? m.quoted : m
  let mime = quoted.mediaType || 'image'

  if (!/image|video|sticker/.test(mime)) {
    return m.reply(`❌ Responde a una imagen, video o sticker`);
  }

  await m.react('🎭');

  try {
    let media = await quoted.download()
    let stickerBuffer = await sticker(media, false, text, 'Kiyotaka Ayanokoji')
    
    // Guardar el sticker en el paquete
    let stickerId = Date.now()
    user.stickerPacks[text].stickers.push({
      id: stickerId,
      data: stickerBuffer.toString('base64'),
      added: Date.now()
    })

    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
    await m.reply(`*《 🎭  𝐀𝐆𝐑𝐄𝐆𝐀𝐑 𝐀 𝐏𝐀𝐐𝐔𝐄𝐓𝐄  🗡️ 》*\n\n➤ ✅ Sticker agregado al paquete "${text}"\n➤ 📌 Total: ${user.stickerPacks[text].stickers.length} stickers\n\n*"El aula de élite colecciona stickers"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    
    await m.react('✅')
  } catch (e) {
    console.error(e)
    m.reply(`❌ Error: ${e.message}`);
    await m.react('❌');
  }
}

handler.help = ['packadd <nombre>']
handler.tags = ['sticker']
handler.command = /^(packadd|agregarstick|addsticker)$/i

export default handler