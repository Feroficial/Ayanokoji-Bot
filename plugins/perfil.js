// plugins/perfil.js
let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  
  if (!user || !user.registered) {
    return m.reply(`
🌸 *NO ESTÁS REGISTRADA* 🌸

> 💗 *Usa:* ${usedPrefix}registrar nombre.edad
> 🎀 *Ejemplo:* ${usedPrefix}registrar Danny.17

🌸 *"Regístrate para crear tu perfil"* 🌸
`)
  }
  
  let regDate = user.regTime ? new Date(user.regTime).toLocaleDateString('es-ES') : 'Desconocida'
  
  let texto = `
🌸 *— ✧ 𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄 𝐔𝐒𝐔𝐀𝐑𝐈𝐀 ✧ —* 🌸

> 🎀 *Nombre:* ${user.name}
> 💗 *Edad:* ${user.age} años
> ✨ *Rol:* ${user.role}
> 🌸 *ID:* ${m.sender.split('@')[0]}
> 📅 *Registro:* ${regDate}

> 📊 *Estadísticas:*
> 💎 *Moneditas:* ${user.monedas || 0}
> ⭐ *EXP:* ${user.exp || 0}
> 🏆 *Nivel:* ${user.level || 1}

🌸 *"Sigue así, guerrera"* 🌸
`
  await m.reply(texto)
}

handler.help = ['perfil']
handler.tags = ['main']
handler.command = /^(perfil|profile|mperfil)$/i

export default handler