// depositar.js - Guardar dinero en el banco
let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let cantidad = parseInt(args[0])
  
  if (!cantidad || isNaN(cantidad)) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вαηк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #∂єρσѕιтαя <¢αηтι∂α∂>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #∂єρσѕιтαя 1000

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (cantidad <= 0) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢αηтι∂α∂ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Lα ¢αηтι∂α∂ ∂євє ѕєя мαуσя α 0

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  let USD = user.USD || 0
  
  if (cantidad > USD) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 єƒє¢тινσ ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ тιєηєѕ ѕυƒι¢ιєηтєѕ USD
> ₊· ⫏⫏ ㅤ *Tєηєѕ:* ${USD} USD
> ₊· ⫏⫏ ㅤ *Qυιєяєѕ:* ${cantidad} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  user.USD = USD - cantidad
  user.bank = (user.bank || 0) + cantidad
  
  await m.reply(`
ㅤ    ꒰  ㅤ 💰 ㅤ *αℓуα - вαηк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ∂єρσѕιтσ 木 єχιтσѕσ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📥 Cantidad depositada:* ${cantidad} USD
> ₊· ⫏⫏ ㅤ *💵 Efectivo restante:* ${user.USD} USD
> ₊· ⫏⫏ ㅤ *🏦 Total en banco:* ${user.bank} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim(), { mentions: [m.sender] })
}

handler.help = ['depositar']
handler.tags = ['economy']
handler.command = ['depositar', 'deposit']

export default handler