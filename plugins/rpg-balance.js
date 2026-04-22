let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { coin: 100, bank: 0 }
  if (user.coin === undefined) user.coin = 100
  if (user.bank === undefined) user.bank = 0

  let total = user.coin + user.bank

  m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ 💰 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 💰
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Monedas:* ${user.coin} 🪙
◈ *Banco:* ${user.bank} 🪙
◈ *Total:* ${total} 🪙

*"El aula de élite siempre lleva la cuenta"*
━━━━━━━━━━━━━━━━━━━━━━`)
}

handler.help = ["balance"]
handler.tags = ["rpg"]
handler.command = ["balance", "bal", "saldo"]

export default handler