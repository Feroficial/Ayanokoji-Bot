import axios from 'axios';
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Chrome)';

const INVICIOUS_INSTANCES = [
    'https://invidious.snopyta.org',
    'https://yewtu.be',
    'https://inv.riverside.rocks',
    'https://invidious.flokinet.to',
    'https://inv.zzls.xyz'
];

async function ytSearch(query, limit = 5) {
    for (const instance of INVICIOUS_INSTANCES) {
        try {
            const url = `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
            const response = await axios.get(url, { headers: { 'User-Agent': USER_AGENT }, timeout: 10000 });
            const results = response.data.slice(0, limit);
            if (results.length === 0) continue;
            return results.map(video => ({
                id: video.videoId,
                titulo: video.title || "Sin título",
                canal: video.author || "Desconocido",
                url: `https://www.youtube.com/watch?v=${video.videoId}`,
                duracion: video.lengthSeconds ? `${Math.floor(video.lengthSeconds / 60)}:${(video.lengthSeconds % 60).toString().padStart(2, '0')}` : "?",
                vistas: video.viewCount ? video.viewCount.toLocaleString() : "N/A",
                miniatura: video.videoThumbnails?.[3]?.url || ""
            }));
        } catch (error) {
            console.log(`Instancia ${instance} falló, probando siguiente...`);
        }
    }
    return [];
}

async function downloadMP3(videoUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const stream = ytdl(videoUrl, {
            quality: 'lowestaudio',
            filter: 'audioonly',
            requestOptions: { headers: { 'User-Agent': USER_AGENT } }
        });
        const writeStream = fs.createWriteStream(outputPath);
        stream.pipe(writeStream);
        writeStream.on('finish', () => resolve(outputPath));
        writeStream.on('error', reject);
        stream.on('error', reject);
    });
}

async function downloadMP4(videoUrl, outputPath, quality = '18') {
    return new Promise((resolve, reject) => {
        const stream = ytdl(videoUrl, {
            quality: quality,
            requestOptions: { headers: { 'User-Agent': USER_AGENT } }
        });
        const writeStream = fs.createWriteStream(outputPath);
        stream.pipe(writeStream);
        writeStream.on('finish', () => resolve(outputPath));
        writeStream.on('error', reject);
        stream.on('error', reject);
    });
}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return m.reply(`🌸 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐌𝐄𝐍𝐔 ✧ —* 🌸\n\n> 🎀 ${usedPrefix}yt <búsqueda> - Buscar videos\n> 💗 ${usedPrefix}ytmp3 <url> - Descargar audio\n> ✨ ${usedPrefix}ytmp4 <url> - Descargar video\n\n🌸 *Creador: Lyonn* 🌸`);

    if (command === 'yt') {
        await m.react('🔍');
        await m.reply('🌸 Buscando... esto puede tomar unos segundos');
        const results = await ytSearch(text, 5);
        if (results.length === 0) return m.reply('🌸 No se encontraron resultados. Intenta con otra palabra clave.');
        let txt = `🌸 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 ✧ —* 🌸\n\n`;
        results.forEach((v, i) => {
            txt += `> 🎀 *${i + 1}.* ${v.titulo}\n> 💗 ${v.canal} | ⏱️ ${v.duracion} | 👁️ ${v.vistas}\n> 🔗 ${v.url}\n\n`;
        });
        txt += `🌸 *Creador: Lyonn* 🌸`;
        await m.reply(txt);
        await m.react('✅');
        return;
    }

    if (command === 'ytmp3') {
        await m.react('🎵');
        let url = text;
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return m.reply('🌸 Enlace de YouTube válido\nEjemplo: #ytmp3 https://youtu.be/dQw4w9WgXcQ');
        }
        await m.reply('🌸 Descargando audio... un momento');
        const tempPath = path.join(__dirname, `../temp_${Date.now()}.mp3`);
        try {
            await downloadMP3(url, tempPath);
            await conn.sendMessage(m.chat, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mpeg' }, { quoted: m });
            fs.unlinkSync(tempPath);
            await m.react('✅');
        } catch (e) {
            m.reply(`❌ Error al descargar: ${e.message}`);
        }
        return;
    }

    if (command === 'ytmp4') {
        await m.react('🎬');
        let url = text;
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return m.reply('🌸 Enlace de YouTube válido\nEjemplo: #ytmp4 https://youtu.be/dQw4w9WgXcQ');
        }
        await m.reply('🌸 Descargando video... un momento');
        const tempPath = path.join(__dirname, `../temp_${Date.now()}.mp4`);
        try {
            await downloadMP4(url, tempPath);
            await conn.sendMessage(m.chat, { video: fs.readFileSync(tempPath), caption: '🌸 Video descargado por Lyonn' }, { quoted: m });
            fs.unlinkSync(tempPath);
            await m.react('✅');
        } catch (e) {
            m.reply(`❌ Error al descargar: ${e.message}`);
        }
        return;
    }
}

handler.help = ['yt <búsqueda>', 'ytmp3 <url>', 'ytmp4 <url>'];
handler.tags = ['downloader'];
handler.command = ['yt', 'ytmp3', 'ytmp4'];

export default handler;