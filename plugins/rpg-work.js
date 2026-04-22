let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { saes: 100 }
  if (user.saes === undefined) user.saes = 100

  let now = Date.now()
  let cooldown = 180000

  if (user.lastwork && now - user.lastwork < cooldown) {
    let time = Math.ceil((cooldown - (now - user.lastwork)) / 1000)
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return m.reply(`
> *•───⧼⧼⧼ 𝙴𝚂𝙿𝙴𝚁𝙰 ⧽⧽⧽───•*

> ⏳ *Espera ${minutes}m ${seconds}s para trabajar*

> *"El trabajo excesivo agota la mente"*
> *•───────────────•*
`)
  }

  let trabajos = [
    { nombre: "Programador", ganancia: 15, perdida: 5, mensaje: "💻 Arreglaste un bug crítico" },
    { nombre: "Minero", ganancia: 20, perdida: 8, mensaje: "⛏️ Encontraste una veta de oro" },
    { nombre: "Camarero", ganancia: 10, perdida: 3, mensaje: "🍽️ Atendiste a todos los clientes" },
    { nombre: "Repartidor", ganancia: 12, perdida: 4, mensaje: "🛵 Entregaste todos los pedidos" },
    { nombre: "Profesor", ganancia: 18, perdida: 6, mensaje: "📚 Diste una clase excelente" },
    { nombre: "Médico", ganancia: 25, perdida: 10, mensaje: "🏥 Salvaste una vida" },
    { nombre: "Policía", ganancia: 22, perdida: 8, mensaje: "👮 Atrapaste a un criminal" },
    { nombre: "Bombero", ganancia: 20, perdida: 7, mensaje: "🧯 Apagaste un incendio" },
    { nombre: "Constructor", ganancia: 16, perdida: 5, mensaje: "🏗️ Terminaste una obra" },
    { nombre: "Pescador", ganancia: 8, perdida: 2, mensaje: "🎣 Pesca del día" },
    { nombre: "Granjero", ganancia: 10, perdida: 3, mensaje: "🌾 Cosecha exitosa" },
    { nombre: "Panadero", ganancia: 7, perdida: 2, mensaje: "🥖 Vendiste todo el pan" }
  ]

  let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)]
  let esExitoso = Math.random() > 0.3

  if (esExitoso) {
    user.saes += trabajo.ganancia
    m.reply(`
> *•───⧼⧼⧼ 𝚃𝚁𝙰𝙱𝙰𝙹𝙾 𝙴𝚇𝙸𝚃𝙾𝚂𝙾 ⧽⧽⧽───•*

> ✅ *${trabajo.mensaje}*

> *• 𝐓𝐫𝐚𝐛𝐚𝐣𝐨:* ${trabajo.nombre}
> *• 𝐆𝐚𝐧𝐚𝐧𝐜𝐢𝐚:* +${trabajo.ganancia} 🪙
> *• 𝐒𝐚𝐞𝐬:* ${user.saes} 🪙

> *"El esfuerzo tiene recompensa"*
> *•───────────────•*
`)
  } else {
    user.saes -= trabajo.perdida
    if (user.saes < 0) user.saes = 0
    m.reply(`
> *•───⧼⧼⧼ 𝚃𝚁𝙰𝙱𝙰𝙹𝙾 𝙵𝙰𝙻𝙻𝙸𝙳𝙾 ⧽⧽⧽───•*

> ❌ *Algo salió mal en tu trabajo*

> *• 𝐓𝐫𝐚𝐛𝐚𝐣𝐨:* ${trabajo.nombre}
> *• 𝐏𝐞𝐫𝐝𝐢𝐝𝐚:* -${trabajo.perdida} 🪙
> *• 𝐒𝐚𝐞𝐬:* ${user.saes} 🪙

> *"Hasta el mejor estratega falla"*
> *•───────────────•*
`)
  }

  user.lastwork = now
}

handler.help = ["work"]
handler.tags = ["rpg"]
handler.command = ["work", "trabajar", "w"]
export default handler