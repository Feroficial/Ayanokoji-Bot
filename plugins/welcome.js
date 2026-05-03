let handler = async (m, { conn, isAdmin, args }) => {
  if (!m.isGroup) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ɢяυρσ ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ єη gяυρσѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (!isAdmin) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α∂мιη 木 яєqυєяι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Nєcєѕιтαѕ ѕєя α∂мιη

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  const chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}
  
  const opcion = args[0]?.toLowerCase()
  
  if (opcion === 'on') {
    chat.welcome = true
    m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ωєℓcσмє 木 αcтινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Lαѕ вιєηνєηι∂αѕ fυєяση αcтινα∂αѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  } else if (opcion === 'off') {
    chat.welcome = false
    m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ωєℓcσмє 木 ∂єѕαcтινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Lαѕ вιєηνєηι∂αѕ fυєяση ∂єѕαcтινα∂αѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  } else {
    return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #welcome on/off

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }
}

handler.help = ['welcome']
handler.tags = ['group']
handler.command = ['welcome', 'bienvenida']
handler.group = true

export default handler