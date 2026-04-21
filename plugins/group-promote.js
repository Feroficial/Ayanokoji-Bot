let handler = async (m, { conn, usedPrefix, command, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores');

  let user = m.mentionedJid?.[0];
  if (!user) return m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} @usuario\n➤ *Ejemplo:* ${usedPrefix + command} @usuario`);

  try {
    let res = await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    if (res) {
      await m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Usuario:* @${user.split('@')[0]}\n➤ *Acción:* 👑 NOMBRADO ADMINISTRADOR\n\n*"Un nuevo líder emerge en el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, { mentions: [user] });
    } else {
      await m.reply(`❌ No se pudo promover al usuario`);
    }
  } catch (e) {
    console.error(e);
    await m.reply(`❌ Error: ${e.message}`);
  }
};

handler.help = ['promote @user'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;