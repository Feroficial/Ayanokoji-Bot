// setprimary.js - Alternar bot principal con solo mención
let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕσℓσ 木 σωηєя ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ єℓ *¢яєα∂σя* ρυє∂є υѕαя єѕтє ¢σмαη∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())

  let mention = m.mentionedJid[0]
  
  if (!mention) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ѕєтρяιмαяу @вσт
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #ѕєтρяιмαяу @${conn.user.jid.split('@')[0]}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
  
  // Asegurar que el JID tenga el formato correcto
  let botJid = mention
  if (!botJid.includes('@s.whatsapp.net') && !botJid.includes('@c.us')) {
    botJid = botJid.split('@')[0] + '@s.whatsapp.net'
  }
  
  if (!global.db.data.settings[botJid]) {
    global.db.data.settings[botJid] = {}
  }
  
  // Alternar estado
  let estadoActual = global.db.data.settings[botJid].primary !== false
  let nuevoEstado = !estadoActual
  
  global.db.data.settings[botJid].primary = nuevoEstado
  
  await m.reply(`
ㅤ    ꒰  ㅤ ${nuevoEstado ? '👑' : '🔒'} ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ${nuevoEstado ? 'ρяιмαяισ' : 'ѕє¢υη∂αяισ'} ㅤ 性

> ₊· ⫏⫏ ㅤ *🤖 Bot:* ${botJid.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📌 Estado:* ${nuevoEstado ? '✅ PRINCIPAL' : '❌ SECUNDARIO'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['setprimary']
handler.tags = ['owner']
handler.command = ['setprimary']
handler.rowner = true

export default handler