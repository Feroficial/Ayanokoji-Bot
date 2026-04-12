let handler = async (m, { args, usedPrefix, isAdmin, isROwner, isOwner }) => {
    if (!m.isGroup) return m.reply('❌ Solo en grupos');
    if (!isAdmin && !isROwner && !isOwner) return m.reply('❌ Solo administradores');

    const chat = global.db.data.chats[m.chat];
    
    if (args.length === 0) {
        const estado = chat.welcome ? '✅ ACTIVADO' : '❌ DESACTIVADO';
        return m.reply(`*WELCOME SYSTEM*\n\n> Estado: ${estado}\n\n*Comandos:*\n• ${usedPrefix}welcome on\n• ${usedPrefix}welcome off\n• ${usedPrefix}setwelcome <texto>\n\n*Variables:* @user, @level, @role, @count, @group`);
    }

    const action = args[0].toLowerCase();
    if (action === 'on') {
        chat.welcome = true;
        m.reply('✅ BIENVENIDA ACTIVADA');
    } else if (action === 'off') {
        chat.welcome = false;
        m.reply('❌ BIENVENIDA DESACTIVADA');
    } else {
        m.reply(`⚠️ Usa: ${usedPrefix}welcome on/off`);
    }
};

handler.command = /^(welcome|bienvenida)$/i;
handler.group = true;
export default handler;