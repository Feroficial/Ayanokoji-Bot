let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 100, bank: 0, diamond: 0 }
  if (user.saes === undefined) user.saes = 100
  if (user.bank === undefined) user.bank = 0

  if (!text) {
    return m.reply(`
> *•───⧼⧼⧼ 𝚁𝙴𝚃𝙸𝚁𝙰𝚁 ⧽⧽⧽───•*

> @${m.sender.split('@')[0]}

> *• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* _${user.diamond} 💎_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐁𝐚𝐧𝐜𝐨:* _${user.bank} 🪙_

> *•───⧼⧼⧼ 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 ⧽⧽⧽───•*

> *• ${usedPrefix}retirar <cantidad>* - Retirar
> *• ${usedPrefix}bank <cantidad>* - Depositar
> *• ${usedPrefix}balance* - Ver balance

> *•───────────────•*
`, { mentions: [m.sender] })
  }

  let cantidad = parseInt(text)
  if (isNaN(cantidad)) return m.reply(`> ❌ *Cantidad inválida*`)
  if (cantidad < 1) return m.reply(`> ❌ *Mínimo 1 🪙*`)
  if (cantidad > user.bank) return m.reply(`> ❌ *No tienes suficientes Saes en el banco*\n> *Banco:* ${user.bank} 🪙`)

  user.bank -= cantidad
  user.saes += cantidad

  m.reply(`
> *•───⧼⧼⧼ 𝚁𝙴𝚃𝙸𝚁𝙾 ⧽⧽⧽───•*

> ✅ *Retiro exitoso*

> *• 𝐂𝐚𝐧𝐭𝐢𝐝𝐚𝐝:* _${cantidad} 🪙_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐁𝐚𝐧𝐜𝐨:* _${user.bank} 🪙_

> *"Tu dinero está listo para usar"*
> *•───────────────•*
`, { mentions: [m.sender] })
}

handler.help = ["retirar <cantidad>"]
handler.tags = ["rpg"]
handler.command = ["retirar", "withdraw"]
export default handler