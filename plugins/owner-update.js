import { exec } from 'child_process'
import util from 'util'
const execPromise = util.promisify(exec)

let handler = async (m, { conn }) => {
  await m.react('🔄')
  
  await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ 🔄 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ αρ∂αтє 木 ɢιт ㅤ 性

> ₊· ⫏⫏ ㅤ *єѕтα∂σ:* Cσмρяσвαη∂σ α¢тυαℓιzα¢ισηєѕ...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
  `.trim() }, { quoted: m })

  try {
    const { stdout, stderr } = await execPromise('git pull')
    const salida = (stdout + stderr).trim()
    
    let mensaje = ''
    let estado = ''

    if (salida.includes('Already up to date') || salida.includes('Ya está actualizado')) {
      estado = '✅ αℓ 木 ∂íα'
      mensaje = 'Yα єѕтαѕ єη ℓα úℓтιмα νєяѕíση'
    } else if (salida.includes('Updating') || salida.includes('file changed') || salida.includes('cambiados')) {
      estado = '✅ α¢тυαℓιzα∂σ'
      mensaje = salida.length > 300 ? salida.substring(0, 300) + '...' : salida
    } else {
      estado = 'ℹ️ ѕαℓι∂α 木 ɢιт'
      mensaje = salida.length > 300 ? salida.substring(0, 300) + '...' : (salida || 'Sin cambios detectados')
    }

    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ${estado.includes('✅') ? '✅' : 'ℹ️'} ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ${estado.includes('✅') ? 'яєѕυℓтα∂σ' : 'ιηfσямα¢ιóη'} 木 git ㅤ 性

> ₊· ⫏⫏ ㅤ *${estado.includes('✅') ? 'яєѕυℓтα∂σ:' : 'ιηfσ:'}*
${mensaje}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🌸 Cяєα∂σя: Lʏᴏɴɴ
    `.trim() }, { quoted: m })
    
    await m.react(estado.includes('✅') ? '✅' : 'ℹ️')

  } catch (error) {
    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 ɢιт ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${error.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim() }, { quoted: m })
    await m.react('❌')
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'gitpull', 'actualizar']
handler.rowner = true

export default handler