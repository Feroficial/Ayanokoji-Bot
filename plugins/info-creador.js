import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let nomorown1 = '59177474230'
  let nomorown2 = '573245517485'
  let nomorown3 = '529711232646'
  
  let bio1 = (await conn.fetchStatus(nomorown1 + '@s.whatsapp.net').catch(_ => {}))?.status || '🎭 Cяєα∂σя ρяιη¢ιραℓ - ℓʏσηη'
  let bio2 = (await conn.fetchStatus(nomorown2 + '@s.whatsapp.net').catch(_ => {}))?.status || '🌸 Cσ-¢яєα∂σяα - ∂αηηу'
  let bio3 = (await conn.fetchStatus(nomorown3 + '@s.whatsapp.net').catch(_ => {}))?.status || '🌸 Cσℓαвσяα∂σяα - ℓυz'
  let biobot = (await conn.fetchStatus(conn.user.jid).catch(_ => {}))?.status || 'αℓуα - вσт - Cяєα∂σ ρσя ℓʏσηη'

  let texto = `
ㅤ    ꒰  ㅤ 👑 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ σωηєя 木 ℓιѕтα ㅤ 性

> ₊· ⫏⫏ ㅤ *🎭 ℓʏσηη* - Cяєα∂σя ρяιη¢ιραℓ
> ₊· ⫏⫏ ㅤ 📱 wa.me/${nomorown1}
> ₊· ⫏⫏ ㅤ 📝 ${bio1}

> ₊· ⫏⫏ ㅤ *🌸 ∂αηηу* - Cσ-¢яєα∂σяα
> ₊· ⫏⫏ ㅤ 📱 wa.me/${nomorown2}
> ₊· ⫏⫏ ㅤ 📝 ${bio2}

> ₊· ⫏⫏ ㅤ *🌸 ℓυz* - Cσℓαвσяα∂σяα
> ₊· ⫏⫏ ㅤ 📱 wa.me/${nomorown3}
> ₊· ⫏⫏ ㅤ 📝 ${bio3}

ㅤ    ꒰  ㅤ 🔗 ㅤ *API OFICIAL* ㅤ ⫏⫏  ꒱
> ₊· ⫏⫏ ㅤ 🌐 https://dvlyonn.onrender.com

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: ℓʏσηη
  `.trim()

  await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, { quoted: m })
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador', 'dueño']

export default handler