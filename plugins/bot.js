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
    chat.botEnabled = true
    await conn.sendMessage(m.chat, { 
      text: `
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 α¢тινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт ѕє α¢тινó єη *${grupoNombre}*
> ₊· ⫏⫏ ㅤ Yα ρυє∂єη υѕαя ℓσѕ ¢σмαη∂σѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
      `.trim()
    })
  } 
  else if (opcion === 'off') {
    chat.botEnabled = false
    await conn.sendMessage(m.chat, { 
      text: `
ㅤ    ꒰  ㅤ 🚫 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ∂єѕα¢тινα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт ѕє ∂єѕα¢тινó єη *${grupoNombre}*
> ₊· ⫏⫏ ㅤ Usα *#вσт ση* ραяα α¢тιναяℓσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
      `.trim()
    })
  }
  else {
    let estado = chat.botEnabled !== false ? '✅ ACTIVADO' : '❌ DESACTIVADO'
    await conn.sendMessage(m.chat, { 
      text: `
ㅤ    ꒰  ㅤ 📊 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єѕтα∂σ 木 вσт ㅤ 性

> ₊· ⫏⫏ ㅤ *📌 Estado en ${grupoNombre}:* ${estado}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
      `.trim()
    })
  }
}

handler.help = ['bot']
handler.tags = ['group']
handler.command = ['bot']
handler.group = true

export default handler