let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { diamond: 0, saes: 100 }
  if (user.diamond === undefined) user.diamond = 0
  if (user.saes === undefined) user.saes = 100

  let name = await conn.getName(m.sender)

  m.reply(`
*•───⧼⧼⧼ 𝙱𝙰𝙻𝙰𝙽𝙲𝙴 ⧽⧽⧽───•*

@${m.sender.split('@')[0]} Tiene:

*• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* _${user.diamond} 💎_
*• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> Afuera del Banco 

*•───⧼⧼⧼ 𝙱𝙰𝙽𝙲𝙾 ⧽⧽⧽───•*

*🏦 𝐃𝐢𝐧𝐞𝐫𝐨 :* _${user.bank || 0} 💎_
> Adentro del Banco 🏦 

•───────────────•
`, { mentions: [m.sender] })
}

handler.help = ["balance"]
handler.tags = ["rpg"]
handler.command = ["balance", "bal", "saldo"]

export default handler