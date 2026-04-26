// plugins/registro.js
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  
  if (!user) {
    user = {}
    global.db.data.users[m.sender] = user
  }
  
  if (user.registered === true) {
    return m.reply(`
🌸 *YA ESTÁS REGISTRADA* 🌸

> 💗 *Nombre:* ${user.name}
> 🎀 *Edad:* ${user.age} años
> ✨ *ID:* ${m.sender.split('@')[0]}

🌸 *"Ya formas parte de la familia"* 🌸
`)
  }
  
  if (!text) {
    return m.reply(`
🌸 *— ✧ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 ✧ —* 🌸

> 🎀 *Uso:* ${usedPrefix + command} <nombre.edad>
> 💗 *Ejemplo:* ${usedPrefix + command} Danny.17

🌸 *"Regístrate para acceder a funciones exclusivas"* 🌸
`)
  }
  
  let [nama, umur] = text.split('.')
  if (!nama || !umur) {
    return m.reply(`
🌸 *— ✧ 𝐅𝐎𝐑𝐌𝐀𝐓𝐎 𝐈𝐍𝐕Á𝐋𝐈𝐃𝐎 ✧ —* 🌸

> 💗 *Usa:* ${usedPrefix + command} nombre.edad
> 🎀 *Ejemplo:* ${usedPrefix + command} Danny.17

🌸 *"Nombre y edad separados por un punto"* 🌸
`)
  }
  
  let age = parseInt(umur)
  if (isNaN(age) || age < 5 || age > 100) {
    return m.reply(`
🌸 *— ✧ 𝐄𝐃𝐀𝐃 𝐈𝐍𝐕Á𝐋𝐈𝐃𝐀 ✧ —* 🌸

> 💗 *La edad debe ser un número entre 5 y 100*

🌸 *"Ingresa una edad válida"* 🌸
`)
  }
  
  user.name = nama.trim()
  user.age = age
  user.registered = true
  user.regTime = Date.now()
  
  // Rol según edad
  if (age <= 12) user.role = '🌸 Pequeña Aprendiz'
  else if (age <= 17) user.role = '🎀 Joven Promesa'
  else if (age <= 25) user.role = '✨ Guerrero Avanzado'
  else user.role = '🌸 Maestra Sabia'
  
  // Bonus de bienvenida
  user.monedas = (user.monedas || 0) + 50
  user.exp = (user.exp || 0) + 100
  user.level = user.level || 1
  
  await m.reply(`
🌸 *— ✧ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎 ✧ —* 🌸

> 🎀 *Nombre:* ${user.name}
> 💗 *Edad:* ${user.age} años
> ✨ *Rol:* ${user.role}
> 🌸 *ID:* ${m.sender.split('@')[0]}

> 🎁 *Bonus:*
> 💎 +50 moneditas
> ⭐ +100 EXP

🌸 *"¡Bienvenida a la familia, ${user.name}!"* 🌸
`)
}

handler.help = ['registrar', 'reg']
handler.tags = ['main']
handler.command = /^(registrar|reg)$/i

export default handler