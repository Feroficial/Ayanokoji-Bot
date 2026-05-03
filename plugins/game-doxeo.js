let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.mentionedJid?.[0] || text || m.sender
    let user = who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let nombre = await conn.getName(user)
    let numero = user.split('@')[0]
    
    let codigosPais = {
        '591': '🇧🇴 Bolivia',
        '52': '🇲🇽 México',
        '57': '🇨🇴 Colombia',
        '54': '🇦🇷 Argentina',
        '56': '🇨🇱 Chile',
        '51': '🇵🇪 Perú',
        '58': '🇻🇪 Venezuela',
        '53': '🇨🇺 Cuba',
        '502': '🇬🇹 Guatemala',
        '503': '🇸🇻 El Salvador',
        '504': '🇭🇳 Honduras',
        '505': '🇳🇮 Nicaragua',
        '506': '🇨🇷 Costa Rica',
        '507': '🇵🇦 Panamá',
        '1': '🇺🇸 Estados Unidos',
        '34': '🇪🇸 España',
        '33': '🇫🇷 Francia',
        '49': '🇩🇪 Alemania',
        '44': '🇬🇧 Reino Unido',
        '55': '🇧🇷 Brasil',
        '598': '🇺🇾 Uruguay',
        '595': '🇵🇾 Paraguay'
    }
    
    let codigoPais = ''
    let pais = ''
    for (let [key, value] of Object.entries(codigosPais)) {
        if (numero.startsWith(key)) {
            codigoPais = key
            pais = value
            break
        }
    }
    if (!pais) {
        codigoPais = '??'
        pais = '🌍 Desconocido'
    }

    await m.react('🔍')
    
    let pasos = [
        `🔎 Eѕ¢αηєαη∂σ ρυєятσѕ...`,
        `📡 Cσηє¢тαη∂σ αℓ ѕєяνι∂σя...`,
        `🗂️ Bυѕ¢αη∂σ ∂αтσѕ єη ℓα вαѕє...`,
        `🔓 Dєѕ¢яιƒяαη∂σ ιηƒσямα¢ιóη...`,
        `📥 Dαтσѕ σвтєηι∂σѕ:`
    ]
    
    for (let paso of pasos) {
        await conn.sendMessage(m.chat, { text: paso }, { quoted: m })
        await new Promise(res => setTimeout(res, 1200))
    }
    
    let ipFalsa = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    let operador = ['Claro', 'Movistar', 'Tigo', 'Personal', 'Vivo', 'Entel'][Math.floor(Math.random() * 6)]
    let dispositivo = ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Xiaomi 13 Pro', 'Google Pixel 8', 'Huawei P60', 'Motorola Edge'][Math.floor(Math.random() * 6)]
    let navegador = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'Brave'][Math.floor(Math.random() * 6)]
    let red = ['WiFi', '5G', '4G LTE', '3G'][Math.floor(Math.random() * 4)]
    
    await m.reply(`
ㅤ    ꒰  ㅤ 🔓 ㅤ *INFO USER* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ∂αтσѕ 木 υѕυαяισ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Usυαяισ:* ${nombre}
> ₊· ⫏⫏ ㅤ *📱 Núмєяσ:* +${codigoPais} ${numero.slice(codigoPais.length)}
> ₊· ⫏⫏ ㅤ *🌍 Pαíѕ:* ${pais}
> ₊· ⫏⫏ ㅤ *📡 Oρєяα∂σя:* ${operador}
> ₊· ⫏⫏ ㅤ *🌐 IP:* ${ipFalsa}
> ₊· ⫏⫏ ㅤ *📱 Dιѕρσѕιтινσ:* ${dispositivo}
> ₊· ⫏⫏ ㅤ *🌐 Nανєgα∂σя:* ${navegador}
> ₊· ⫏⫏ ㅤ *📶 Rє∂:* ${red}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `.trim())
    
    await m.react('✅')
}

handler.help = ['doxeo']
handler.tags = ['game']
handler.command = ['doxeo']

export default handler