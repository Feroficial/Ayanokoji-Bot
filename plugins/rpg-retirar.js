let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { coin: 100, bank: 0 }
  if (user.coin === undefined) user.coin = 100
  if (user.bank === undefined) user.bank = 0

  if (!text) {
    return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ 💸 𝐑𝐄𝐓𝐈𝐑𝐀𝐑 💸
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Uso:* ${usedPrefix}retirar <cantidad>
◈ *Ejemplo:* ${usedPrefix}retirar 500
◈ *Banco:* ${user.bank} 🪙

*"Retira tus monedas del banco"*
━━━━━━━━━━━━━━━━━━━━━━`)
  }

  let cantidad = parseInt(text)
  if (isNaN(cantidad)) return m.reply(`❌ *Cantidad inválida*`)
  if (cantidad < 1) return m.reply(`❌ *Mínimo 1 🪙*`)
  if (cantidad > user.bank) return m.reply(`❌ *No tienes suficientes monedas en el banco*\n◈ Banco: ${user.bank} 🪙`)

  user.bank -= cantidad
  user.coin += cantidad

  m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ ✅ 𝐑𝐄𝐓𝐈𝐑𝐎 𝐄𝐗𝐈𝐓𝐎𝐒𝐎 ✅
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Retirado:* +${cantidad} 🪙
◈ *Monedas:* ${user.coin} 🪙
◈ *Banco:* ${user.bank} 🪙

*"Tu dinero está listo para usar"*
━━━━━━━━━━━━━━━━━━━━━━`)
}

handler.help = ["retirar <cantidad>"]
handler.tags = ["rpg"]
handler.command = ["retirar", "withdraw"]

export default handler