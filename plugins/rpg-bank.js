let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { coin: 100, bank: 0 }
  if (user.coin === undefined) user.coin = 100
  if (user.bank === undefined) user.bank = 0

  if (command === "balance" || command === "bal") {
    let total = user.coin + user.bank
    return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ 💰 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 💰
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Monedas:* ${user.coin} 🪙
◈ *Banco:* ${user.bank} 🪙
◈ *Total:* ${total} 🪙

*"El aula de élite siempre lleva la cuenta"*
━━━━━━━━━━━━━━━━━━━━━━`)
  }

  if (!text) {
    return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ 🏦 𝐁𝐀𝐍𝐂𝐎 🏦
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Uso:* ${usedPrefix}bank <cantidad>
◈ *Ejemplo:* ${usedPrefix}bank 500
◈ *Saldo:* ${user.coin} 🪙
◈ *Banco:* ${user.bank} 🪙

*"Guarda tus monedas en el banco"*
━━━━━━━━━━━━━━━━━━━━━━`)
  }

  let cantidad = parseInt(text)
  if (isNaN(cantidad)) return m.reply(`❌ *Cantidad inválida*`)
  if (cantidad < 1) return m.reply(`❌ *Mínimo 1 🪙*`)
  if (cantidad > user.coin) return m.reply(`❌ *No tienes suficientes monedas*\n◈ Tienes: ${user.coin} 🪙`)

  user.coin -= cantidad
  user.bank += cantidad

  m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ ✅ 𝐃𝐄𝐏𝐎𝐒𝐈𝐓𝐎 𝐄𝐗𝐈𝐓𝐎𝐒𝐎 ✅
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Depositado:* +${cantidad} 🪙
◈ *Monedas:* ${user.coin} 🪙
◈ *Banco:* ${user.bank} 🪙

*"Tu dinero está seguro en el banco"*
━━━━━━━━━━━━━━━━━━━━━━`)
}

handler.help = ["bank <cantidad>"]
handler.tags = ["rpg"]
handler.command = ["bank", "depositar"]

export default handler