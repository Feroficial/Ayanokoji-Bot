let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('❌ Solo el creador puede usar este comando');

  let chats = conn.chats;
  let grupos = [];
  
  for (let id in chats) {
    if (id.endsWith('@g.us')) {
      try {
        let metadata = await conn.groupMetadata(id);
        grupos.push({
          id: id,
          name: metadata.subject,
          members: metadata.participants.length
        });
      } catch(e) {}
    }
  }
  
  if (grupos.length === 0) {
    return m.reply('📌 El bot no está en ningún grupo');
  }
  
  if (command === 'salir' || (text && text.includes('salir'))) {
    let grupoId = text.replace('salir', '').trim();
    
    if (!grupoId) {
      let lista = '—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n📌 GRUPOS DISPONIBLES\n\n';
      for (let i = 0; i < grupos.length; i++) {
        lista += `${i + 1}. ${grupos[i].name}\n📍 ${grupos[i].id}\n👥 ${grupos[i].members} miembros\n\n`;
      }
      lista += `Para salir: ${usedPrefix}salir id_del_grupo\nEjemplo: ${usedPrefix}salir 123456789@g.us`;
      return m.reply(lista);
    }
    
    try {
      await conn.groupLeave(grupoId);
      m.reply(`✅ El bot salió del grupo ${grupoId}`);
    } catch (e) {
      m.reply(`❌ Error: ${e.message}`);
    }
    return;
  }
  
  let texto = '—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n';
  texto += `📊 GRUPOS CONECTADOS: ${grupos.length}\n\n`;
  
  for (let i = 0; i < grupos.length; i++) {
    texto += `${i + 1}. ${grupos[i].name}\n`;
    texto += `📍 ${grupos[i].id}\n`;
    texto += `👥 ${grupos[i].members} miembros\n\n`;
  }
  
  texto += `Para salir de un grupo: ${usedPrefix}salir id_del_grupo\n`;
  texto += `\n👑 DevLyonn`;
  
  m.reply(texto);
};

handler.help = ['grupos', 'salir'];
handler.tags = ['owner'];
handler.command = /^(grupos|listagrupos|salir)$/i;
export default handler;