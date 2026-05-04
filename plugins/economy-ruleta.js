// ruleta.js - Juego de ruleta (apostar a RED o GREEN)
let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let color = args[0]?.toLowerCase()
  let cantidad = parseInt(args[1])
  
  if (!color || !cantidad) return m.reply(`
ㅤ    ꒰  ㅤ 🎰 ㅤ *αℓуα - яυℓєтα* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #яυℓєтα <color> <¢αηтι∂α∂>
> ₊· ⫏⫏ ㅤ *Colores:* red, green
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #яυℓєтα red 500

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (color !== 'red' && color !== 'green') return m.reply(`
ㅤ    ꒰  ㅤ 🎰 ㅤ *αℓуα - яυℓєтα* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σℓσя 木 ιηνáℓι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *Colores válidos:* red, green

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
> ₊· ⫏⫏ ㅤ *Qυιєяєѕ apostar:* ${cantidad} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  // Colores de la ruleta: 1-14 (rojo), 2-14 (verde)
  let resultados = ['red', 'green']
  let resultado = resultados[Math.floor(Math.random() * resultados.length)]
  
  let ganancia = 0
  let mensajeResultado = ""
  let emoji = ""
  
  // Animación de la ruleta
  await m.reply(`
ㅤ    ꒰  ㅤ 🎰 ㅤ *αℓуα - яυℓєтα* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ gιяαη∂σ 木 яυℓєтα ㅤ 性

> ₊· ⫏⫏ ㅤ *🎲 Apostaste:* ${cantidad} USD a ${color.toUpperCase()}
> ₊· ⫏⫏ ㅤ *🌀 La ruleta está girando...*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  await new Promise(res => setTimeout(res, 2000))
  
  if (resultado === color) {
    // Si acierta: gana el doble de lo apostado
    ganancia = cantidad * 2
    user.USD = USD + ganancia
    mensajeResultado = `🎉 *¡FELICIDADES!* 🎉\n> ₊· ⫏⫏ ㅤ Cαyó en *${resultado.toUpperCase()}*\n> ₊· ⫏⫏ ㅤ ✨ *Ganaste +${ganancia} USD* ✨`
    emoji = "🎉"
  } else {
    // Si pierde: pierde lo apostado
    user.USD = USD - cantidad
    ganancia = -cantidad
    mensajeResultado = `💔 *¡PERDISTE!* 💔\n> ₊· ⫏⫏ ㅤ Cαyó en *${resultado.toUpperCase()}*\n> ₊· ⫏⫏ ㅤ *Perdiste -${cantidad} USD*`
    emoji = "💔"
  }
  
  await m.reply(`
ㅤ    ꒰  ㅤ 🎰 ㅤ *αℓуα - яυℓєтα* ㅤ ${emoji} ㅤ 性

> ₊· ⫏⫏ ㅤ *🎲 Apuesta:* ${cantidad} USD a *${color.toUpperCase()}*
> ₊· ⫏⫏ ㅤ *🎰 Resultado:* ${resultado.toUpperCase()}
> ₊· ⫏⫏ ㅤ ${mensajeResultado}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *💵 Saldo actual:* ${user.USD} USD
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['ruleta']
handler.tags = ['game']
handler.command = ['ruleta', 'roulette']

export default handler