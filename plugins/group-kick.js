let handler = async (m, { conn, args, usedPrefix, command, participants, groupMetadata, isAdmin, isBotAdmin, isOwner }) => {

  if (!m.isGroup) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 gяυρσ ㅤ 性

> ₊· ⫏⫏ ㅤ Eѕтє ¢σмαη∂σ ѕσℓσ ƒυη¢ισηα єη gяυρσѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

  if (!isAdmin && !isOwner) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ 🔒 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ρєяміѕσ 木 ∂єηєgα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Sσℓσ ℓσѕ *α∂міηѕ* ρυє∂єη υѕαя єѕтє ¢σмαη∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)


  if (!isBotAdmin) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ ⚠️ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ вσт 木 ηo α∂міη ㅤ 性

> ₊· ⫏⫏ ㅤ Nє¢єѕιтσ ѕєя *α∂міη* єη єℓ gяυρσ ραяα єχρυℓѕαя

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

  // ── Obtener usuario a kickear ──
  // Puede ser por mención (@tag) o respondiendo un mensaje
  let target = m.mentionedJid?.[0] || (m.quoted && m.quoted.sender) || null

  // Si no hay mención ni respuesta, verificar si se pasó número como argumento
  if (!target && args[0]) {
    const num = args[0].replace(/[^0-9]/g, '')
    if (num) target = num + '@s.whatsapp.net'
  }

  if (!target) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ ❓ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 ¢σяяє¢тσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕo:* ${usedPrefix}kick @usuario
> ₊· ⫏⫏ ㅤ *O:* responde el mensaje del usuario

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

  // ── Verificar que el target esté en el grupo ──
  const estaEnGrupo = participants.some(p => (p.id || p.jid) === target)
  if (!estaEnGrupo) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕυαяισ 木 ησ єη¢σηтяα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Eѕє υѕυαяισ ησ єѕтá єη єℓ gяυρσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

  // ── Evitar kickear al bot mismo ──
  const botJid = conn.user?.jid || conn.user?.id
  if (target === botJid || target.split('@')[0] === botJid?.split('@')[0]) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ 😅 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 αυтσ-ραтα∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ρυє∂σ єχρυℓѕαямє α мí міѕмσ 😂

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

 
  const targetData = participants.find(p => (p.id || p.jid) === target) || {}
  const targetIsAdmin = targetData.admin === 'admin' || targetData.admin === 'superadmin'

  if (targetIsAdmin && !isOwner) return conn.reply(m.chat, `
ㅤ    ꒰  ㅤ 👑 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ρяσтє¢¢ιóη 木 α∂міη ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ρυє∂єѕ єχρυℓѕαя α υη *α∂міηιѕтяα∂σя*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim(), m)

  // ── Obtener nombre del target ──
  const targetName = await conn.getName(target) || target.split('@')[0]

  // ── Ejecutar el kick ──
  try {
    await conn.sendMessage(m.chat, { react: { text: '👢', key: m.key } })
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')

    await conn.reply(m.chat, `
ㅤ    ꒰  ㅤ 👢 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єχρυℓѕα∂σ 木 єχιтσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕυαяισ:* ${targetName}
> ₊· ⫏⫏ ㅤ *Núмєяσ:* ${target.split('@')[0]}
> ₊· ⫏⫏ ㅤ *Gяυρσ:* ${groupMetadata.subject || 'Grupo'}
> ₊· ⫏⫏ ㅤ *Pσя:* ${await conn.getName(m.sender) || m.sender.split('@')[0]}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim(), m)

  } catch (e) {
    await conn.reply(m.chat, `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 єχρυℓѕιóη ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ρυ∂є єχρυℓѕαя αℓ υѕυαяισ
> ₊· ⫏⫏ ㅤ *Eяяσя:* ${e.message || 'Desconocido'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim(), m)
  }
}

handler.help = ['kick @usuario']
handler.tags = ['group']
handler.command = ['kick', 'expulsar', 'echar']
handler.group = true      // Solo funciona en grupos
handler.admin = true      // Quien lo usa debe ser admin
handler.botAdmin = true   // El bot debe ser admin

export default handler