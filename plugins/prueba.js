let handler = async (m, { conn }) => {
  let text = `📊 *DEBUG TOTAL - DETECTOR DE EVENTOS*\n\n`;
  
  // 1. Verificar messageStubType
  text += `📌 messageStubType: ${m.messageStubType || 'null'}\n`;
  text += `📌 messageStubParameters: ${JSON.stringify(m.messageStubParameters || [])}\n\n`;
  
  // 2. Verificar todo el objeto message
  if (m.message) {
    text += `📦 *KEYS del message:*\n`;
    const keys = Object.keys(m.message);
    text += `${keys.join(', ')}\n\n`;
    
    // 3. Verificar groupParticipantUpdate
    if (m.message.groupParticipantUpdate) {
      text += `👥 *groupParticipantUpdate DETECTADO*\n`;
      text += `action: ${m.message.groupParticipantUpdate.action}\n`;
      text += `participants: ${JSON.stringify(m.message.groupParticipantUpdate.participants)}\n\n`;
    }
    
    // 4. Verificar protocolMessage
    if (m.message.protocolMessage) {
      text += `📨 *protocolMessage DETECTADO*\n`;
      text += `type: ${m.message.protocolMessage.type}\n`;
      if (m.message.protocolMessage.groupInviteMessage) {
        text += `groupInviteMessage: ${JSON.stringify(m.message.protocolMessage.groupInviteMessage)}\n`;
      }
      text += `\n`;
    }
    
    // 5. Verificar senderKeyDistributionMessage
    if (m.message.senderKeyDistributionMessage) {
      text += `🔑 senderKeyDistributionMessage detectado\n\n`;
    }
  }
  
  // 6. Verificar si es mensaje de sistema
  text += `🔔 isSystem: ${m.isSystem ? 'SI' : 'NO'}\n`;
  text += `👥 isGroup: ${m.isGroup ? 'SI' : 'NO'}\n`;
  text += `🆔 chat: ${m.chat}\n`;
  
  await m.reply(text);
}

handler.command = /^(debugtotal|dtotal)$/i;
export default handler;