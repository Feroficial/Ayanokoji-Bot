if (!global.triviaGames) global.triviaGames = {}

const preguntas = [
    { pregunta: "¿Cuál es el planeta más grande del sistema solar?", respuesta: "jupiter", opciones: ["Marte", "Júpiter", "Saturno", "Neptuno"] },
    { pregunta: "¿Quién pintó la Mona Lisa?", respuesta: "leonardo da vinci", opciones: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Dalí"] },
    { pregunta: "¿En qué año llegó el hombre a la luna?", respuesta: "1969", opciones: ["1965", "1969", "1972", "1958"] },
    { pregunta: "¿Cuál es el animal más rápido del mundo?", respuesta: "guepardo", opciones: ["León", "Guepardo", "Águila", "Tiburón"] },
    { pregunta: "¿Quién escribió 'Cien años de soledad'?", respuesta: "gabriel garcia marquez", opciones: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Pablo Neruda"] },
    { pregunta: "¿Cuál es el río más largo del mundo?", respuesta: "amazonas", opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"] },
    { pregunta: "¿Qué país tiene la mayor población del mundo?", respuesta: "china", opciones: ["India", "China", "EE.UU.", "Indonesia"] },
    { pregunta: "¿Quién descubrió América?", respuesta: "cristobal colon", opciones: ["Magallanes", "Cristóbal Colón", "Vespucio", "Cortés"] },
    { pregunta: "¿Cuál es el metal más liviano?", respuesta: "litio", opciones: ["Oro", "Litio", "Aluminio", "Mercurio"] },
    { pregunta: "¿En qué continente está Egipto?", respuesta: "africa", opciones: ["Asia", "Europa", "África", "Oceanía"] },
    { pregunta: "¿Cuál es el océano más grande del mundo?", respuesta: "pacifico", opciones: ["Atlántico", "Pacífico", "Índico", "Ártico"] },
    { pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?", respuesta: "miguel de cervantes", opciones: ["Miguel de Cervantes", "Lope de Vega", "Garcilaso", "Quevedo"] },
    { pregunta: "¿Cuál es la montaña más alta del mundo?", respuesta: "everest", opciones: ["K2", "Everest", "Kanchenjunga", "Makalu"] },
    { pregunta: "¿Qué es la fotosíntesis?", respuesta: "proceso de las plantas", opciones: ["Respiración", "Proceso de las plantas", "Digestión", "Reproducción"] },
    { pregunta: "¿Quién fue el primer presidente de Estados Unidos?", respuesta: "george washington", opciones: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"] },
    { pregunta: "¿Cuál es el país más pequeño del mundo?", respuesta: "vaticano", opciones: ["Mónaco", "Vaticano", "San Marino", "Malta"] },
    { pregunta: "¿Qué deporte juega Lionel Messi?", respuesta: "futbol", opciones: ["Béisbol", "Fútbol", "Baloncesto", "Tenis"] },
    { pregunta: "¿Qué color se obtiene al mezclar azul y amarillo?", respuesta: "verde", opciones: ["Rojo", "Verde", "Morado", "Naranja"] },
    { pregunta: "¿Quién fue conocido como el 'Rey del Pop'?", respuesta: "michael jackson", opciones: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"] },
    { pregunta: "¿Cuántos días tiene un año bisiesto?", respuesta: "366", opciones: ["365", "366", "364", "367"] },
    { pregunta: "¿Qué gas es esencial para respirar?", respuesta: "oxigeno", opciones: ["Nitrógeno", "Oxígeno", "Dióxido de carbono", "Hidrógeno"] },
    { pregunta: "¿En qué ciudad está la Torre Eiffel?", respuesta: "paris", opciones: ["Londres", "París", "Roma", "Madrid"] },
    { pregunta: "¿Cuál es el animal terrestre más grande?", respuesta: "elefante", opciones: ["Rinoceronte", "Elefante", "Hipopótamo", "Jirafa"] },
    { pregunta: "¿Qué fruta es conocida como la 'fruta del dragón'?", respuesta: "pitahaya", opciones: ["Pitahaya", "Mango", "Papaya", "Guayaba"] },
    { pregunta: "¿Quién pintó 'La noche estrellada'?", respuesta: "van gogh", opciones: ["Picasso", "Van Gogh", "Monet", "Rembrandt"] },
    { pregunta: "¿Cuál es el país más grande de Suramérica?", respuesta: "brasil", opciones: ["Argentina", "Brasil", "Perú", "Colombia"] },
    { pregunta: "¿Qué instrumento toca Yo-Yo Ma?", respuesta: "cello", opciones: ["Violín", "Cello", "Piano", "Flauta"] },
    { pregunta: "¿Cuál es la capital de Japón?", respuesta: "tokio", opciones: ["Tokio", "Osaka", "Kioto", "Yokohama"] },
    { pregunta: "¿Quién escribió 'La Divina Comedia'?", respuesta: "dante", opciones: ["Dante Alighieri", "Petrarca", "Boccaccio", "Ariosto"] },
    { pregunta: "¿Qué fuerza mantiene los planetas en órbita?", respuesta: "gravedad", opciones: ["Magnetismo", "Gravedad", "Fricción", "Inercia"] }
]

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const games = global.triviaGames
    const chatId = m.chat
    
    if (command === 'trivia') {
        if (games[chatId] && games[chatId].active) {
            return m.reply('🎮 Ya hay una trivia en curso. Usa #endtrivia para cancelar')
        }
        
        let opponent = m.mentionedJid?.[0]
        let vsBot = !opponent
        
        if (opponent && opponent === m.sender) return m.reply('🎮 No puedes jugar contra ti mismo')
        
        let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)]
        
        games[chatId] = {
            pregunta: pregunta,
            player1: m.sender,
            player2: opponent || 'bot',
            turn: m.sender,
            active: true,
            vsBot: vsBot,
            score1: 0,
            score2: 0,
            round: 1,
            maxRounds: 5,
            timeout: null,
            waitingAnswer: true
        }
        
        let mensajeInicio = `
ㅤ    ꒰  ㅤ 🎮 ㅤ *TRIVIA - αℓуα* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ נυєgσ 木 ∂є ρяєgυηтαѕ ㅤ 性

> ₊· ⫏⫏ ㅤ 📖 *Ronda:* ${games[chatId].round}/${games[chatId].maxRounds}
> ₊· ⫏⫏ ㅤ 🎯 *Gana quien llegue a 3 aciertos*
> ₊· ⫏⫏ ㅤ ${vsBot ? '🤖 αℓуα - вσт' : `👥 ${m.sender.split('@')[0]} vs ${opponent.split('@')[0]}`}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Responde con: #r <respuesta>
        `
        
        await m.reply(mensajeInicio)
        await enviarPregunta(m, games[chatId])
        iniciarTemporizadorTrivia(m, chatId, games[chatId])
    }
    
    if (command === 'endtrivia') {
        if (!games[chatId] || !games[chatId].active) return m.reply('🎮 No hay trivia activa')
        
        if (games[chatId].timeout) clearTimeout(games[chatId].timeout)
        delete games[chatId]
        return m.reply('🎮 Trivia cancelada')
    }
    
    if (command === 'r' || command === 'respuesta') {
        if (!games[chatId] || !games[chatId].active) return m.reply('🎮 No hay trivia activa. Usa #trivia')
        
        if (!text) return m.reply('🎮 Usa: #r <tu respuesta>')
        
        if (games[chatId].turn !== m.sender) {
            let turnoNombre = games[chatId].turn === 'bot' ? 'Bot' : games[chatId].turn.split('@')[0]
            return m.reply(`🎮 No es tu turno. Turno de ${turnoNombre}`)
        }
        
        if (!games[chatId].waitingAnswer) return m.reply('🎮 Ya respondiste esta pregunta. Espera la siguiente ronda')
        
        if (games[chatId].timeout) clearTimeout(games[chatId].timeout)
        
        let respuestaUser = text.toLowerCase().trim()
        let respuestaCorrecta = games[chatId].pregunta.respuesta
        let esCorrecto = respuestaUser === respuestaCorrecta
        
        let puntos = esCorrecto ? 1 : 0
        let mensaje = ''
        
        if (games[chatId].turn === games[chatId].player1) {
            games[chatId].score1 += puntos
            mensaje = esCorrecto ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta era: ${respuestaCorrecta}`
            games[chatId].turn = games[chatId].player2
        } else {
            games[chatId].score2 += puntos
            mensaje = esCorrecto ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta era: ${respuestaCorrecta}`
            games[chatId].turn = games[chatId].player1
        }
        
        games[chatId].round++
        games[chatId].waitingAnswer = false
        
        await m.reply(`
ㅤ    ꒰  ㅤ 📊 ㅤ *RESULTADO* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ℓα 木 яєѕρυєѕтα ㅤ 性

> ₊· ⫏⫏ ㅤ ${mensaje}
> ₊· ⫏⫏ ㅤ 🎯 *Marcador:* ${games[chatId].score1} - ${games[chatId].score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `)
        
        if (games[chatId].score1 >= 3 || games[chatId].score2 >= 3) {
            let ganador = games[chatId].score1 >= 3 ? games[chatId].player1 : games[chatId].player2
            let ganadorNombre = ganador === 'bot' ? '🤖 αℓуα - вσт' : ganador.split('@')[0]
            
            await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GANADOR* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* ${ganadorNombre}
> ₊· ⫏⫏ ㅤ *🎯 Resultado final:* ${games[chatId].score1} - ${games[chatId].score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
            `)
            
            delete games[chatId]
            return
        }
        
        if (games[chatId].round > games[chatId].maxRounds) {
            let ganador = games[chatId].score1 > games[chatId].score2 ? games[chatId].player1 : games[chatId].player2
            let ganadorNombre = ganador === 'bot' ? '🤖 αℓуα - вσт' : ganador.split('@')[0]
            
            await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *FIN DEL JUEGO* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕυℓтα∂σ 木 ƒιηαℓ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Ganador:* ${ganadorNombre}
> ₊· ⫏⫏ ㅤ *🎯 Marcador final:* ${games[chatId].score1} - ${games[chatId].score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
            `)
            
            delete games[chatId]
            return
        }
        
        let nuevaPregunta = preguntas[Math.floor(Math.random() * preguntas.length)]
        games[chatId].pregunta = nuevaPregunta
        games[chatId].waitingAnswer = true
        
        if (games[chatId].vsBot && games[chatId].turn === 'bot') {
            await turnoBot(m, games[chatId])
        } else {
            await enviarPregunta(m, games[chatId])
            iniciarTemporizadorTrivia(m, chatId, games[chatId])
        }
    }
}

async function turnoBot(m, game) {
    await m.reply('🤖 Bot está pensando...')
    await new Promise(res => setTimeout(res, 2000))
    
    let respuestaCorrecta = game.pregunta.respuesta
    let esCorrecto = Math.random() > 0.3
    
    let puntos = esCorrecto ? 1 : 0
    let mensaje = ''
    
    game.score2 += puntos
    mensaje = esCorrecto ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta era: ${respuestaCorrecta}`
    
    game.round++
    game.waitingAnswer = false
    game.turn = game.player1
    
    await m.reply(`
ㅤ    ꒰  ㅤ 🤖 ㅤ *BOT RESPONDE* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕρυєѕтα 木 ∂єℓ вσт ㅤ 性

> ₊· ⫏⫏ ㅤ ${mensaje}
> ₊· ⫏⫏ ㅤ 🎯 *Marcador:* ${game.score1} - ${game.score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
    `)
    
    if (game.score1 >= 3 || game.score2 >= 3) {
        let ganador = game.score1 >= 3 ? game.player1 : 'bot'
        let ganadorNombre = ganador === 'bot' ? '🤖 αℓуα - вσт' : ganador.split('@')[0]
        
        await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *GANADOR* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єℓ 木 נυgα∂σя ㅤ 性

> ₊· ⫏⫏ ㅤ *👤:* ${ganadorNombre}
> ₊· ⫏⫏ ㅤ *🎯 Resultado final:* ${game.score1} - ${game.score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `)
        
        delete global.triviaGames[m.chat]
        return
    }
    
    if (game.round > game.maxRounds) {
        let ganador = game.score1 > game.score2 ? game.player1 : 'bot'
        let ganadorNombre = ganador === 'bot' ? '🤖 αℓуα - вσт' : ganador.split('@')[0]
        
        await m.reply(`
ㅤ    ꒰  ㅤ 🏆 ㅤ *FIN DEL JUEGO* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яєѕυℓтα∂σ 木 ƒιηαℓ ㅤ 性

> ₊· ⫏⫏ ㅤ *👤 Ganador:* ${ganadorNombre}
> ₊· ⫏⫏ ㅤ *🎯 Marcador final:* ${game.score1} - ${game.score2}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
        `)
        
        delete global.triviaGames[m.chat]
        return
    }
    
    let nuevaPregunta = preguntas[Math.floor(Math.random() * preguntas.length)]
    game.pregunta = nuevaPregunta
    game.waitingAnswer = true
    
    await enviarPregunta(m, game)
    iniciarTemporizadorTrivia(m, m.chat, game)
}

async function enviarPregunta(m, game) {
    let turnoNombre = game.turn === 'bot' ? '🤖 αℓуα - вσт' : game.turn.split('@')[0]
    
    let opcionesTexto = ''
    game.pregunta.opciones.forEach((op, i) => {
        opcionesTexto += `> ${i + 1}. ${op}\n`
    })
    
    await m.reply(`
ㅤ    ꒰  ㅤ ❓ ㅤ *NUEVA PREGUNTA* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ яση∂α 木 ${game.round}/${game.maxRounds} ㅤ 性

> ₊· ⫏⫏ ㅤ *🎲 Turno:* ${turnoNombre}
> ₊· ⫏⫏ ㅤ *📝 Pregunta:* ${game.pregunta.pregunta}
> ₊· ⫏⫏ ㅤ *💡 Opciones:*
${opcionesTexto}
> ₊· ⫏⫏ ㅤ *⏰ Tiempo:* 30 segundos

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ Usα: #r <respuesta>
    `)
}

function iniciarTemporizadorTrivia(m, chatId, game) {
    if (game.timeout) clearTimeout(game.timeout)
    
    game.timeout = setTimeout(async () => {
        const juego = global.triviaGames[chatId]
        if (!juego || !juego.active) return
        
        await m.reply(`
ㅤ    ꒰  ㅤ ⏰ ㅤ *TIEMPO AGOTADO* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ ѕιη 木 яєѕρυєѕтα ㅤ 性

> ₊· ⫏⫏ ㅤ Se acabó el tiempo. La respuesta era: ${game.pregunta.respuesta}

ㅤ    ꒰  ㅤ ✿ ㅤ *Partida cancelada* ㅤ ⫏⫏ ꒱
        `)
        
        delete global.triviaGames[chatId]
    }, 30000)
}

handler.help = ['trivia', 'r', 'endtrivia']
handler.tags = ['game']
handler.command = ['trivia', 'r', 'respuesta', 'endtrivia']

export default handler