let handler = async (m, { conn, usedPrefix }) => {
  const inicio = Date.now()
  await conn.sendMessage(m.chat, { react: { text: '📡', key: m.key } })
  const fin = Date.now()
  const ping = fin - inicio
  
  const tiempoActivo = process.uptime()
  const horas = Math.floor(tiempoActivo / 3600)
  const minutos = Math.floor((tiempoActivo % 3600) / 60)
  const segundos = Math.floor(tiempoActivo % 60)
  
  const texto = `
ㅤ    ꒰  ㅤ 📡 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ριηg 木 єѕтα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *ʟαтєη¢ια:* ${ping}ms
> ₊· ⫏⫏ ㅤ *α¢тινσ:* ${horas}h ${minutos}m ${segundos}s
> ₊· ⫏⫏ ㅤ *єѕтα∂σ:* ${ping < 200 ? '🟢 ᴇxᴄᴇʟᴇɴᴛᴇ' : ping < 500 ? '🟡 ɴᴏʀᴍᴀʟ' : '🔴 ʟᴇɴᴛᴏ'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ ✿ 木 性 ㅤ Lʏᴏɴɴ
  `.trim()
  
  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'pong']

export default handler
