let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* ${usedPrefix + command} <ℓιηк ∂єℓ gяυρσ>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* ${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxx

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  try {
    let [_, code] = text.match(linkRegex) || []
    if (!code) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ℓιηк 木 ιηváℓι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ єηℓα¢є ησ єѕ νáℓι∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    
    let res = await conn.groupAcceptInvite(code)
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υηι∂σ 木 gяυρσ ㅤ 性

> ₊· ⫏⫏ ㅤ Mє нє υηι∂σ αℓ gяυρσ cσяяє¢тαмєηтє

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  } catch {
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 υηιя ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ρυ∂є υηιямє αℓ gяυρσ
> ₊· ⫏⫏ ㅤ Vєяιƒι¢α qυє єℓ єηℓα¢є ѕєα νáℓι∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }
}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'entrar', 'unirse']
handler.rowner = true

export default handler