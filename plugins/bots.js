let handler = async (m, { conn, usedPrefix }) => {
  const botPrincipal = conn.user
  const subBots = global.conns || []
  
  const subBotsActivos = subBots.filter(c => 
    c.user && c.ws.socket && c.ws.socket.readyState !== 3
  )
  
  const totalSubBots = subBotsActivos.length
  const maxSubBots = 5
  
  let texto = `
ㅤ    ꒰  ㅤ 🤖 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ℓιѕтα 木 вσтѕ ㅤ 性

> ₊· ⫏⫏ ㅤ *вσт ρяιη¢ιραℓ*
> ₊· ⫏⫏ ㅤ 👤 *Nσмвяє:* ${botPrincipal.name || 'αℓуα - вσт'}
> ₊· ⫏⫏ ㅤ 📱 *Núмєяσ:* ${botPrincipal.jid.split('@')[0]}
> ₊· ⫏⫏ ㅤ 📊 *єѕтα∂σ:* 🟢 α¢тινσ

${totalSubBots > 0 ? `
ㅤ    ꒰  ㅤ 📱 ㅤ *ѕυв - вσтѕ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σηє¢тα∂σѕ 木 ${totalSubBots}/${maxSubBots} ㅤ 性

${subBotsActivos.map((sub, i) => `
> ₊· ⫏⫏ ㅤ ${i + 1}. 👤 *${sub.user.name || 'ѕυв-вσт'}*
> ₊· ⫏⫏ ㅤ 📱 *Núмєяσ:* ${sub.user.jid.split('@')[0]}
> ₊· ⫏⫏ ㅤ 🟢 *єѕтα∂σ:* ¢σηє¢тα∂σ
`).join('\n')}
` : `
ㅤ    ꒰  ㅤ ❌ ㅤ *ѕυв - вσтѕ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 ¢σηє¢тαя ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ нαу ѕυв-вσтѕ ¢σηє¢тα∂σѕ
> ₊· ⫏⫏ ㅤ Usα ${usedPrefix}qr ραяα ¢σηє¢тαя υησ
`}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: Lʏᴏɴɴ
  `.trim()

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['bots', 'listbots', 'subbots']
handler.tags = ['serbot']
handler.command = ['bots', 'listbots', 'subbots', 'listasubbots']

export default handler