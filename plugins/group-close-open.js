let handler = async (m, { conn, text, isAdmin, isOwner, isROwner }) => {
    if (!m.isGroup) return m.reply('🌸 Este comando solo funciona en grupos')
    
    const esOwner = isOwner || isROwner
    if (!isAdmin && !esOwner) return m.reply('🌸 Solo administradoras o la creadora')
    
    const groupId = m.chat
    const groupMetadata = await conn.groupMetadata(groupId)
    const botJid = conn.user.jid
    const botIsAdmin = groupMetadata.participants.some(p => p.id === botJid && p.admin)
    
    if (!botIsAdmin) return m.reply('🌸 El bot necesita ser administradora')
    
    if (text === 'open') {
        await conn.groupSettingUpdate(groupId, 'not_announcement')
        m.reply(`🌸 *— ✧ 𝐆𝐑𝐔𝐏𝐎 𝐀𝐁𝐈𝐄𝐑𝐓𝐎 ✧ —* 🌸
        
> 💗 *El grupo ha sido abierto*
> 🎀 *Todas las participantes pueden enviar mensajes*

🌸 *Danny Yulieth* 🌸`)
    } 
    else if (text === 'close') {
        await conn.groupSettingUpdate(groupId, 'announcement')
        m.reply(`🌸 *— ✧ 𝐆𝐑𝐔𝐏𝐎 𝐂𝐄𝐑𝐑𝐀𝐃𝐎 ✧ —* 🌸
        
> 💗 *El grupo ha sido cerrado*
> 🎀 *Solo administradoras pueden enviar mensajes*

🌸 *Danny Yulieth* 🌸`)
    } 
    else {
        m.reply(`🌸 *— ✧ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 ✧ —* 🌸
        
> 🎀 *Usa: #grupo open* → Abrir el grupo
> 💗 *Usa: #grupo close* → Cerrar el grupo

> ✨ *Ejemplo:* #grupo open

🌸 *Danny Yulieth* 🌸`)
    }
}

handler.help = ['grupo <open/close>']
handler.tags = ['group']
handler.command = ['grupo', 'grupos']
handler.group = true
handler.admin = true

export default handler