let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 100, diamond: 0 }
  if (user.saes === undefined) user.saes = 100
  if (user.diamond === undefined) user.diamond = 0

  if (!text) {
    return m.reply(`
> *•───⧼⧼⧼ 𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ⧽⧽⧽───•*

> *• 𝐏𝐫𝐞𝐜𝐢𝐨:* _100 Saes = 1 💎_
> *• 𝐓𝐮𝐬 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐓𝐮𝐬 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬:* _${user.diamond} 💎_

> *•───⧼⧼⧼ 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 ⧽⧽⧽───•*

> *• ${usedPrefix}buy <cantidad>* - Comprar diamantes
> *• ${usedPrefix}buyall* - Comprar todos

> *•───────────────•*
`)
  }

  if (command === "buyall") {
    let max = Math.floor(user.saes / 100)
    if (max < 1) return m.reply(`> ❌ *No tienes suficientes Saes*\n> *Necesitas 100 Saes por diamante*`)

    let costo = max * 100
    user.saes -= costo
    user.diamond += max

    return m.reply(`
> *•───⧼⧼⧼ 𝘾𝙊𝙈𝙋𝙍𝘼 𝙈𝘼𝙎𝙄𝙑𝘼 ⧽⧽⧽───•*

> ✅ *Compraste ${max} diamantes*

> *• 𝐂𝐨𝐬𝐭𝐨:* _${costo} 🪙_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬:* _${user.diamond} 💎_

> *•───────────────•*
`)
  }

  let cantidad = parseInt(text)
  if (isNaN(cantidad)) return m.reply(`> ❌ *Cantidad inválida*`)
  if (cantidad < 1) return m.reply(`> ❌ *Mínimo 1 diamante*`)

  let costo = cantidad * 100
  if (costo > user.saes) return m.reply(`> ❌ *No tienes suficientes Saes*\n> *Necesitas:* ${costo} 🪙\n> *Tienes:* ${user.saes} 🪙`)

  user.saes -= costo
  user.diamond += cantidad

  m.reply(`
> *•───⧼⧼⧼ 𝘾𝙊𝙈𝙋𝙍𝘼 𝙀𝙓𝙄𝙏𝙊𝙎𝘼 ⧽⧽⧽───•*

> ✅ *Compraste ${cantidad} diamantes*

> *• 𝐂𝐨𝐬𝐭𝐨:* _${costo} 🪙_
> *• 𝐒𝐚𝐞𝐬:* _${user.saes} 🪙_
> *• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬:* _${user.diamond} 💎_

> *•───────────────•*
`)
}

handler.help = ["buy <cantidad>", "buyall"]
handler.tags = ["rpg"]
handler.command = ["buy", "comprar", "buyall"]
export default handler