let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
  if (!m.quoted && !text) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ 1:* ${usedPrefix + command} <тєхтσ>
> ₊· ⫏⫏ ㅤ *Uѕσ 2:* Rєѕρση∂є αℓ мєηѕαנє + ${usedPrefix + command}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  let mensaje = ''
  
  if (m.quoted) {
    mensaje = m.quoted.text || m.quoted.body || ''
  } else if (text) {
    mensaje = text
  }

  if (!mensaje) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ѕιη тєхтσ ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ єηcσηтяé ηα∂α ραяα єтιqυєтαя

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.help = ['tag']
handler.tags = ['group']
handler.command = ['tag', 'etiquetar', 'decir']

export default handler