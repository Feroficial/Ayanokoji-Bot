
let handler = async (m, { conn }) => {
  m.reply("sad funciona")
}
handler.command = ["sad"]
handler.help ["sad"]
handler.tags ["anime"]

export default handler