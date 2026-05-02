let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('🎭 *Uso:* #fb <url>\n📌 #fb https://fb.watch/xxxxx');
    await m.react('🎭');
    try {
        await m.reply(`🎭 Descargando video...`);
        const res = await fetch(`https://dvlyonn.onrender.com/download/facebook?url=${encodeURIComponent(text)}&download=true`);
        if (!res.ok) throw new Error('No se pudo descargar');
        const buffer = await res.buffer();
        await conn.sendMessage(m.chat, {
            video: buffer,
            caption: `🎭 *Facebook Video*\n🎯 ${text}\n🎭 Alya 2026`,
            mimetype: 'video/mp4'
        }, { quoted: m });
        await m.react('✅');
    } catch (e) {
        await m.reply(`🎭 Error: ${e.message}`);
        await m.react('❌');
    }
};
handler.help = ['fb <url>'];
handler.tags = ['downloader'];
handler.command = ['fb', 'facebook'];
export default handler;