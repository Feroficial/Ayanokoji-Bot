
  import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <búsqueda>\n➤ *Ejemplo:* ${usedPrefix + command} Kiyotaka Ayanokoji\n\n*"El aula de élite encuentra inspiración visual"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  await m.react('🔍');

  try {
    let apiUrl = `https://api.agatz.xyz/api/pinterest?query=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);
    let data = await res.json();

    if (!data.status || !data.data || data.data.length === 0) {
      return m.reply(`*《 🎭  𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓  🗡️ 》*\n\n➤ ❌ No se encontraron imágenes para "${text}".\n\n*"La búsqueda no dio resultados"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    }

    let images = data.data;
    let randomImage = images[Math.floor(Math.random() * images.length)];

    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: `*《 🎭  𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓  🗡️ 》*\n\n🎨 *Búsqueda:* ${text}\n\n*"Imagen extraída del aula visual"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    m.reply(`*《 🎭  𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓  🗡️ 》*\n\n➤ ❌ Error: ${e.message}\n\n*"El sistema ha fallado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    await m.react('❌');
  }
};

handler.help = ['pinterest <búsqueda>'];
handler.tags = ['downloader'];
handler.command = /^(pinterest|pin|pint)$/i;

export default handler;