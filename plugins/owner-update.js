import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃ 🔖 ＡＣＣＥＳＯ ＤＥＮＥＧＡＤＯ 🔖
╰━━━━━━━━━━━━━━━━━━━━╯

❖ *❌ 𝐒𝐨𝐥𝐨 𝐞𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐨*
❖ *🎭 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 𝐧𝐨 𝐜𝐨𝐧𝐟𝐢𝐚 𝐞𝐧 𝐜𝐮𝐚𝐥𝐪𝐮𝐢𝐞𝐫𝐚*

╰━━━━━━━━━━━━━━━━━━━━╯`)

  await m.react('🔖')

  if (!text) {
   return m.reply(`
  ♪ ••• ♪  🔖 𝐔𝐏𝐃𝐀𝐓𝐄 𝐒𝐘𝐒𝐓𝐄𝐌 🔖  ♪ ••• ♪  

┌───『 🔖 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 🔖 ───┐
│
│  🔖 *${usedPrefix + command} pull*   ──  𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐜𝐚𝐦𝐛𝐢𝐨𝐬
│  🔖 *${usedPrefix + command} status* ──  𝐕𝐞𝐫 𝐞𝐬𝐭𝐚𝐝𝐨
│  🔖 *${usedPrefix + command} logs*   ──  𝐕𝐞𝐫 𝐜𝐨𝐦𝐦𝐢𝐭𝐬
│  🔖 *${usedPrefix + command} all*    ──  𝐓𝐨𝐝𝐨 𝐞𝐧 𝐮𝐧𝐨
│
└───『 🗡️ 🔖 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 𝐥𝐢𝐬𝐭𝐨 🔖 🎭 』───┘`)
  }

  let opcion = text.toLowerCase()

  try {
    if (opcion === 'pull') {
      await m.reply(`┌───『 🔖 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐍𝐃𝐎 🔖 ───┐
│
│  ⬇️ *𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐧𝐝𝐨 𝐜𝐚𝐦𝐛𝐢𝐨𝐬...*
│
└───『 🗡️ 𝐀𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐧𝐝𝐨 🎭 』───┘`)
      let { stdout, stderr } = await execPromise('git pull')
      let resultado = stdout || stderr || '✨ 𝐒𝐢𝐧 𝐜𝐚𝐦𝐛𝐢𝐨𝐬'
      await m.reply(`┌───『 🔖 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 🔖 ───┐
│
│  📋 *𝐒𝐚𝐥𝐢𝐝𝐚:*
│  ${resultado.split('\n').map(l => `│  ${l}`).join('\n').slice(0, 1500)}
│
└───『 ✅ 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐝𝐨 🎭 』───┘`)
    }
    else if (opcion === 'status') {
      await m.reply(`┌───『 🔖 𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀𝐍𝐃𝐎 🔖 ───┐
│
│  📊 *𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐧𝐝𝐨 𝐞𝐬𝐭𝐚𝐝𝐨...*
│
└───『 🗡️ 𝐠𝐢𝐭 𝐬𝐭𝐚𝐭𝐮𝐬 🎭 』───┘`)
      let { stdout } = await execPromise('git status')
      await m.reply(`┌───『 🔖 𝐄𝐒𝐓𝐀𝐃𝐎 🔖 ───┐
│
│  ${stdout.split('\n').map(l => `│  ${l}`).join('\n')}
│
└───『 ✅ 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐝𝐨 🎭 』───┘`)
    }
    else if (opcion === 'logs') {
      await m.reply(`┌───『 🔖 𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀𝐍𝐃𝐎 🔖 ───┐
│
│  📜 *𝐎𝐛𝐭𝐞𝐧𝐢𝐞𝐧𝐝𝐨 𝐜𝐨𝐦𝐦𝐢𝐭𝐬...*
│
└───『 🗡️ 𝐠𝐢𝐭 𝐥𝐨𝐠 🎭 』───┘`)
      let { stdout } = await execPromise('git log --oneline -5')
      await m.reply(`┌───『 🔖 𝐔𝐋𝐓𝐈𝐌𝐎𝐒 𝐂𝐎𝐌𝐌𝐈𝐓𝐒 🔖 ───┐
│
${stdout.split('\n').map(l => `│  ${l}`).join('\n')}
│
└───『 ✅ 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐝𝐨 🎭 』───┘`)
    }
    else if (opcion === 'all') {
      await m.reply(`┌───『 🔖 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍 🔖 ───┐
│
│  🔄 *𝐏𝐚𝐬𝐨 𝟏:* 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐧𝐝𝐨 𝐜𝐚𝐦𝐛𝐢𝐨𝐬...
│  📦 *𝐏𝐚𝐬𝐨 𝟐:* 𝐈𝐧𝐬𝐭𝐚𝐥𝐚𝐧𝐝𝐨 𝐝𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐜𝐢𝐚𝐬...
│
└───『 🗡️ 𝐏𝐫𝐨𝐜𝐞𝐬𝐚𝐧𝐝𝐨 🎭 』───┘`)
      await execPromise('git pull')
      await execPromise('npm install')
      await m.reply(`┌───『 🔖 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐂𝐈𝐎𝐍 𝐄𝐗𝐈𝐓𝐎𝐒𝐀 🔖 ───┐
│
│  ✅ *𝐂𝐚𝐦𝐛𝐢𝐨𝐬 𝐚𝐩𝐥𝐢𝐜𝐚𝐝𝐨𝐬 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞*
│
└───『 🎭 🔖 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 𝐥𝐢𝐬𝐭𝐨 🔖 🗡️ 』───┘`)
      await m.react('✅')
    }
    else {
      await m.reply(`┌───『 🔖 𝐄𝐑𝐑𝐎𝐑 🔖 ───┐
│
│  ❌ *𝐎𝐩𝐜𝐢𝐨́𝐧 𝐧𝐨 𝐯𝐚́𝐥𝐢𝐝𝐚*
│  📌 *𝐔𝐬𝐚: ${usedPrefix + command} pull, status, logs, all*
│
└───『 🗡️ © 2026 𝐊𝐢𝐲𝐨𝐭𝐚𝐤𝐚 𝐀𝐲𝐚𝐧𝐨𝐤𝐨𝐣𝐢 🎭 』───┘`)
    }
    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    await m.reply(`┌───『 🔖 𝐄𝐑𝐑𝐎𝐑 🔖 ───┐
│
│  ❌ *𝐄𝐫𝐫𝐨𝐫:* ${e.message}
│
└───『 🗡️ 𝐄𝐥 𝐬𝐢𝐬𝐭𝐞𝐦𝐚 𝐡𝐚 𝐟𝐚𝐥𝐥𝐚𝐝𝐨 🎭 』───┘`)
  }
}

handler.help = ['update <opción>']
handler.tags = ['owner']
handler.command = /^(update|actualizar|up)$/i
handler.rowner = true

export default handler