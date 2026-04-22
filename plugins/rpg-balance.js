let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { diamond: 0, saes: 100, bank: 0 }
  if (user.diamond === undefined) user.diamond = 0
  if (user.saes === undefined) user.saes = 100
  if (user.bank === undefined) user.bank = 0

  let total = user.saes + user.bank

  let texto = `
> *•───⧼⧼⧼ 𝘽𝘼𝙇𝘼𝙉𝘾𝙀 ⧽⧽⧽───•*

> @${m.sender.split('@')[0]}

> *• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* _${user.diamond} 💎_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐁𝐚𝐧𝐜𝐨:* _${user.bank} 🪙_
> *• 𝐓𝐨𝐭𝐚𝐥:* _${total} 🪙_

> *•───────────────•*
`

  conn.sendMessage(m.chat, { text: texto, mentions: [m.sender] })
}

handler.help = ["balance"]
handler.tags = ["rpg"]
handler.command = ["balance", "bal", "saldo"]
export default handler