
import { exec } from 'child_process'
import util from 'util'
const execPromise = util.promisify(exec)

let handler = async (m, { conn, usedPrefix, command }) => {
  const texto = `
ㅤ    ꒰  ㅤ 🔄 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ αρ∂αтє 木 ɢιт ㅤ 性

> ₊· ⫏⫏ ㅤ *єѕтα∂σ:* ᴄᴏᴍᴘʀᴏʙᴀɴᴅᴏ ᴀᴄᴛᴜᴀʟɪᴢᴀᴄɪᴏɴᴇs...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
`.trim()

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })

  try {
    const { stdout, stderr } = await execPromise('git pull')
    
    if (stderr) {
      await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ɢιт ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${stderr}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
      `.trim() }, { quoted: m })
      return
    }

    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ✅ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ α¢тυαℓιzα∂σ 木 🚀 ㅤ 性

> ₊· ⫏⫏ ㅤ *яєѕυℓтα∂σ:*
${stdout || 'Ya estás en la última versión'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: Lʏᴏɴɴ
    `.trim() }, { quoted: m })

  } catch (error) {
    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ∂єѕ¢σησ¢ι∂σ ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ
    `.trim() }, { quoted: m })
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'gitpull', 'actualizar']
handler.rowner = true

export default handler