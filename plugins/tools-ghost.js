let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ υѕσ 木 cσrrєctσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Uѕσ:* ${usedPrefix}${command} +59177474230

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim() }, { quoted: m })

    let number = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

    await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ νєяιƒι¢αη∂σ 木 📱 ㅤ 性

> ₊· ⫏⫏ ㅤ Vєяιƒι¢αη∂σ ηúмєяσ...

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim() }, { quoted: m })

    try {
        const result = await conn.onWhatsApp(number)
        const exists = result?.[0]?.exists

        if (exists) {
            const jid = result[0].jid
            let isBusiness = false
            try {
                const biz = await conn.getBusinessProfile(jid)
                if (biz?.wid) isBusiness = true
            } catch {}

            await conn.sendMessage(m.chat, {
                text: `
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕυℓтα∂σ 木 ✔️ ㅤ 性

> ₊· ⫏⫏ ㅤ 📞 *Núмєяσ:* +${number.split('@')[0]}
> ₊· ⫏⫏ ㅤ ✅ *WнαтѕAρρ:* Sí
> ₊· ⫏⫏ ㅤ 💼 *Cυєηтα:* ${isBusiness ? '🏢 Bυѕιηєѕѕ' : '👤 Pєяѕσηαℓ'}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: ℓʏσηη
                `.trim()
            }, { quoted: m })
        } else {
            await conn.sendMessage(m.chat, {
                text: `
ㅤ    ꒰  ㅤ 🔍 ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕυℓтα∂σ 木 ❌ ㅤ 性

> ₊· ⫏⫏ ㅤ 📞 *Núмєяσ:* +${number.split('@')[0]}
> ₊· ⫏⫏ ㅤ ❌ *WнαтѕAρρ:* Nσ

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: ℓʏσηη
                `.trim()
            }, { quoted: m })
        }
    } catch (e) {
        await conn.sendMessage(m.chat, { text: `
ㅤ    ꒰  ㅤ ❌ ㅤ *αℓуα - вσт* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єяяσя 木 🚫 ㅤ 性

> ₊· ⫏⫏ ㅤ *єяяσя:* ${e.message}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim() }, { quoted: m })
    }
}

handler.help = ['ghost +numero']
handler.tags = ['tools']
handler.command = ['ghost', 'ghostcheck', 'checknum']

export default handler