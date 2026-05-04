// pay.js - Transferir dinero a otro usuario
let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let mention = m.mentionedJid[0]
  
  if (!mention && !args[0]) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - ραу* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ραу @υѕυαяισ <¢αηтι∂α∂>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #ραу @${m.sender.split('@')[0]} 500

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  let cantidad = parseInt(args[1])
  if (!cantidad || isNaN(cantidad)) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - ραу* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢αηтι∂α∂ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Iηgяєѕα υηα ¢αηтι∂α∂ νáℓι∂α

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
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
> ₊· ⫏⫏ ㅤ *Qυιєяєѕ enviar:* ${cantidad} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  let targetUser = mention
  let nombreDestino = targetUser.split('@')[0]
  
  if (!global.db.data.users[targetUser]) {
    global.db.data.users[targetUser] = {}
  }
  
  user.USD = USD - cantidad
  global.db.data.users[targetUser].USD = (global.db.data.users[targetUser].USD || 0) + cantidad
  
  await m.reply(`
ㅤ    ꒰  ㅤ 💸 ㅤ *αℓуα - ραу* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єηvíσ 木 єχιтσѕσ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 De:* ${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *👤 Para:* ${nombreDestino}
> ₊· ⫏⫏ ㅤ *💰 Cantidad:* ${cantidad} USD
> ₊· ⫏⫏ ㅤ *💵 Saldo restante:* ${user.USD} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['pay']
handler.tags = ['economy']
handler.command = ['pay', 'enviar', 'transferir']

export default handler