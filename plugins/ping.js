let handler = async (m, { conn }) => {
  let inicio = Date.now()
  await conn.sendMessage(m.chat, { react: { text: '🏓', key: m.key } })
  let fin = Date.now()
  let latency = fin - inicio
  
  let texto = `*《 🐉  𝐏𝐈𝐍𝐆  🗡️ 》*

➤ *𝐋𝐚𝐭𝐞𝐧𝐜𝐢𝐚* : ${latency} ms
➤ *𝐄𝐬𝐭𝐚𝐝𝐨* : ${latency < 100 ? '✅ Excelente' : latency < 200 ? '⚠️ Bueno' : '❌ Lento'}

*⚔️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 ⚔️*`

  m.reply(texto)
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = /^(ping|p)$/i

export default handler