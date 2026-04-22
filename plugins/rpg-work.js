let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) user = { coin: 100 }
  if (user.coin === undefined) user.coin = 100

  let now = Date.now()
  let cooldown = 180000 // 3 minutos

  if (user.lastwork && now - user.lastwork < cooldown) {
    let time = Math.ceil((cooldown - (now - user.lastwork)) / 1000)
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ ⏳ 𝐄𝐒𝐏𝐄𝐑𝐀 𝐔𝐍 𝐌𝐎𝐌𝐄𝐍𝐓𝐎 ⏳
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Descansa un poco*
◈ *Vuelve en ${minutes}m ${seconds}s*

*"El trabajo excesivo agota la mente"*
━━━━━━━━━━━━━━━━━━━━━━`)
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
    { nombre: "Panadero", ganancia: 7, perdida: 2, mensaje: "🥖 Vendiste todo el pan" },
    { nombre: "Mecánico", ganancia: 14, perdida: 4, mensaje: "🔧 Reparaste un auto" },
    { nombre: "Electricista", ganancia: 13, perdida: 4, mensaje: "⚡ Arreglaste un corto" },
    { nombre: "Pintor", ganancia: 11, perdida: 3, mensaje: "🎨 Terminaste un mural" },
    { nombre: "Escritor", ganancia: 9, perdida: 3, mensaje: "✍️ Terminaste un capítulo" },
    { nombre: "Músico", ganancia: 12, perdida: 4, mensaje: "🎸 Tocaste en un concierto" },
    { nombre: "Fotógrafo", ganancia: 10, perdida: 3, mensaje: "📸 Vendiste varias fotos" },
    { nombre: "Diseñador", ganancia: 15, perdida: 5, mensaje: "🎨 Terminaste un diseño" },
    { nombre: "Traductor", ganancia: 8, perdida: 2, mensaje: "📖 Tradujiste un documento" }
  ]

  let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)]
  let esExitoso = Math.random() > 0.3 // 70% éxito, 30% fracaso

  if (esExitoso) {
    user.coin += trabajo.ganancia
    m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ ✅ 𝐓𝐑𝐀𝐁𝐀𝐉𝐎 𝐄𝐗𝐈𝐓𝐎𝐒𝐎 ✅
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Trabajo:* ${trabajo.nombre}
◈ *Resultado:* ${trabajo.mensaje}
◈ *Ganancia:* +${trabajo.ganancia} 🪙

◈ *Total:* ${user.coin} 🪙

*"El esfuerzo tiene recompensa"*
━━━━━━━━━━━━━━━━━━━━━━`)
  } else {
    user.coin -= trabajo.perdida
    if (user.coin < 0) user.coin = 0
    m.reply(`
╭━━━━━━━━━━━━━━━━━━━━╮
┃ ❌ 𝐓𝐑𝐀𝐁𝐀𝐉𝐎 𝐅𝐀𝐋𝐋𝐈𝐃𝐎 ❌
╰━━━━━━━━━━━━━━━━━━━━╯

◈ *Trabajo:* ${trabajo.nombre}
◈ *Problema:* Algo salió mal
◈ *Perdida:* -${trabajo.perdida} 🪙

◈ *Total:* ${user.coin} 🪙

*"Hasta el mejor estratega falla"*
━━━━━━━━━━━━━━━━━━━━━━`)
  }

  user.lastwork = now
}

handler.help = ["work"]
handler.tags = ["rpg"]
handler.command = ["work", "trabajar", "w"]

export default handler