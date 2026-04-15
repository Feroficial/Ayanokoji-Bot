let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('❌ *Uso:* !yt audio <link>\n\n📌 *Ejemplo:* !yt audio https://youtu.be/xxxxx');

  // Extraer solo la URL
  const url = text.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/)?.[0];
  if (!url) return m.reply('❌ *Enlace de YouTube no válido*');

  await m.reply('🎵 *Descargando audio...*');

  try {
    const res = await fetch(`http://localhost:3000/youtube/audio?url=${encodeURIComponent(url)}`);
    const a = await res.json();
    
    if (!a.url_audio) return m.reply('❌ *Error al obtener el audio*\n\n' + (a.error || ''));
    
    const texto = `🎵 *${a.titulo || 'Audio'}*\n🔗 *Enlace:* ${a.url_audio}\n\n👑 *DevLyonn - Baldwin IV*`;
    
    await m.reply(texto);
  } catch (error) {
    m.reply(`❌ *Error:* ${error.message}`);
  }
};

handler.help = ['yta <link>'];
handler.tags = ['downloader'];
handler.command = /^(ytaudio|ytmp3|yta)$/i;
export default handler;