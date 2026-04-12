// plugins/testevent.js
let handler = async (m, { conn }) => {
  // Este comando muestra los tipos de eventos
  m.reply(`📊 *DEBUG DE EVENTOS*\n\n> messageStubType: ${m.messageStubType || 'null'}\n> messageStubParameters: ${JSON.stringify(m.messageStubParameters || [])}\n> isGroup: ${m.isGroup}`);
}

handler.command = /^(testevent|debuggrupo)$/i;
export default handler;