// setprimary.js - Activar/Desactivar un bot específico
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
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #ѕєтρяιмαяу @${conn.user.jid.split('@')[0]} ση

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  if (opcion !== 'on' && opcion !== 'off') return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ σρ¢ιση 木 ιηνáℓι∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Usa *on* para activar o *off* para desactivar

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  // Asegurar formato correcto del JID
  let botJid = mention
  if (!botJid.includes('@s.whatsapp.net') && !botJid.includes('@c.us')) {
    botJid = botJid.split('@')[0] + '@s.whatsapp.net'
  }
  
  if (!global.db.data.settings[botJid]) {
    global.db.data.settings[botJid] = {}
  }
  
  if (opcion === 'on') {
    global.db.data.settings[botJid].primary = true
    await m.reply(`
ㅤ    ꒰  ㅤ 👑 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ρяιмαяισ ㅤ 性

> ₊· ⫏⫏ ㅤ *🤖 Bot:* ${botJid.split('@')[0]}
> ₊· ⫏⫏ ㅤ *✅ Estado:* PRINCIPAL activado

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  } else {
    global.db.data.settings[botJid].primary = false
    await m.reply(`
ㅤ    ꒰  ㅤ 🔒 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ѕє¢υη∂αяισ ㅤ 性

> ₊· ⫏⫏ ㅤ *🤖 Bot:* ${botJid.split('@')[0]}
> ₊· ⫏⫏ ㅤ *❌ Estado:* PRINCIPAL desactivado

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