// bot.js - Activar/Desactivar el bot en un grupo específico
let handler = async (m, { conn, isAdmin, isOwner, args }) => {
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

  const opcion = args[0]?.toLowerCase()
  const grupoNombre = await conn.getName(m.chat)

  if (opcion === 'on') {
    global.db.data.chats[m.chat].botEnabled = true
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 α¢тινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *📌 Grupo:* ${grupoNombre}
> ₊· ⫏⫏ ㅤ *🤖 Estado:* ACTIVADO
> ₊· ⫏⫏ ㅤ Yα ρυє∂єη υѕαя ℓσѕ ¢σмαη∂σѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  } 
  else if (opcion === 'off') {
    global.db.data.chats[m.chat].botEnabled = false
    await m.reply(`
ㅤ    ꒰  ㅤ 🚫 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ∂єѕα¢тινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *📌 Grupo:* ${grupoNombre}
> ₊· ⫏⫏ ㅤ *🤖 Estado:* DESACTIVADO
> ₊· ⫏⫏ ㅤ Usα *#вσт ση* ραяα α¢тιναяℓσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
  else {
    let estado = global.db.data.chats[m.chat].botEnabled !== false ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    await m.reply(`
ㅤ    ꒰  ㅤ 📊 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єѕтα∂σ 木 вσт ㅤ 性

> ₊· ⫏⫏ ㅤ *📌 Grupo:* ${grupoNombre}
> ₊· ⫏⫏ ㅤ *🤖 Estado:* ${estado}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
}

handler.help = ['bot']
handler.tags = ['group']
handler.command = ['bot']
handler.group = true

export default handler