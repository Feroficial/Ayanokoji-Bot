// top.js - Ranking global de usuarios con más USD
let handler = async (m, { conn, args }) => {
  let pagina = parseInt(args[0]) || 1
  let usuarios = []
  
  for (let [id, user] of Object.entries(global.db.data.users)) {
    if (user.USD > 0 && id.includes('@s.whatsapp.net')) {
      usuarios.push({
        jid: id,
        nombre: await conn.getName(id).catch(() => id.split('@')[0]),
        usd: user.USD || 0
      })
    }
  }
  
  usuarios.sort((a, b) => b.usd - a.usd)
  
  let itemsPorPagina = 10
  let totalPaginas = Math.ceil(usuarios.length / itemsPorPagina)
  
  if (pagina < 1) pagina = 1
  if (pagina > totalPaginas) pagina = totalPaginas
  
  let inicio = (pagina - 1) * itemsPorPagina
  let fin = inicio + itemsPorPagina
  let topUsuarios = usuarios.slice(inicio, fin)
  
  let texto = `
ㅤ    ꒰  ㅤ 🏆 ㅤ *TOP GLOBAL USD* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яαηкιηg 木 мσηє∂αѕ ㅤ 性

> ₊· ⫏⫏ ㅤ *📊 Total usuarios:* ${usuarios.length}
> ₊· ⫏⫏ ㅤ *📌 Página:* ${pagina}/${totalPaginas}
> ₊· ⫏⫏ ㅤ *💰 Moneda:* USD

${topUsuarios.map((user, i) => {
  let puesto = inicio + i + 1
  let medalla = puesto === 1 ? '🥇' : puesto === 2 ? '🥈' : puesto === 3 ? '🥉' : '📌'
  return `> ${medalla} *${puesto}.* ${user.nombre}\n> 💰 ${user.usd.toLocaleString()} USD`
}).join('\n\n')}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *Uѕα:* #тσρ <ρágiηα>
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim()
  
  await m.reply(texto)
}

handler.help = ['top']
handler.tags = ['economy']
handler.command = ['top', 'ranking', 'leaderboard']

export default handler