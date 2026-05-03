let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ɢяυρσ ㅤ 性

> ₊· ⫏⫏ ㅤ Eѕтє cσмαη∂σ ѕσℓσ fυη¢ισηα єη gяυρσѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  // Verificar si es admin correctamente
  const groupMetadata = await conn.groupMetadata(m.chat)
  const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && p.admin !== null)
  
  if (!isAdmin && !m.isOwner) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α∂мιη 木 яєqυєяι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Nєcєѕιтαѕ ѕєя α∂мιηιѕтяα∂σя
> ₊· ⫏⫏ ㅤ *Tυ ιD:* ${m.sender.split('@')[0]}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim())

  if (!text) return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* ${usedPrefix + command} <тєхтσ>
> ₊· ⫏⫏ ㅤ *Vαяιαвℓєѕ ∂ιѕρσníвℓєѕ:*
> ₊· ⫏⫏ ㅤ @user - Nσмвяє ∂єℓ υѕυαяισ
> ₊· ⫏⫏ ㅤ @level - Nινєℓ ∂єℓ υѕυαяισ
> ₊· ⫏⫏ ㅤ @role - Rσℓ ∂єℓ υѕυαяισ
> ₊· ⫏⫏ ㅤ @count - Cαηтι∂α∂ ∂є мιємвяяσѕ
> ₊· ⫏⫏ ㅤ @group - Nσмвяє ∂єℓ gяυρσ

> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:*
${usedPrefix + command} Bienvenid@ @user al grupo @group

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())

  const chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}
  
  global.db.data.chats[m.chat].welcomeMessage = text
  
  await m.reply(`
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ cσηfιgυяα∂σ 木 єχιтσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Mєηѕαנє ∂є вιєηνєηι∂α:*
${text.substring(0, 200)}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
  `.trim())
}

handler.help = ['setwelcome']
handler.tags = ['group']
handler.command = ['setwelcome', 'setbienvenida']
handler.group = true

export default handler