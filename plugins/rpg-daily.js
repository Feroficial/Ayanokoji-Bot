let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 0 }
  if (user.saes === undefined) user.saes = 0

  let now = Date.now()
  let cooldown = 86400000

  if (user.lastdaily && now - user.lastdaily < cooldown) {
    let time = Math.ceil((cooldown - (now - user.lastdaily)) / 3600000)
    return m.reply(`
> *•───⧼⧼⧼ 𝙴𝚂𝙿𝙴𝚁𝙰 ⧽⧽⧽───•*

> 🎁 *Ya reclamaste tu daily*
> *• Vuelve en ${time} horas*
> *•───────────────•*
`)
  }

  let bonus = 100
  user.saes += bonus
  user.lastdaily = now

  m.reply(`
> *•───⧼⧼⧼ 𝙳𝙰𝙸𝙻𝚈 ⧽⧽⧽───•*

> 🎁 *Recompensa diaria*

> *• +${bonus} 🪙*
> *• 𝐒𝐚𝐞𝐬:* ${user.saes} 🪙

> *"Vuelve mañana por más"*
> *•───────────────•*
`)
}

handler.help = ["daily"]
handler.tags = ["rpg"]
handler.command = ["daily"]
export default handler