let handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Solo en grupos');
  if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo administradores');

  let mentionedJid = m.mentionedJid || [];
  let user = mentionedJid.length ? mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  if (!user) return m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Uso:* ${usedPrefix + command} @usuario\n➤ *Ejemplo:* ${usedPrefix + command} @usuario\n\n*"El aula de élite reconoce el poder de sus guerreros"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);

  try {
    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
    
    if (user === ownerGroup) {
      return m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Error:* No puedes promover al creador del grupo\n\n*"Nadie puede superar al líder del aula"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    }
    
    if (groupInfo.participants.some(p => p.id === user && p.admin)) {
      return m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Error:* El usuario ya es administrador\n\n*"Ya ha alcanzado un rango superior"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
    }
    
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Usuario:* @${user.split('@')[0]}\n➤ *Acción:* 👑 NOMBRADO ADMINISTRADOR\n\n*"Un nuevo líder emerge en el aula de élite"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`, { mentions: [user] });
    
  } catch (e) {
    m.reply(`*《 🎭  𝐏𝐑𝐎𝐌𝐎𝐓𝐄  🗡️ 》*\n\n➤ *Error:* ${e.message}\n➤ *Reporta:* ${usedPrefix}report\n\n*"El sistema ha fallado, pero el aula continúa"*\n*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`);
  }
};

handler.help = ['promote @user'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;