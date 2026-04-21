let handler = async (m, { conn, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user.stickerPacks || Object.keys(user.stickerPacks).length === 0) {
    return m.reply(`*《 🎭  𝐕𝐄𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄𝐒  🗡️ 》*\n\n➤ ❌ No tienes paquetes creados\n➤ 📌 Crea uno con: ${usedPrefix}createpack <nombre>\n\n*"El aula de élite comienza su colección"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  let texto = `*《 🎭  𝐕𝐄𝐑 𝐏𝐀𝐐𝐔𝐄𝐓𝐄𝐒  🗡️ 》*\n\n`
  
  let count = 1
  for (let [nombre, pack] of Object.entries(user.stickerPacks)) {
    texto += `➤ ${count}. 📦 *${nombre}*\n`
    texto += `   🔖 Stickers: ${pack.stickers.length}\n`
    texto += `   🕒 Creado: ${new Date(pack.created).toLocaleDateString()}\n\n`
    count++
  }
  
  texto += `*"Colecciona stickers del aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;

  m.reply(texto);
}

handler.help = ['verpaquetes']
handler.tags = ['sticker']
handler.command = /^(verpaquetes|mispacks|paquetes|listpacks)$/i

export default handler;