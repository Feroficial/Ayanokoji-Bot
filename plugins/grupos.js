let handler = async (m, { conn, usedPrefix, command }) => {
  let ownerNumber = '59177474230';
  let senderNumber = m.sender.split('@')[0];
  
  if (senderNumber !== ownerNumber) {
    return m.reply('❌ *ACCESO DENEGADO*\n\nSolo DevLyonn puede usar este comando');
  }

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
  
  if (command === 'salir') {
    if (!text) {
      let lista = '—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n📌 GRUPOS\n\n';
      for (let i = 0; i < grupos.length; i++) {
        lista += `${i + 1}. ${grupos[i].name}\n📍 ${grupos[i].id}\n\n`;
      }
      lista += `Usa: ${usedPrefix}salir id_del_grupo`;
      return m.reply(lista);
    }
    
    try {
      await conn.groupLeave(text);
      m.reply(`✅ Bot salió del grupo ${text}`);
    } catch (e) {
      m.reply(`❌ Error: ${e.message}`);
    }
    return;
  }
  
  let texto = '—͟͟͞͞ *🜸 BALDWIND IV 🛸* —͟͟͞͞\n\n';
  texto += `📊 GRUPOS CONECTADOS: ${grupos.length}\n\n`;
  
  let botones = [];
  
  for (let i = 0; i < grupos.length; i++) {
    texto += `${i + 1}. ${grupos[i].name}\n`;
    texto += `📍 ${grupos[i].id}\n`;
    texto += `👥 ${grupos[i].members} miembros\n\n`;
    
    botones.push({
      buttonId: `${usedPrefix}salir ${grupos[i].id}`,
      buttonText: { displayText: `❌ Salir de ${grupos[i].name}` },
      type: 1
    });
  }
  
  texto += `👑 DevLyonn`;
  
  await conn.sendMessage(m.chat, {
    text: texto,
    buttons: botones,
    headerType: 1
  });
};

handler.help = ["grupos"]
handler.command = /^(grupos|listagrupos|salir)$/i;
handler.tags = ["grupo"]
export default handler;