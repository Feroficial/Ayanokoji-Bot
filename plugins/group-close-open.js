let handler = async (m, { conn, text, isAdmin, isOwner, isROwner }) => {
    if (!m.isGroup) return m.reply('🌸 Este comando solo funciona en grupos');
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🌸 Solo administradoras o la creadora');

    const groupId = m.chat;
    
    if (text === 'open') {
        await conn.groupSettingUpdate(groupId, 'not_announcement');
        m.reply(`🌸 *— ✧ 𝐆𝐑𝐔𝐏𝐎 𝐀𝐁𝐈𝐄𝐑𝐓𝐎 ✧ —* 🌸
        
> 💗 *El grupo ha sido abierto*
> 🎀 *Todas las participantes pueden enviar mensajes*

🌸 *Danny Yulieth* 🌸`);
    } 
    else if (text === 'close') {
        await conn.groupSettingUpdate(groupId, 'announcement');
        m.reply(`🌸 *— ✧ 𝐆𝐑𝐔𝐏𝐎 𝐂𝐄𝐑𝐑𝐀𝐃𝐎 ✧ —* 🌸
        
> 💗 *El grupo ha sido cerrado*
> 🎀 *Solo administradoras pueden enviar mensajes*

🌸 *Danny Yulieth* 🌸`);
    } 
    else {
        m.reply(`🌸 *— ✧ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 ✧ —* 🌸
        
> 🎀 *Usa: #grupo open* → Abrir el grupo
> 💗 *Usa: #grupo close* → Cerrar el grupo

> ✨ *Ejemplo:* #grupo open

🌸 *Danny Yulieth* 🌸`);
    }
}

handler.help = ['grupo <open/close>'];
handler.tags = ['group'];
handler.command = ['grupo', 'grupos'];
handler.group = true;
handler.admin = true;

export default handler;