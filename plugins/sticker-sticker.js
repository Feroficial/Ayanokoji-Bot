import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, args }) => {
  let stiker = null
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    if (/webp|image|video/g.test(mime)) {
      if (/video/.test(mime) && ((q.msg || q).seconds > 8)) {
        return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 νι∂єσ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ νι∂єσ ησ ρυє∂є ∂υяαя máѕ ∂є 8 ѕєgυη∂σѕ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
      }
      const media = await q.download()
      if (!media) return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ∂єѕ¢αяgα ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ѕє ρυ∂σ ∂єѕ¢αяgαя єℓ αя¢нινσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
      `.trim())
      
      const tmpPath = path.join('./tmp', `${Date.now()}.webp`)
      try {
        stiker = await sticker(
          media,
          false,
          global.packsticker || 'αℓуα - вσт',
          global.author || 'ℓʏσηη'
        )
        if (Buffer.isBuffer(stiker)) fs.writeFileSync(tmpPath, stiker)
      } catch (e) {
        let out
        if (/webp/.test(mime)) out = await webp2png(media)
        else if (/image/.test(mime)) out = await uploadImage(media)
        else if (/video/.test(mime)) out = await uploadFile(media)
        if (typeof out !== 'string') out = await uploadImage(media)
        stiker = await sticker(
          false,
          out,
          global.packsticker || 'αℓуα - вσт',
          global.author || 'ℓʏσηη'
        )
        if (Buffer.isBuffer(stiker)) fs.writeFileSync(tmpPath, stiker)
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(
          false,
          args[0],
          global.packsticker || 'αℓуα - вσт',
          global.author || 'ℓʏσηη'
        )
        const tmpPath = path.join('./tmp', `${Date.now()}.webp`)
        if (Buffer.isBuffer(stiker)) fs.writeFileSync(tmpPath, stiker)
      } else {
        return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єηℓα¢є 木 ιηνáℓι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ Eℓ єηℓα¢є ρяσρσя¢ισηα∂σ ησ єѕ νáℓι∂σ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
      }
    } else {
      return m.reply(`
ㅤ    ꒰  ㅤ 📝 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* #ѕтι¢кєя <ιмαgєη/vι∂єσ/υяℓ>
> ₊· ⫏⫏ ㅤ *Ejeмρℓσ:* Rєѕρση∂є α υηα ιмαgєη

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
      `.trim())
    }
  } catch (e) {
    console.error('❌ Error al crear el sticker:', e)
    return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ιηєѕρєяα∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${e.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }
  
  if (stiker) {
    try {
      const contextInfo = {
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363407253203904@newsletter",
          newsletterName: "αℓуα - ¢нαηηєℓ",
          serverMessageId: 1
        }
      }
      
      if (Buffer.isBuffer(stiker)) {
        await conn.sendMessage(m.chat, { sticker: stiker, contextInfo }, { quoted: m })
      } else if (typeof stiker === 'string') {
        await conn.sendMessage(m.chat, { sticker: { url: stiker }, contextInfo }, { quoted: m })
      } else {
        throw new Error('Formato de sticker no válido')
      }
    } catch (e) {
      console.error('⚠️ Error al enviar el sticker:', e)
      return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 єηνíσ ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ѕє ρυ∂σ єηνιαя єℓ ѕтι¢кєя

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
      `.trim())
    }
  } else {
    return m.reply(`
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢яєα¢ιón 木 ƒαℓℓσ ㅤ 性

> ₊· ⫏⫏ ㅤ Nσ ѕє ρυ∂σ ¢яєαя єℓ ѕтι¢кєя

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
  }
}

handler.help = ['sticker', 'stiker', 's'].map(v => v + ' <imagen|video|url>')
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.group = false
handler.register = false

export default handler

function isUrl(text) {
  return /^https?:\/\/.*\.(jpe?g|gif|png|webp)$/i.test(text)
}