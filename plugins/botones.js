let handler = async (m, { conn, usedPrefix }) => {
  const buttons = [
    { buttonId: `${usedPrefix}ping`, buttonText: { displayText: '📡 PING' }, type: 1 },
    { buttonId: `${usedPrefix}code`, buttonText: { displayText: '🔐 CODE' }, type: 1 },
    { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🌸 MENU' }, type: 1 },
    { buttonId: `${usedPrefix}bots`, buttonText: { displayText: '🤖 BOTS' }, type: 1 }
  ]
  
  const texto = `
ㅤ    ꒰  ㅤ 🕸️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσтσηєѕ 木 ∂єтяáѕ ㅤ 性

> ₊· ⫏⫏ ㅤ *Pяєѕισηα ℓσѕ вσтσηєѕ*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: Lʏᴏɴɴ
  `.trim()
  
  await conn.sendMessage(m.chat, {
    text: texto,
    buttons: buttons,
    footer: 'Alya Bot - Creado por Lyonn',
    headerType: 1
  }, { quoted: m })
}

handler.help = ['botones']
handler.tags = ['main']
handler.command = ['botones', 'buttons']

export default handler