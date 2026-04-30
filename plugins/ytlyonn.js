import axios from 'axios';
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
ffmpeg.setFfmpegPath(ffmpegStatic);

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Chrome, like Gecko)';

// ========== 1. FALLBACK: BÚSQUEDA POR SCRAPING DIRECTO (sin Invidious) ==========
async function ytSearchDirect(query, limit = 8) {
    try {
        // Usamos la API pública de invidious pero con múltiples instancias actualizadas
        const instances = [
            'https://invidious.io.lol',
            'https://inv.vern.cc',
            'https://invidious.privacydev.net',
            'https://inv.skymods.cc',
            'https://invidious.nerdvpn.de'
        ];
        
        for (const instance of instances) {
            try {
                const url = `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
                const response = await axios.get(url, {
                    headers: { 
                        'User-Agent': USER_AGENT,
                        'Accept': 'application/json'
                    },
                    timeout: 10000
                });
                
                if (response.data && response.data.length > 0) {
                    const results = response.data.slice(0, limit);
                    return results.map(video => ({
                        id: video.videoId,
                        titulo: video.title || "Sin título",
                        canal: video.author || "Desconocido",
                        url: `https://www.youtube.com/watch?v=${video.videoId}`,
                        duracion: video.lengthSeconds ? `${Math.floor(video.lengthSeconds / 60)}:${(video.lengthSeconds % 60).toString().padStart(2, '0')}` : "?",
                        vistas: video.viewCount ? video.viewCount.toLocaleString() : "N/A",
                        miniatura: video.videoThumbnails?.[3]?.url || ""
                    }));
                }
            } catch (e) {
                continue;
            }
        }
        
        // Si todo falla, usar búsqueda simulada pero con resultados reales de YouTube via RSS
        return await ytSearchRSS(query, limit);
    } catch (error) {
        console.log("Error en búsqueda:", error.message);
        return [];
    }
}

// ========== 2. SCRAPING VIA RSS FEED (alternativa confiable) ==========
async function ytSearchRSS(query, limit = 8) {
    try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?q=${encodeURIComponent(query)}`;
        const response = await axios.get(rssUrl, {
            headers: { 'User-Agent': USER_AGENT },
            timeout: 10000
        });
        
        // Parsear RSS manualmente (extraer IDs)
        const videoIds = [];
        const idRegex = /watch\?v=([a-zA-Z0-9_-]{11})/g;
        let match;
        while ((match = idRegex.exec(response.data)) !== null && videoIds.length < limit) {
            if (!videoIds.includes(match[1])) {
                videoIds.push(match[1]);
            }
        }
        
        const results = [];
        for (const id of videoIds) {
            try {
                const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`, {
                    requestOptions: { headers: { 'User-Agent': USER_AGENT } }
                });
                results.push({
                    id: id,
                    titulo: info.videoDetails.title,
                    canal: info.videoDetails.author.name,
                    url: `https://www.youtube.com/watch?v=${id}`,
                    duracion: `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${(info.videoDetails.lengthSeconds % 60).toString().padStart(2, '0')}`,
                    vistas: info.videoDetails.viewCount?.toLocaleString() || "N/A",
                    miniatura: info.videoDetails.thumbnails?.[0]?.url || ""
                });
            } catch (e) {
                continue;
            }
        }
        
        return results;
    } catch (error) {
        console.log("Error en RSS:", error.message);
        return [];
    }
}

// ========== 3. VERSIÓN CORREGIDA DE DOWNLOAD MP3 ==========
async function downloadMP3Fix(videoUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const stream = ytdl(videoUrl, {
            quality: 'lowestaudio',
            filter: 'audioonly',
            requestOptions: {
                headers: {
                    'User-Agent': USER_AGENT,
                    'Accept-Language': 'es-ES,es;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br'
                }
            }
        });
        
        const writeStream = fs.createWriteStream(outputPath);
        
        stream.on('error', (err) => {
            console.error("Error en stream:", err);
            reject(new Error(`Error al descargar: ${err.message}`));
        });
        
        writeStream.on('error', (err) => reject(err));
        writeStream.on('finish', () => resolve(outputPath));
        
        stream.pipe(writeStream);
    });
}

// ========== 4. VERSIÓN CORREGIDA DE DOWNLOAD MP4 ==========
async function downloadMP4Fix(videoUrl, outputPath, quality = '18') {
    return new Promise((resolve, reject) => {
        const stream = ytdl(videoUrl, {
            quality: quality,
            requestOptions: {
                headers: {
                    'User-Agent': USER_AGENT,
                    'Accept-Language': 'es-ES,es;q=0.9'
                }
            }
        });
        
        const writeStream = fs.createWriteStream(outputPath);
        
        stream.on('error', (err) => {
            console.error("Error en stream MP4:", err);
            reject(new Error(`Error al descargar video: ${err.message}`));
        });
        
        writeStream.on('error', (err) => reject(err));
        writeStream.on('finish', () => resolve(outputPath));
        
        stream.pipe(writeStream);
    });
}

// ========== 5. OBTENER INFO CORREGIDO ==========
async function getVideoInfoFix(videoUrl) {
    try {
        const info = await ytdl.getInfo(videoUrl, {
            requestOptions: { headers: { 'User-Agent': USER_AGENT } }
        });
        
        return {
            titulo: info.videoDetails.title,
            duracion: info.videoDetails.lengthSeconds,
            canal: info.videoDetails.author.name,
            miniaturas: info.videoDetails.thumbnails,
            url: videoUrl
        };
    } catch (error) {
        throw new Error(`Error obteniendo info: ${error.message}`);
    }
}

// ========== 6. HANDLER PRINCIPAL CORREGIDO ==========
let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) {
        return m.reply(`🌸 *— ✧ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐌𝐄𝐍𝐔 ✧ —* 🌸\n\n` +
            `> 🎀 *${usedPrefix}yt* <búsqueda> - Buscar videos\n` +
            `> 💗 *${usedPrefix}ytmp3* <url> - Descargar audio\n` +
            `> ✨ *${usedPrefix}ytmp4* <url> - Descargar video\n` +
            `> 🌸 *${usedPrefix}ytinfo* <url> - Info del video\n\n` +
            `🌸 *Creador: Lyonn* 🌸`);
    }

    // Comando YT - Buscar
    if (command === 'yt') {
        await m.react('🔍');
        await m.reply('🌸 *Buscando videos...* esto puede tomar unos segundos');
        
        try {
            const results = await ytSearchDirect(text, 6);
            
            if (!results || results.length === 0) {
                return m.reply('🌸 No se encontraron resultados. Intenta con otra palabra clave.');
            }
            
            let txt = `🌸 *— ✧ 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 (${results.length}) ✧ —* 🌸\n\n`;
            results.forEach((v, i) => {
                txt += `> 🎀 *${i + 1}.* ${v.titulo.substring(0, 50)}${v.titulo.length > 50 ? '...' : ''}\n`;
                txt += `> 💗 *Canal:* ${v.canal}\n`;
                txt += `> ⏱️ *Duración:* ${v.duracion} | 👁️ *Vistas:* ${v.vistas}\n`;
                txt += `> 🔗 ${v.url}\n\n`;
            });
            txt += `🌸 *Usa #ytmp3 + link para descargar audio* 🌸\n`;
            txt += `🌸 *Creador: Lyonn* 🌸`;
            
            await m.reply(txt);
            await m.react('✅');
        } catch (error) {
            console.error("Error en búsqueda:", error);
            await m.reply('❌ Error en la búsqueda. Intenta de nuevo más tarde.');
            await m.react('❌');
        }
        return;
    }

    // Comando YTMP3 - Descargar audio
    if (command === 'ytmp3') {
        await m.react('🎵');
        
        let url = text.trim();
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return m.reply('🌸 *Enlace de YouTube válido*\nEjemplo: #ytmp3 https://youtu.be/dQw4w9WgXcQ');
        }
        
        await m.reply('🎵 *Descargando audio...* un momento por favor');
        
        const tempPath = path.join(__dirname, `../temp_audio_${Date.now()}.mp3`);
        
        try {
            await downloadMP3Fix(url, tempPath);
            
            const audioBuffer = fs.readFileSync(tempPath);
            await conn.sendMessage(m.chat, { 
                audio: audioBuffer, 
                mimetype: 'audio/mpeg',
                fileName: 'audio.mp3'
            }, { quoted: m });
            
            fs.unlinkSync(tempPath);
            await m.react('✅');
            await m.reply('🎵 *Audio enviado* | Creador: Lyonn');
        } catch (e) {
            console.error("Error MP3:", e);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            await m.reply(`❌ *Error al descargar:* ${e.message}\nIntenta con otro video.`);
            await m.react('❌');
        }
        return;
    }

    // Comando YTMP4 - Descargar video
    if (command === 'ytmp4') {
        await m.react('🎬');
        
        let url = text.trim();
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return m.reply('🌸 *Enlace de YouTube válido*\nEjemplo: #ytmp4 https://youtu.be/dQw4w9WgXcQ');
        }
        
        await m.reply('🎬 *Descargando video...* puede tomar varios segundos');
        
        const tempPath = path.join(__dirname, `../temp_video_${Date.now()}.mp4`);
        
        try {
            await downloadMP4Fix(url, tempPath, '18');
            
            const videoBuffer = fs.readFileSync(tempPath);
            await conn.sendMessage(m.chat, { 
                video: videoBuffer, 
                caption: '🎬 *Video descargado por Lyonn*',
                fileName: 'video.mp4'
            }, { quoted: m });
            
            fs.unlinkSync(tempPath);
            await m.react('✅');
        } catch (e) {
            console.error("Error MP4:", e);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            await m.reply(`❌ *Error al descargar:* ${e.message}`);
            await m.react('❌');
        }
        return;
    }

    // Comando YTINFO - Información
    if (command === 'ytinfo') {
        await m.react('📄');
        
        let url = text.trim();
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return m.reply('🌸 *Enlace de YouTube válido*\nEjemplo: #ytinfo https://youtu.be/dQw4w9WgXcQ');
        }
        
        try {
            const info = await getVideoInfoFix(url);
            const minutos = Math.floor(info.duracion / 60);
            const segundos = (info.duracion % 60).toString().padStart(2, '0');
            
            let txt = `🌸 *— ✧ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 ✧ —* 🌸\n\n`;
            txt += `> 🎀 *Título:* ${info.titulo}\n`;
            txt += `> 💗 *Canal:* ${info.canal}\n`;
            txt += `> ⏱️ *Duración:* ${minutos}:${segundos}\n`;
            txt += `> 🔗 *URL:* ${info.url}\n\n`;
            txt += `🌸 *Creador: Lyonn* 🌸`;
            
            await m.reply(txt);
            await m.react('✅');
        } catch (e) {
            await m.reply(`❌ Error: ${e.message}`);
            await m.react('❌');
        }
        return;
    }
};

handler.help = ['yt <búsqueda>', 'ytmp3 <url>', 'ytmp4 <url>', 'ytinfo <url>'];
handler.tags = ['downloader'];
handler.command = ['yt', 'ytmp3', 'ytmp4', 'ytinfo'];

export default handler;