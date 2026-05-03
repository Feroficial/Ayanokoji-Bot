import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let nomorown1 = '59177474230'
  let nomorown2 = '573245517485'
  let nomorown3 = '529711232646'
  
  let bio1 = (await conn.fetchStatus(nomorown1 + '@s.whatsapp.net').catch(_ => {}))?.status || '🎭 Cяєα∂σя ρяιη¢ιραℓ - ℓʏσηη'
  let bio2 = (await conn.fetchStatus(nomorown2 + '@s.whatsapp.net').catch(_ => {}))?.status || '🌸 Cσ-¢яєα∂σяα - ∂αηηу'
  let bio3 = (await conn.fetchStatus(nomorown3 + '@s.whatsapp.net').catch(_ => {}))?.status || '🌸 Cσℓαвσяα∂σяα - ℓυz'
  let biobot = (await conn.fetchStatus(conn.user.jid).catch(_ => {}))?.status || 'αℓуα - вσт - Cяєα∂σ ρσя ℓʏσηη'

  await sendContactArray(conn, m.chat, [
    [`${nomorown1}`, `🎭 ℓʏσηη`, `Cяєα∂σя ρяιη¢ιραℓ`, `🎭 Dєѕαяяσℓℓα∂σя`, `lyonn@alyabot.com`, `🇧🇴 Bσℓινια`, `https://dvlyonn.onrender.com`, bio1],
    [`${nomorown2}`, `🌸 ∂αηηу`, `Cσ-¢яєα∂σяα`, `🌸 Cσяєα∂σяα`, `danny@alyabot.com`, `🇨🇴 Colombia`, `https://dvlyonn.onrender.com`, bio2],
    [`${nomorown3}`, `🌸 ℓυz`, `Cσℓαвσяα∂σяα`, `🌸 A∂мιηιѕтяα∂σяα`, `luz@alyabot.com`, `🇲🇽 México`, `https://dvlyonn.onrender.com`, bio3],
    [`${conn.user.jid.split('@')[0]}`, `αℓуα - вσт`, `вσт σƒι¢ιαℓ`, `🤖 Aѕιѕтєηтє`, `bot@alyabot.com`, `🌐 Online`, `https://dvlyonn.onrender.com`, biobot]
  ], m)

  throw false
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador', 'dueño']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  let contacts = []

  for (let [number, name, org, label, email, region, url, note] of data) {
    number = number.replace(/[^0-9]/g, '')

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:${name.replace(/\n/g, '\\n')};;;;
FN:${name.replace(/\n/g, '\\n')}
ORG:${org}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL;type=INTERNET:${email}
ADR:;;${region};;;;
URL:${url}
NOTE:${note}
END:VCARD`.trim()

    contacts.push({ vcard, displayName: name })
  }

  return await conn.sendMessage(
    jid,
    {
      contacts: {
        displayName: (contacts.length > 1 ? `${contacts.length} ¢σηтα¢тσѕ` : contacts[0].displayName) || null,
        contacts,
      }
    },
    {
      quoted,
      ...options
    }
  )
}