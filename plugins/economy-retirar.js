// retirar.js - Sacar dinero del banco
let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let cantidad = parseInt(args[0])
  
  if (!cantidad || isNaN(cantidad)) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вαηк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #яєтιяαя <¢αηтι∂α∂>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #яєтιяαя 500

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (cantidad <= 0) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢αηтι∂α∂ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Lα ¢αηтι∂α∂ ∂євє ѕєя мαуσя α 0

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  let bank = user.bank || 0
  
  if (cantidad > bank) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 єƒє¢тινσ ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ тιєηєѕ ѕυƒι¢ιєηтєѕ єη єℓ вαη¢σ
> ₊· ⫏⫏ ㅤ *Bαη¢σ:* ${bank} USD
> ₊· ⫏⫏ ㅤ *Qυιєяєѕ:* ${cantidad} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  user.bank = bank - cantidad
  user.USD = (user.USD || 0) + cantidad
  
  await m.reply(`
ㅤ    ꒰  ㅤ 💸 ㅤ *αℓуα - вαηк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєтιяσ 木 єχιтσѕσ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📤 Cantidad retirada:* ${cantidad} USD
> ₊· ⫏⫏ ㅤ *💵 Efectivo actual:* ${user.USD} USD
> ₊· ⫏⫏ ㅤ *🏦 Restante en banco:* ${user.bank} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim(), { mentions: [m.sender] })
}

handler.help = ['retirar']
handler.tags = ['economy']
handler.command = ['retirar', 'withdraw']

export default handler