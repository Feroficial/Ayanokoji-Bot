// work.js - Comando para trabajar y ganar/perder dinero
let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let cooldown = 180000 // 3 minutos
  
  if (user.lastwork && Date.now() - user.lastwork < cooldown) {
    let timeLeft = msToTime(cooldown - (Date.now() - user.lastwork))
    return m.reply(`
ㅤ    ꒰  ㅤ 💼 ㅤ *αℓуα - ωσяк* ㅤ ⫏⫏  ꒱
ㅤ    ⿻ ㅤ ✿ ㅤ єѕρєяα 木 тιємρσ ㅤ 性

> ₊· ⫏⫏ ㅤ *Eѕρєяα ${timeLeft} ραяα тяαвαנαя ∂є ηυєνσ*

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
  
  const trabajosGanar = [
    { nombre: "🍕 Cocinero", accion: "preparó una pizza gourmet de 4 quesos", ganancia: [5, 25] },
    { nombre: "💻 Programador", accion: "solucionó un bug crítico en el sistema", ganancia: [5, 30] },
    { nombre: "🎨 Diseñador", accion: "creó un logo para una empresa importante", ganancia: [6, 28] },
    { nombre: "📚 Profesor", accion: "dio una clase de matemáticas a 30 alumnos", ganancia: [3, 22] },
    { nombre: "🎵 Músico", accion: "tocó en un concierto en vivo", ganancia: [7, 32] },
    { nombre: "✈️ Piloto", accion: "realizó un vuelo transatlántico", ganancia: [8, 35] },
    { nombre: "👮 Policía", accion: "resolvió un caso de robo", ganancia: [4, 25] },
    { nombre: "🔧 Ingeniero", accion: "diseñó un puente innovador", ganancia: [6, 30] },
    { nombre: "💊 Médico", accion: "realizó una cirugía exitosa", ganancia: [8, 35] },
    { nombre: "📝 Escritor", accion: "terminó su novela más vendida", ganancia: [5, 28] },
    { nombre: "🎬 Actor", accion: "grabó una escena para una película", ganancia: [7, 32] },
    { nombre: "🏃 Entrenador", accion: "preparó a un atleta para competir", ganancia: [4, 24] },
    { nombre: "📸 Fotógrafo", accion: "hizo una sesión de fotos profesional", ganancia: [5, 26] },
    { nombre: "🚛 Camionero", accion: "entregó mercancía a tiempo", ganancia: [3, 22] },
    { nombre: "💅 Estilista", accion: "arregló el cabello de una famosa", ganancia: [4, 25] },
    { nombre: "🔧 Mecánico", accion: "reparó un motor averiado", ganancia: [5, 27] },
    { nombre: "📦 Repartidor", accion: "entregó 50 paquetes en un día", ganancia: [2, 20] },
    { nombre: "🛒 Cajero", accion: "atendió a más de 100 clientes", ganancia: [2, 18] },
    { nombre: "💼 Ejecutivo", accion: "cerró un trato millonario", ganancia: [10, 40] },
    { nombre: "🎮 Streamer", accion: "hizo una transmisión de 8 horas", ganancia: [5, 28] },
    { nombre: "📱 Influencer", accion: "publicó un anuncio patrocinado", ganancia: [7, 32] },
    { nombre: "🚁 Rescatista", accion: "salvó a una familia en peligro", ganancia: [6, 30] },
    { nombre: "🔥 Bombero", accion: "apagó un incendio forestal", ganancia: [5, 28] },
    { nombre: "🎭 Comediante", accion: "hizo reír a todo el auditorio", ganancia: [4, 26] },
    { nombre: "🐕 Paseador", accion: "paseó a 15 perros en el parque", ganancia: [2, 15] },
    { nombre: "🧹 Conserje", accion: "limpió toda la oficina", ganancia: [2, 16] },
    { nombre: "🌱 Jardinero", accion: "podó los árboles del jardín", ganancia: [3, 18] },
    { nombre: "🧑‍🍳 Pastelero", accion: "hizo un pastel de 3 pisos", ganancia: [5, 25] },
    { nombre: "💪 Fisioterapeuta", accion: "rehabilitó a un paciente", ganancia: [4, 24] },
    { nombre: "🧙 Mago", accion: "hizo un truco de magia increíble", ganancia: [5, 28] },
    { nombre: "🐴 Jinete", accion: "entrenó a un caballo salvaje", ganancia: [4, 22] },
    { nombre: "🎣 Pescador", accion: "pescó un atún gigante", ganancia: [3, 20] },
    { nombre: "🏋️ Gimnasio", accion: "entrenó pesas por 2 horas", ganancia: [3, 18] },
    { nombre: "🕵️ Detective", accion: "resolvió un caso misterioso", ganancia: [6, 30] },
    { nombre: "📰 Periodista", accion: "publicó una noticia exclusiva", ganancia: [5, 26] },
    { nombre: "🎨 Tatuador", accion: "hizo un tatuaje artístico", ganancia: [6, 28] },
    { nombre: "💎 Joyero", accion: "diseñó un anillo de diamantes", ganancia: [8, 35] },
    { nombre: "🪓 Leñador", accion: "cortó 50 árboles en el bosque", ganancia: [4, 22] },
    { nombre: "🧵 Sastre", accion: "cosió un vestido de novia", ganancia: [5, 25] },
    { nombre: "🛠️ Soldador", accion: "soldó una estructura metálica", ganancia: [5, 26] },
    { nombre: "🧪 Químico", accion: "mezcló compuestos peligrosos", ganancia: [6, 28] },
    { nombre: "🦸 Superhéroe", accion: "salvó la ciudad del peligro", ganancia: [12, 45] },
    { nombre: "🧑‍🚀 Astronauta", accion: "caminó en el espacio exterior", ganancia: [15, 50] },
    { nombre: "🏴‍☠️ Pirata", accion: "encontró un tesoro escondido", ganancia: [10, 40] },
    { nombre: "👽 Cazafantasmas", accion: "atrapó un fantasma rebelde", ganancia: [8, 35] }
  ]
  
  const trabajosPerder = [
    { nombre: "🍕 Cocinero", accion: "quemó la comida del chef", perdida: [5, 20] },
    { nombre: "💻 Programador", accion: "borró la base de datos por accidente", perdida: [8, 25] },
    { nombre: "🎨 Diseñador", accion: "entregó el proyecto con errores", perdida: [4, 18] },
    { nombre: "📚 Profesor", accion: "llegó tarde a su clase", perdida: [3, 15] },
    { nombre: "🎵 Músico", accion: "afinó mal su instrumento", perdida: [4, 16] },
    { nombre: "✈️ Piloto", accion: "tuvo un retraso en el vuelo", perdida: [6, 22] },
    { nombre: "👮 Policía", accion: "no encontró pistas del caso", perdida: [3, 14] },
    { nombre: "🔧 Ingeniero", accion: "el puente colapsó en simulación", perdida: [7, 24] },
    { nombre: "💊 Médico", accion: "diagnosticó mal a un paciente", perdida: [8, 28] },
    { nombre: "📝 Escritor", accion: "perdió el manuscrito del libro", perdida: [6, 22] },
    { nombre: "🎬 Actor", accion: "olvidó sus líneas en el set", perdida: [5, 20] },
    { nombre: "🏃 Entrenador", accion: "su atleta perdió la competencia", perdida: [4, 18] },
    { nombre: "📸 Fotógrafo", accion: "rompió la cámara nueva", perdida: [7, 25] },
    { nombre: "🚛 Camionero", accion: "tuvo un accidente con la carga", perdida: [8, 28] },
    { nombre: "💅 Estilista", accion: "cortó mal el cabello de una clienta", perdida: [5, 20] },
    { nombre: "🔧 Mecánico", accion: "dañó el motor del auto", perdida: [8, 30] },
    { nombre: "📦 Repartidor", accion: "perdió varios paquetes", perdida: [4, 16] },
    { nombre: "🛒 Cajero", accion: "le faltó dinero en la caja", perdida: [3, 14] },
    { nombre: "💼 Ejecutivo", accion: "perdió un cliente importante", perdida: [10, 35] },
    { nombre: "🎮 Streamer", accion: "tuvo una mala transmisión", perdida: [5, 20] },
    { nombre: "📱 Influencer", accion: "perdió seguidores por un escándalo", perdida: [8, 28] },
    { nombre: "🚁 Rescatista", accion: "no pudo rescatar a tiempo", perdida: [6, 22] },
    { nombre: "🔥 Bombero", accion: "llegó tarde al incendio", perdida: [5, 20] },
    { nombre: "🎭 Comediante", accion: "nadie se rió de sus chistes", perdida: [4, 18] },
    { nombre: "🐕 Paseador", accion: "un perro se escapó", perdida: [4, 16] },
    { nombre: "🧹 Conserje", accion: "dejó el piso muy resbaloso", perdida: [3, 14] },
    { nombre: "🌱 Jardinero", accion: "podó mal las plantas", perdida: [3, 15] },
    { nombre: "🧑‍🍳 Pastelero", accion: "el pastel se cayó al piso", perdida: [5, 20] },
    { nombre: "💪 Fisioterapeuta", accion: "lesionó a un paciente", perdida: [7, 25] },
    { nombre: "🧙 Mago", accion: "falló su truco más importante", perdida: [5, 20] },
    { nombre: "🐴 Jinete", accion: "fue derribado por el caballo", perdida: [5, 18] },
    { nombre: "🎣 Pescador", accion: "no pescó nada en todo el día", perdida: [3, 15] },
    { nombre: "🏋️ Gimnasio", accion: "se lesionó entrenando", perdida: [4, 18] },
    { nombre: "🕵️ Detective", accion: "acusó a la persona equivocada", perdida: [6, 22] },
    { nombre: "📰 Periodista", accion: "publicó una noticia falsa", perdida: [7, 25] },
    { nombre: "🎨 Tatuador", accion: "arruinó el diseño del tatuaje", perdida: [6, 24] },
    { nombre: "💎 Joyero", accion: "perdió un diamante valioso", perdida: [10, 35] },
    { nombre: "🪓 Leñador", accion: "su hacha se rompió", perdida: [4, 18] },
    { nombre: "🧵 Sastre", accion: "cosió mal el vestido", perdida: [5, 20] },
    { nombre: "🛠️ Soldador", accion: "se quemó con la soldadora", perdida: [5, 20] },
    { nombre: "🧪 Químico", accion: "derramó ácido en el laboratorio", perdida: [8, 28] },
    { nombre: "🦸 Superhéroe", accion: "llegó tarde a salvar la ciudad", perdida: [12, 40] },
    { nombre: "🧑‍🚀 Astronauta", accion: "su traje espacial falló", perdida: [10, 35] },
    { nombre: "🏴‍☠️ Pirata", accion: "el tesoro era falso", perdida: [8, 30] },
    { nombre: "👽 Cazafantasmas", accion: "el fantasma lo poseyó", perdida: [8, 28] }
  ]
  
  const bonusExtra = [
    { nombre: "🌸 Cliente generoso", accion: "te dejó una buena propina extra", ganancia: [2, 8] },
    { nombre: "💗 Bono sorpresa", accion: "el jefe te dio un bono por tu esfuerzo", ganancia: [3, 10] },
    { nombre: "✨ Horas extras", accion: "trabajaste horas extra y te pagaron más", ganancia: [4, 12] },
    { nombre: "🎀 Buen desempeño", accion: "tuviste un excelente rendimiento", ganancia: [3, 9] },
    { nombre: "🧸 Compañero ayuda", accion: "un compañero te ayudó a terminar rápido", ganancia: [2, 7] }
  ]
  
  const multaExtra = [
    { nombre: "🌸 Por llegar tarde", accion: "llegaste tarde y te descontaron", perdida: [2, 8] },
    { nombre: "💗 Error en factura", accion: "facturaste mal y te descontaron", perdida: [3, 10] },
    { nombre: "✨ Queja de cliente", accion: "un cliente se quejó de ti", perdida: [4, 12] },
    { nombre: "🎀 Mal humor", accion: "tuviste un mal día y te descontaron", perdida: [3, 9] },
    { nombre: "🧸 Romper algo", accion: "rompiste material de trabajo", perdida: [2, 7] }
  ]
  
  let esGanar = Math.random() < 0.7
  
  if (esGanar) {
    let trabajo = trabajosGanar[Math.floor(Math.random() * trabajosGanar.length)]
    let ganancia = Math.floor(Math.random() * (trabajo.ganancia[1] - trabajo.ganancia[0] + 1) + trabajo.ganancia[0])
    
    let tieneBonus = Math.random() < 0.25
    let bonusTexto = ""
    
    if (tieneBonus) {
      let bonus = bonusExtra[Math.floor(Math.random() * bonusExtra.length)]
      let bonusMonto = Math.floor(Math.random() * (bonus.ganancia[1] - bonus.ganancia[0] + 1) + bonus.ganancia[0])
      ganancia += bonusMonto
      bonusTexto = `\n> ₊· ⫏⫏ ㅤ *🎁 ${bonus.nombre}:* +${bonusMonto} USD`
    }
    
    user.USD = (user.USD || 0) + ganancia
    
    let mensajesBase = [
      `🌸 *${trabajo.nombre}* ${trabajo.accion} y recibió su paga.`,
      `💗 Con mucho esfuerzo, ${trabajo.accion} y cobró su salario.`,
      `✨ *${trabajo.nombre}* ${trabajo.accion}. ¡Excelente trabajo!`,
      `🎀 Después de ${trabajo.accion}, recibió su sueldo.`,
      `🧸 *${trabajo.nombre}* ${trabajo.accion}. El jefe está feliz!`
    ]
    let mensajeAccion = mensajesBase[Math.floor(Math.random() * mensajesBase.length)]
    
    if (tieneBonus) mensajeAccion += ` Además, recibió un bono extra.`
    
    await m.reply(`
ㅤ    ꒰  ㅤ 💼 ㅤ *αℓуα - ωσяк* ㅤ ✅ ㅤ 性

> ₊· ⫏⫏ ㅤ *🧑‍💼 Empleado:* ${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📋 Reporte:* ${mensajeAccion}
> ₊· ⫏⫏ ㅤ *💰 Paga:* +${ganancia} USD
${bonusTexto}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *💵 Total en cuenta:* ${user.USD} USD
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
    
  } else {
    let trabajo = trabajosPerder[Math.floor(Math.random() * trabajosPerder.length)]
    let perdida = Math.floor(Math.random() * (trabajo.perdida[1] - trabajo.perdida[0] + 1) + trabajo.perdida[0])
    
    let tieneMulta = Math.random() < 0.25
    let multaTexto = ""
    
    if (tieneMulta) {
      let multa = multaExtra[Math.floor(Math.random() * multaExtra.length)]
      let multaMonto = Math.floor(Math.random() * (multa.perdida[1] - multa.perdida[0] + 1) + multa.perdida[0])
      perdida += multaMonto
      multaTexto = `\n> ₊· ⫏⫏ ㅤ *⚠️ ${multa.nombre}:* -${multaMonto} USD`
    }
    
    user.USD = Math.max(0, (user.USD || 0) - perdida)
    
    let mensajesBase = [
      `🌸 *${trabajo.nombre}* ${trabajo.accion} y le descontaron del sueldo.`,
      `💗 Por desgracia, ${trabajo.accion} y recibió un castigo.`,
      `✨ *${trabajo.nombre}* ${trabajo.accion}. ¡Qué mala suerte!`,
      `🎀 ${trabajo.accion} y por eso le quitaron parte de su paga.`,
      `🧸 *${trabajo.nombre}* ${trabajo.accion}. Hoy no fue su día.`
    ]
    let mensajeAccion = mensajesBase[Math.floor(Math.random() * mensajesBase.length)]
    
    if (tieneMulta) mensajeAccion += ` Además, recibió una multa adicional.`
    
    await m.reply(`
ㅤ    ꒰  ㅤ 💼 ㅤ *αℓуα - ωσяк* ㅤ ❌ ㅤ 性

> ₊· ⫏⫏ ㅤ *🧑‍💼 Empleado:* ${m.sender.split('@')[0]}
> ₊· ⫏⫏ ㅤ *📋 Reporte:* ${mensajeAccion}
> ₊· ⫏⫏ ㅤ *💸 Descuento:* -${perdida} USD
${multaTexto}

ㅤ    ꒰  ㅤ ✿ ㅤ *αℓуα - вσт* ㅤ ⫏⫏ ꒱
> ₊· ⫏⫏ ㅤ *💵 Total en cuenta:* ${user.USD} USD
> ₊· ⫏⫏ ㅤ 🔖 Cяєα∂σя: Lʏᴏɴɴ
    `.trim())
  }
  
  user.lastwork = Date.now()
}

handler.help = ['work']
handler.tags = ['economy']
handler.command = ['work', 'trabajar']

export default handler

function msToTime(ms) {
  let minutes = Math.floor(ms / 60000)
  let seconds = Math.floor((ms % 60000) / 1000)
  
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''}`
  return `${seconds} segundo${seconds > 1 ? 's' : ''}`
}