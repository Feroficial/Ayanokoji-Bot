// bank.js - Ver dinero en el banco y cuenta personal
let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  
  let USD = user.USD || 0
  let bank = user.bank || 0
  
  await m.reply(`
ㅤ    ꒰  ㅤ 🏦 ㅤ *αℓуα - вαηк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єѕтα∂σ 木 ¢υєηтα ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* ${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *💵 Efectivo:* ${USD} USD
> ₊· ⫏⫏ ㅤ *🏦 Banco:* ${bank} USD
> ₊· ⫏⫏ ㅤ *💰 Total:* ${USD + bank} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *Comandos útiles:*
> ₊· ⫏⫏ ㅤ #depositar <cantidad>
> ₊· ⫏⫏ ㅤ #retirar <cantidad>
> ₊· ⫏⫏ ㅤ #pay <cantidad> @usuario
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'balance', 'bal', 'dinero']

export default handler