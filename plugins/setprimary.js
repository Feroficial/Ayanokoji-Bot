// setprimary.js - Elegir qué bot es el principal (con mención)
let handler = async (m, { conn, isOwner, args }) => {
  if (!isOwner) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕσℓσ 木 σωηєя ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ єℓ *¢яєα∂σя* ρυє∂є υѕαя єѕтє ¢σмαη∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())

  let mention = m.mentionedJid[0]
  let opcion = args[0]?.toLowerCase()
  
  if (!mention) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ѕєтρяιмαяу @вσт ση/σƒƒ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (opcion === 'on') {
    if (!global.db.data.settings[mention]) global.db.data.settings[mention] = {}
    global.db.data.settings[mention].primary = true
    await m.reply(`
ㅤ    ꒰  ㅤ 👑 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ρяιмαяισ ㅤ 性

> ₊· ⫏⫏ ㅤ *🤖 Bot mencionado:* @${mention.split('@')[0]}
> ₊· ⫏⫏ ㅤ *✅ Estado:* PRINCIPAL activado

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim(), { mentions: [mention] })
  } 
  else if (opcion === 'off') {
    if (!global.db.data.settings[mention]) global.db.data.settings[mention] = {}
    global.db.data.settings[mention].primary = false
    await m.reply(`
ㅤ    ꒰  ㅤ 🔒 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ѕє¢υη∂αяισ ㅤ 性

> ₊· ⫏⫏ ㅤ *🤖 Bot mencionado:* @${mention.split('@')[0]}
> ₊· ⫏⫏ ㅤ *❌ Estado:* PRINCIPAL desactivado

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim(), { mentions: [mention] })
  }
  else {
    await m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ѕєтρяιмαяу @вσт ση/σƒƒ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
}

handler.help = ['setprimary']
handler.tags = ['owner']
handler.command = ['setprimary']
handler.rowner = true

export default handler