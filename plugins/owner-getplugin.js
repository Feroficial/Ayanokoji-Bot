import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} <nombre del plugin>\n➤ *Ejemplo:* ${usedPrefix + command} pinterest\n\n*"Obtén el código fuente de cualquier plugin"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  let pluginName = text.endsWith('.js') ? text : text + '.js';
  let pluginPath = path.join(process.cwd(), 'plugins', pluginName);

  if (!fs.existsSync(pluginPath)) {
    return m.reply(`*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n➤ ❌ Plugin "${pluginName}" no encontrado.\n\n*"El archivo no existe en el sistema"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }

  let code = fs.readFileSync(pluginPath, 'utf8');

  await conn.sendMessage(m.chat, {
    document: Buffer.from(code, 'utf8'),
    mimetype: 'application/javascript',
    fileName: pluginName,
    caption: `*《 🎭  𝐆𝐄𝐓𝐏𝐋𝐔𝐆𝐈𝐍  🗡️ 》*\n\n📄 *Plugin:* ${pluginName}\n📦 *Tamaño:* ${code.length} bytes\n\n*"Código fuente del aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`
  }, { quoted: m });
};

handler.help = ['getplugin <nombre>'];
handler.tags = ['owner'];
handler.command = /^(getplugin|gp|codigo)$/i;
handler.rowner = true;

export default handler;