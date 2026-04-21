import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let quoted = m.quoted ? m.quoted : m
  let mime = quoted.mediaType || 'image'
  
  if (!quoted.msg && !/image|video/.test(mime)) {
    return m.reply(`*《 🎭  𝐒𝐓𝐈𝐂𝐊𝐄𝐑  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <responde a una imagen o video>\n➤ *Ejemplo:* Responde a una foto con ${usedPrefix + command}\n\n*"Convierte imágenes y videos en stickers del aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  await m.react('🎭');

  try {
    let media = await quoted.download()
    let stickerBuffer = await sticker(media, false, global.packname, global.author)
    
    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
    await m.react('✅')
  } catch (e) {
    console.error(e)
    m.reply(`*《 🎭  𝐒𝐓𝐈𝐂𝐊𝐄𝐑  🗡️ 》*\n\n➤ ❌ Error al crear el sticker: ${e.message}\n\n*"El sistema ha fallado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    await m.react('❌');
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(sticker|s|stiker)$/i

export default handler