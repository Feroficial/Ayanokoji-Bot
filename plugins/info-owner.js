import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  // CREADORA PRINCIPAL (Colombia)
  let nomorown = '573245517485'
  // TÚ COLABORADOR (Bolivia) - LYONN
  let nomorcolab = '59177474230'
  
  let bioOwn = (await conn.fetchStatus(nomorown + '@s.whatsapp.net').catch(_ => {}))?.status || '🌸 Creadora'
  let bioColab = (await conn.fetchStatus(nomorcolab + '@s.whatsapp.net').catch(_ => {}))?.status || '🎭 Colaborador'

  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `🌸 Danny Yulieth`, `🌸 CREADORA`, `🌸`, `danny@danny.com`, `🇨🇴 Colombia`, bioOwn],
    [`${nomorcolab}`, `🎭 Lyonn`, `🎭 COLABORADOR`, `🎭`, `lyonn@lyonn.com`, `🇧🇴 Bolivia`, bioColab]
  ], m)

  throw false
}

handler.help = ["creadora", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creadora']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  let contacts = []

  for (let [number, name, org, label, email, region, note] of data) {
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
NOTE:${note}
END:VCARD`.trim()

    contacts.push({ vcard, displayName: name })
  }

  return await conn.sendMessage(
    jid,
    {
      contacts: {
        displayName: (contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName) || null,
        contacts,
      }
    },
    {
      quoted,
      ...options
    }
  )
}