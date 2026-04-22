let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 100, bank: 0, diamond: 0 }
  if (user.saes === undefined) user.saes = 100
  if (user.bank === undefined) user.bank = 0

  if (!text) {
    return m.reply(`
> *•───⧼⧼⧼ 𝘽𝘼𝙉𝙆 ⧽⧽⧽───•*

> @${m.sender.split('@')[0]}

> *• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* _${user.diamond} 💎_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐁𝐚𝐧𝐜𝐨:* _${user.bank} 🪙_

> *•───⧼⧼⧼ 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 ⧽⧽⧽───•*

> *• ${usedPrefix}bank <cantidad>* - Depositar
> *• ${usedPrefix}retirar <cantidad>* - Retirar
> *• ${usedPrefix}balance* - Ver balance

> *•───────────────•*
`)
  }

  let cantidad = parseInt(text)
  if (isNaN(cantidad)) return m.reply(`> ❌ *Cantidad inválida*`)
  if (cantidad < 1) return m.reply(`> ❌ *Mínimo 1 🪙*`)
  if (cantidad > user.saes) return m.reply(`> ❌ *No tienes suficientes Saes*\n> *Tienes:* ${user.saes} 🪙`)

  user.saes -= cantidad
  user.bank += cantidad

  m.reply(`
> *•───⧼⧼⧼ 𝘿𝙀𝙋𝙊𝙎𝙄𝙏𝙊 ⧽⧽⧽───•*

> ✅ *Depósito exitoso*

> *• 𝐂𝐚𝐧𝐭𝐢𝐝𝐚𝐝:* _${cantidad} 🪙_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐁𝐚𝐧𝐜𝐨:* _${user.bank} 🪙_

> *"Tu dinero está seguro en el banco"*
> *•───────────────•*
`)
}

handler.help = ["bank <cantidad>"]
handler.tags = ["rpg"]
handler.command = ["bank", "depositar"]
export default handler