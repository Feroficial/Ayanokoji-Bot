export async function before(m, { conn }) {
  if (m.isGroup && (m.messageStubType === 27 || m.messageStubType === 29)) {
    const tipo = m.messageStubType === 27 ? '📥 ENTRADA' : '📤 SALIDA';
    await conn.sendMessage(m.chat, {
      text: `🔔 *EVENTO DETECTADO*\n\n> ${tipo}\n> Participantes: ${JSON.stringify(m.messageStubParameters)}\n> messageStubType: ${m.messageStubType}`
    });
  }
  return true;
}