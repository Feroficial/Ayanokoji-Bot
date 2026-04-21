import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let nomorown = '59177474230'
  let nomorbot = '584160066967'
  let bio = (await conn.fetchStatus(nomorown + '@s.whatsapp.net').catch(_ => {}))?.status || '🎭 Creador del aula de élite'
  let biobot = (await conn.fetchStatus(conn.user.jid).catch(_ => {}))?.status || '🎭 Kiyotaka Ayanokoji - El aula de élite'

  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `🎭 LyonnOFC`, `🎭 CREADOR`, `🎭 DevLyonn`, `devlyonn@kiyotaka.com`, `🇧🇴 Bolivia`, bio],
    [`${nomorbot}`, `🎭 Kiyotaka Ayanokoji`, `🎭 EL AULA DE ÉLITE`, `🤖 Bot oficial`, `bot@kiyotaka.com`, `🌐 Online`, biobot]
  ], m)

  throw false
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador']

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
