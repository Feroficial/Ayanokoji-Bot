let handler = async (m, { conn }) => {
  let text = `📊 *DEBUG DE EVENTOS V2*\n\n`;
  text += `> messageStubType: ${m.messageStubType || 'null'}\n`;
  text += `> messageStubParameters: ${JSON.stringify(m.messageStubParameters || [])}\n\n`;
  
  // Verificar protocolMessage
  if (m.message?.protocolMessage) {
    text += `📌 *protocolMessage detectado*\n`;
    text += `> type: ${m.message.protocolMessage.type}\n`;
    text += `> content: ${JSON.stringify(m.message.protocolMessage, null, 2).slice(0, 200)}\n\n`;
  }
  
  // Verificar groupParticipantUpdate
  if (m.message?.groupParticipantUpdate) {
    text += `👥 *groupParticipantUpdate detectado*\n`;
    text += `> action: ${m.message.groupParticipantUpdate.action}\n`;
    text += `> participants: ${JSON.stringify(m.message.groupParticipantUpdate.participants)}\n\n`;
  }
  
  text += `> isGroup: ${m.isGroup}\n`;
  text += `> chat: ${m.chat}\n`;
  
  m.reply(text);
}

handler.command = /^(testevent|debuggrupo2)$/i;
export default handler;