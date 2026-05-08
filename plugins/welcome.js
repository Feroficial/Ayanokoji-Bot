// welcome.js - Activar/desactivar bienvenidas
let handler = async (m, { conn, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ɢяυρσ ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ єη gяυρσѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (!isAdmin && !isOwner) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α∂мιη 木 яєqυєяι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Nєcєѕιтαѕ ѕєя α∂мιη

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  const chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  global.db.data.chats[m.chat].welcome = !global.db.data.chats[m.chat].welcome
  
  const estado = global.db.data.chats[m.chat].welcome ? '✅ α¢тινα∂αѕ' : '❌ ∂єѕα¢тινα∂αѕ'

  await m.reply(`
ㅤ    ꒰  ㅤ ${global.db.data.chats[m.chat].welcome ? '✅' : '❌'} ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вιєηνєηι∂αѕ 木 ${global.db.data.chats[m.chat].welcome ? 'α¢тινα∂αѕ' : '∂єѕα¢тινα∂αѕ'} ㅤ 性

> ₊· ⫏⫏ ㅤ Lαѕ вιєηνєηι∂αѕ єѕтáη ${estado}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())
}

handler.help = ['welcome']
handler.tags = ['group']
handler.command = ['welcome', 'bienvenida']
handler.group = true

export default handler