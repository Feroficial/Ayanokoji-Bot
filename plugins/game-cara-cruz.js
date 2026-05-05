let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let opcion = args[0]?.toLowerCase()
  let cantidad = parseInt(args[1])
  
  if (!opcion || !cantidad) return m.reply(`
ㅤ    ꒰  ㅤ 🪙 ㅤ *αℓуα - ¢αяασ¢яυz* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #caraocruz <cara/cruz> <cantidad>
> ₊· ⫏⫏ ㅤ *Ejemplo:* #caraocruz cara 500
> ₊· ⫏⫏ ㅤ *Ejemplo:* #caraocruz cruz 1000

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (opcion !== 'cara' && opcion !== 'cruz') return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ σρ¢ιση 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ *Opciones válidas:* cara, cruz

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  if (cantidad <= 0) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢αηтι∂α∂ 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ La cantidad debe ser mayor a 0

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
  
  let USD = user.USD || 0
  
  if (cantidad > USD) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 єƒє¢тινσ ㅤ 性

> ₊· ⫏⫏ ㅤ No tienes suficientes USD
> ₊· ⫏⫏ ㅤ *Tienes:* ${USD} USD
> ₊· ⫏⫏ ㅤ *Apuestas:* ${cantidad} USD

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  let resultado = Math.random() < 0.5 ? 'cara' : 'cruz'
  let resultadoTexto = resultado === 'cara' ? 'ᴄᴀʀᴀ' : 'ᴄʀᴜᴢ'
  let esGanador = opcion === resultado
  let emoji = esGanador ? '✅' : '❌'
  
  if (esGanador) {
    user.USD = USD + cantidad
  } else {
    user.USD = USD - cantidad
  }
  
  await m.reply(`
ㅤ    ꒰  ㅤ 🪙 ㅤ *αℓуα - ¢αяασ¢яυz* ㅤ ${emoji} ㅤ 性

> ₊· ⫏⫏ ㅤ *🎲 Apuesta:* ${cantidad} USD
> ₊· ⫏⫏ ㅤ *🪙 Tu apuesta:* ${opcion === 'cara' ? 'ᴄᴀʀᴀ' : 'ᴄʀᴜᴢ'}
> ₊· ⫏⫏ ㅤ *🪙 Resultado:* ${resultadoTexto}

> ₊· ⫏⫏ ㅤ ${esGanador ? '🎉 *¡GANASTE!* 🎉' : '💔 *¡PERDISTE!* 💔'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *💵 Saldo actual:* ${user.USD} USD
  `.trim())
}

handler.help = ['caraocruz']
handler.tags = ['game']
handler.command = ['caraocruz', 'moneda', 'coin']

export default handler