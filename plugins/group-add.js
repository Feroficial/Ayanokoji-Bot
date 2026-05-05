let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #α∂∂ <núмєяσ>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* #α∂∂ 59177474230

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  let number = args[0].replace(/\D/g, '')
  if (!number) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ нúмєяσ 木 ιηνáℓι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Vєяιƒι¢α єℓ núмєяσ ιηтяσ∂υ¢ι∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  let jid = number + '@s.whatsapp.net'

  try {
    await m.react('🕓')
    await conn.groupParticipantsUpdate(m.chat, [jid], 'add')
    await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕυαяισ 木 αgяєgα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usuario:* ${number}
> ₊· ⫏⫏ ㅤ *⚡ Acción:* Agregado al grupo

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 αgяєgαя ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${e.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }
}

handler.help = ['add']
handler.tags = ['group']
handler.command = ['add', 'agregar']
handler.group = true
handler.admin = true

export default handler