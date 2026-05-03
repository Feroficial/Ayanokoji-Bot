let handler = async (m, { conn, text, usedPrefix, command }) => {
    const games = global.tresEnRaya || {}
    const chatId = m.chat
    
    if (command === 'ttt' || command === 'tresraya') {
        let opponent = m.mentionedJid?.[0]
        
        if (!opponent) {
            if (games[chatId]) return m.reply('🎮 Ya hay una partida en curso')
            
            games[chatId] = {
                board: ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'],
                player1: m.sender,
                player2: 'bot',
                turn: m.sender,
                active: true,
                vsBot: true
            }
            
            await m.reply(`
ㅤ    ꒰  ㅤ 🎮 ㅤ *TЯΣƧ ΣИ ЯΛYΛ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ נυєgσ 木 vs вσт ㅤ 性

> ₊· ⫏⫏ ㅤ *❌ Tú:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *🤖 Bot:* αℓуα - вσт

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Usα: #casilla <1-9>
            `.trim())
            
            await mostrarTablero(conn, chatId, games[chatId], m)
            return
        }
        
        if (opponent === m.sender) return m.reply('🎮 No puedes jugar contra ti mismo')
        
        if (games[chatId]) return m.reply('🎮 Ya hay una partida en curso en este grupo')
        
        games[chatId] = {
            board: ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'],
            player1: m.sender,
            player2: opponent,
            turn: m.sender,
            active: true,
            vsBot: false
        }
        
        await m.reply(`
ㅤ    ꒰  ㅤ 🎮 ㅤ *TЯΣƧ ΣИ ЯΛYΛ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ נυєgσ 木 vs נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *❌:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *⭕:* @${opponent.split('@')[0]}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Usα: #casilla <1-9>
        `.trim())
        
        await mostrarTablero(conn, chatId, games[chatId], m)
    }
    
    if (command === 'casilla' || command === 'pos') {
        if (!games[chatId] || !games[chatId].active) return m.reply('🎮 No hay partida activa. Usa #ttt')
        
        if (!text) return m.reply('🎮 Usa: #casilla <1-9>')
        
        let pos = parseInt(text) - 1
        if (isNaN(pos) || pos < 0 || pos > 8) return m.reply('🎮 Usa un número del 1 al 9')
        
        if (games[chatId].board[pos] !== '⬜') return m.reply('🎮 Esa casilla ya está ocupada')
        
        if (games[chatId].turn !== m.sender) return m.reply('🎮 No es tu turno')
        
        let simbolo = games[chatId].turn === games[chatId].player1 ? '❌' : '⭕'
        games[chatId].board[pos] = simbolo
        
        let ganador = verificarGanador(games[chatId].board)
        
        if (ganador) {
            let winnerName = ganador === '❌' ? games[chatId].player1 : games[chatId].player2
            if (winnerName === 'bot') {
                await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GΛПΛDӨЯ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* 🤖 αℓуα - вσт

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
                `.trim())
            } else {
                await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GΛПΛDӨЯ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* @${winnerName.split('@')[0]}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
                `.trim())
            }
            delete games[chatId]
            return
        }
        
        if (!games[chatId].board.includes('⬜')) {
            await m.reply(`
ㅤ    ꒰  ㅤ 🤝 ㅤ *ΣMPΛTΣ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 gαηα∂σя ㅤ 性
            `.trim())
            delete games[chatId]
            return
        }
        
        if (games[chatId].vsBot && games[chatId].turn === games[chatId].player1) {
            games[chatId].turn = games[chatId].player2
            await movimientoBot(conn, chatId, games[chatId], m)
        } else {
            games[chatId].turn = games[chatId].turn === games[chatId].player1 ? games[chatId].player2 : games[chatId].player1
            await mostrarTablero(conn, chatId, games[chatId], m)
            if (games[chatId].turn !== 'bot') {
                await m.reply(`🎮 Turno de @${games[chatId].turn.split('@')[0]}`)
            } else {
                await movimientoBot(conn, chatId, games[chatId], m)
            }
        }
    }
}

async function movimientoBot(conn, chatId, game, m) {
    await new Promise(res => setTimeout(res, 1500))
    
    let casillasVacias = []
    for (let i = 0; i < game.board.length; i++) {
        if (game.board[i] === '⬜') casillasVacias.push(i)
    }
    
    if (casillasVacias.length === 0) return
    
    let pos = casillasVacias[Math.floor(Math.random() * casillasVacias.length)]
    game.board[pos] = '⭕'
    
    let ganador = verificarGanador(game.board)
    
    if (ganador) {
        await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GΛПΛDӨЯ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* 🤖 αℓуα - вσт

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
        delete global.tresEnRaya[chatId]
        return
    }
    
    if (!game.board.includes('⬜')) {
        await m.reply(`
ㅤ    ꒰  ㅤ 🤝 ㅤ *ΣMPΛTΣ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 gαηα∂σя ㅤ 性
        `.trim())
        delete global.tresEnRaya[chatId]
        return
    }
    
    game.turn = game.player1
    await mostrarTablero(conn, chatId, game, m)
    await m.reply(`🎮 Turno de @${game.turn.split('@')[0]}`)
}

async function mostrarTablero(conn, chatId, game, m) {
    const b = game.board
    const tablero = `
╭───┬───┬───╮
│ ${b[0]} │ ${b[1]} │ ${b[2]} │
├───┼───┼───┤
│ ${b[3]} │ ${b[4]} │ ${b[5]} │
├───┼───┼───┤
│ ${b[6]} │ ${b[7]} │ ${b[8]} │
╰───┴───┴───╯

> 1 2 3
> 4 5 6
> 7 8 9
`
    await m.reply(tablero)
}

function verificarGanador(board) {
    const lineas = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    for (let linea of lineas) {
        const [a,b,c] = linea
        if (board[a] !== '⬜' && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }
    return null
}

handler.help = ['ttt', 'casilla']
handler.tags = ['game']
handler.command = ['ttt', 'tresraya', 'casilla', 'pos']

export default handler