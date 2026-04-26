import axios from 'axios'
import fs from 'fs'
import path from 'path'

process.env.TMPDIR = path.join(process.cwd(), 'tmp')
if (!fs.existsSync(process.env.TMPDIR)) {
  fs.mkdirSync(process.env.TMPDIR, { recursive: true })
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `*《 🎭  𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <búsqueda>\n➤ *Ejemplo:* ${usedPrefix + command} Kiyotaka Ayanokoji\n\n*"El aula de élite también consume contenido viral"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, m);
    }
    
    m.react('🔍');
    let old = new Date();
    
    let result = await ttks(text);
    let videos = result.data;
    
    if (!videos || !videos.length) {
      return conn.reply(m.chat, `*《 🎭  𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ ❌ No se encontraron videos para "${text}".\n\n*"La búsqueda no dio resultados"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, m);
    }

    let cap = `*《 🎭  𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n`
            + `🎬 *Título:* ${videos[0].title}\n`
            + `🔎 *Búsqueda:* ${text}\n`
            + `📊 *Resultados:* ${videos.length} videos\n`
            + `⏱️ *Tiempo:* ${((new Date() - old))} ms\n\n`
            + `*"Contenido extraído del aula viral"*\n`
            + `*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`;

    let medias = videos.map((video, index) => ({
      type: "video",
      data: { url: video.no_wm },
      caption: index === 0
        ? cap
        : `*《 🎭  𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n` +
          `🎬 *Título:* ${video.title}\n` +
          `📊 *Resultado:* ${index + 1} de ${videos.length}\n\n` +
          `*"El aula de élite sigue explorando"*\n` +
          `*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
    }));

    await conn.sendSylphy(m.chat, medias, { quoted: m });
    m.react('✅');
    
  } catch (e) {
    console.error('Error en handler:', e);
    return conn.reply(m.chat, `*《 🎭  𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇  🗡️ 》*\n\n➤ ❌ Error: ${e.message || e}\n\n*"El sistema ha fallado"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, m);
  }
};

handler.command = ["ttsearch", "tiktoksearch", "tts", "tiktok"];
handler.help = ["tiktoksearch"];
handler.tags = ["downloader"];
handler.register = true

export default handler;

async function ttks(query) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api-gohan.onrender.com/busqueda/tiktok',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: new URLSearchParams({
        keywords: query,
        count: 20,
        cursor: 0,
        HD: 1
      }).toString()
    });

    if (!response.data || !response.data.data || !response.data.data.videos) {
      throw new Error("La API no devolvió datos válidos");
    }

    const videos = response.data.data.videos;
    
    if (!videos || videos.length === 0) {
      throw new Error("⚠️ No se encontraron videos para esa búsqueda.");
    }

    const shuffled = [...videos].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    return {
      status: true,
      creator: "KIYOTAKA AYANOKOJI",
      data: shuffled.map(video => ({
        title: video.title || 'Sin título',
        no_wm: video.play,
        watermark: video.wmplay,
        music: video.music,
        duration: video.duration,
        author: video.author,
        views: video.play_count
      }))
    };
    
  } catch (error) {
    console.error('Error en ttks:', error);
    throw new Error(`Error en la API de búsqueda: ${error.message}`);
  }
}