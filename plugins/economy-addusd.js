// addusd.js - Darte USD a ti mismo (solo owner)
let handler = async (m, { conn, isOwner, args }) => {
  if (!isOwner) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕσℓσ 木 σωηєя ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ єℓ *¢яєα∂σя* ρυє∂є υѕαя єѕтє ¢σмαη∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())

  let cantidad = parseInt(args[0])
  
  if (!cantidad || isNaN(cantidad)) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #α∂∂υѕ∂ <¢αηтι∂α∂>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #α∂∂υѕ∂ 10000

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (cantidad <= 0) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢αηтι∂α∂ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Lα ¢αηтι∂α∂ ∂євє ѕєя мαуσя α 0

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  let user = global.db.data.users[m.sender]
  user.USD = (user.USD || 0) + cantidad
  
  await m.reply(`
ㅤ    ꒰  ㅤ 💰 ㅤ *αℓуα - α∂∂υѕ∂* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ∂ιηєяσ 木 αgяєgα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* ${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📥 Cantidad agregada:* +${cantidad} USD
> ₊· ⫏⫏ ㅤ *💵 Saldo actual:* ${user.USD} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['addusd']
handler.tags = ['owner']
handler.command = ['addusd', 'addmoney', 'darusd']
handler.rowner = true

export default handler