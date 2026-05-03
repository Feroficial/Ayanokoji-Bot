import { exec } from 'child_process'
import util from 'util'
const execPromise = util.promisify(exec)

let handler = async (m, { conn }) => {
  await m.react('⚠️')
  
  await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ⚠️ ㅤ *UPDATE FORCE* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ƒσяzαη∂σ 木 α¢тυαℓιzα¢ιση ㅤ 性

> ₊· ⫏⫏ ㅤ Fσяzαη∂σ α¢тυαℓιzα¢ιση...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim() }, { quoted: m })

  try {
    await execPromise('git fetch --all')
    await execPromise('git reset --hard origin/main')
    
    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ✅ ㅤ *UPDATE FORCE* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ¢σмρℓєтα∂σ 木 🚀 ㅤ 性

> ₊· ⫏⫏ ㅤ Sє α¢тυαℓízσ fσяzσѕαмєηтє
> ₊· ⫏⫏ ㅤ *яєιηι¢ια єℓ вσт*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim() }, { quoted: m })
    
    await m.react('✅')
  } catch (error) {
    await m.reply(`❌ Error: ${error.message}`)
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'gitforce']
handler.rowner = true

export default handler