if (!global.tresEnRaya) global.tresEnRaya = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const games = global.tresEnRaya
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
                vsBot: true,
                lastMove: Date.now()
            }
            
            iniciarTemporizador(m, chatId, games[chatId])
            
            await m.reply(`
ㅤ    ꒰  ㅤ 🎮 ㅤ *TЯΣƧ ΣИ ЯΛYΛ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ נυєgσ 木 vs вσт ㅤ 性

> ₊· ⫏⫏ ㅤ *❌ Tú:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *🤖 Bot:* αℓуα - вσт
> ₊· ⫏⫏ ㅤ *⏰ Tiempo:* 2 minutos por turno

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Usα: #casilla <1-9>
            `.trim())
            
            await mostrarTablero(m, games[chatId])
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
            vsBot: false,
            lastMove: Date.now()
        }
        
        iniciarTemporizador(m, chatId, games[chatId])
        
        await m.reply(`
ㅤ    ꒰  ㅤ 🎮 ㅤ *TЯΣƧ ΣИ ЯΛYΛ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ נυєgσ 木 vs נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *❌:* @${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *⭕:* @${opponent.split('@')[0]}
> ₊· ⫏⫏ ㅤ *⏰ Tiempo:* 2 minutos por turno

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Usα: #casilla <1-9>
        `.trim())
        
        await mostrarTablero(m, games[chatId])
    }
    
    if (command === 'casilla' || command === 'pos') {
        if (!games[chatId] || !games[chatId].active) return m.reply('🎮 No hay partida activa. Usa #ttt')
        
        if (!text) return m.reply('🎮 Usa: #casilla <1-9>')
        
        let pos = parseInt(text) - 1
        if (isNaN(pos) || pos < 0 || pos > 8) return m.reply('🎮 Usa un número del 1 al 9')
        
        if (games[chatId].board[pos] !== '⬜') return m.reply('🎮 Esa casilla ya está ocupada')
        
        if (games[chatId].turn !== m.sender) return m.reply(`🎮 No es tu turno. Turno de @${games[chatId].turn.split('@')[0]}`)
        
        games[chatId].lastMove = Date.now()
        
        let simbolo = games[chatId].turn === games[chatId].player1 ? '❌' : '⭕'
        games[chatId].board[pos] = simbolo
        
        let ganador = verificarGanador(games[chatId].board)
        
        if (ganador) {
            let winnerName = ganador === '❌' ? games[chatId].player1 : games[chatId].player2
            if (winnerName === 'bot') {
                await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GΛПΛDӨЯ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* 🤖 αℓуα - вσт (Modo Pro)

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
            await movimientoBotPro(m, games[chatId])
        } else {
            games[chatId].turn = games[chatId].turn === games[chatId].player1 ? games[chatId].player2 : games[chatId].player1
            await mostrarTablero(m, games[chatId])
            if (games[chatId].turn !== 'bot') {
                await m.reply(`🎮 Turno de @${games[chatId].turn.split('@')[0]} - ⏰ 2 minutos`)
            } else {
                await movimientoBotPro(m, games[chatId])
            }
        }
    }
}

function iniciarTemporizador(m, chatId, game) {
    setTimeout(async () => {
        const juego = global.tresEnRaya[chatId]
        if (!juego || !juego.active) return
        
        const tiempoInactivo = Date.now() - juego.lastMove
        if (tiempoInactivo >= 120000) {
            await m.reply(`
ㅤ    ꒰  ㅤ ⏰ ㅤ *TIEMPO AGOTADO* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ραятι∂α 木 ¢єяяα∂α ㅤ 性

> ₊· ⫏⫏ ㅤ Lα ραятι∂α ѕє ¢єяró ροя ιηα¢тινι∂αd
> ₊· ⫏⫏ ㅤ (2 мιηυтσѕ ѕιη мσνιмιєηтσ)

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
            `.trim())
            delete global.tresEnRaya[chatId]
        }
    }, 120000)
}

async function movimientoBotPro(m, game) {
    await m.reply('🤖 Bot está calculando la mejor jugada...')
    await new Promise(res => setTimeout(res, 1500))
    
    let mejorMovimiento = obtenerMejorMovimiento(game.board, '⭕')
    game.board[mejorMovimiento] = '⭕'
    game.lastMove = Date.now()
    
    let ganador = verificarGanador(game.board)
    
    if (ganador) {
        await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GΛПΛDӨЯ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* 🤖 αℓуα - вσт (Modo Pro)

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `.trim())
        delete global.tresEnRaya[m.chat]
        return
    }
    
    if (!game.board.includes('⬜')) {
        await m.reply(`
ㅤ    ꒰  ㅤ 🤝 ㅤ *ΣMPΛTΣ* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 gαηα∂σя ㅤ 性
        `.trim())
        delete global.tresEnRaya[m.chat]
        return
    }
    
    game.turn = game.player1
    await mostrarTablero(m, game)
    await m.reply(`🎮 Turno de @${game.turn.split('@')[0]} - ⏰ 2 minutos`)
}

function obtenerMejorMovimiento(board, jugador) {
    const oponente = jugador === '❌' ? '⭕' : '❌'
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '⬜') {
            board[i] = jugador
            if (verificarGanador(board) === jugador) {
                board[i] = '⬜'
                return i
            }
            board[i] = '⬜'
        }
    }
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '⬜') {
            board[i] = oponente
            if (verificarGanador(board) === oponente) {
                board[i] = '⬜'
                return i
            }
            board[i] = '⬜'
        }
    }
    
    const centros = [4, 0, 2, 6, 8, 1, 3, 5, 7]
    for (let i of centros) {
        if (board[i] === '⬜') return i
    }
    
    return 0
}

async function mostrarTablero(m, game) {
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