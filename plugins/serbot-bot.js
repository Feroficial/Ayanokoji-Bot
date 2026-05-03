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
    if (chat.botEnabled === true) return m.reply(`
ㅤ    ꒰  ㅤ ⚠️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σηє¢тα∂σ 木 yα ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт yα єѕтá α¢тινσ єη *${grupoNombre}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

    chat.botEnabled = true
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ση ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт ѕє α¢тινó єη *${grupoNombre}*
> ₊· ⫏⫏ ㅤ Yα ρυє∂єη υѕαя ℓσѕ ¢σмαη∂σѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  } 
  else if (opcion === 'off') {
    if (chat.botEnabled === false) return m.reply(`
ㅤ    ꒰  ㅤ ⚠️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ αραgα∂σ 木 yα ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт yα єѕтá αραgα∂σ єη *${grupoNombre}*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())

    chat.botEnabled = false
    await m.reply(`
ㅤ    ꒰  ㅤ 🚫 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 σƒƒ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ вσт ѕє αραgó єη *${grupoNombre}*
> ₊· ⫏⫏ ㅤ Usα *#вσт ση* ραяα α¢тιναяℓσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
  else {
    await m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #вσт ση/σƒƒ

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