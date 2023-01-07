const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

//Seccion de span
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

//JSON
let jugadorId = null
let enemigoId = null

let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones

// InputMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma

// botones de ataques
let botonFuego
let botonAgua
let botonTierra
let botones = []

let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasEnemigo = 3
let vidasJugador = 3

//Canva
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa ) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, "./assets/hipodoge.png")
let Capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, "./assets/capipepo.png")
let Ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, "./assets/ratigueya.png")
let Langostelvis= new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png', 5, "./assets/langostelvis.png")
let Pydos= new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', 5, "./assets/pydos.png")
let Tucapalma= new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png', 5, "./assets/tucapalma.png")

const hipodogeAtaques = [
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
]

Hipodoge.ataques.push(...hipodogeAtaques)

const capipepoAtaques = [
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
]

Capipepo.ataques.push(...capipepoAtaques)

const ratigueyaAtaques = [
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
]

Ratigueya.ataques.push(...ratigueyaAtaques)

const langostelvisAtaques = [
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
]

Langostelvis.ataques.push(...langostelvisAtaques)

const pydosAtaques = [
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🔥", id: "boton-fuego"},
]

Pydos.ataques.push(...pydosAtaques)

const tucapalmaAtaques = [
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
]

Tucapalma.ataques.push(...tucapalmaAtaques)

mokepones.push(Hipodoge, Capipepo, Ratigueya, Langostelvis, Pydos, Tucapalma)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
         <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
             <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputLangostelvis = document.getElementById("Langostelvis")
    inputPydos = document.getElementById("Pydos")
    inputTucapalma = document.getElementById("Tucapalma")
    })

    botonMascotaJugador.addEventListener("click" , seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.114:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if(inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if(inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else if(inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    }   else {
        alert("No seleccionaste una mascota")
        return
    }

    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)

    //Iniciar Canva
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.114:8080/mokepon/${jugadorId}` , {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
         `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("Fuego 🔥")
                console.log(ataqueJugador)
                boton.style.background = "#E5B8F4"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("Agua 💧")
                console.log(ataqueJugador)
                boton.style.background = "#E5B8F4"
                boton.disabled = true
            } else {
                ataqueJugador.push("Tierra 🌱")
                console.log(ataqueJugador)
                boton.style.background = "#E5B8F4"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.114:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ataques : ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.114:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combateGanador()
                         }
                    })
            }
    }) 
}

function seleccionarMascotaEnemigo(enemigo) {  
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre;
    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
  
    if (ataque == "🔥") {
      ataqueEnemigo.push("Fuego 🔥");
    } else if (ataque == "💧") {
      ataqueEnemigo.push("Agua 💧");
    } else {
      ataqueEnemigo.push("Tierra 🌱");
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if(ataqueJugador.length == 5) {
        combateGanador()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combateGanador() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("Empate")
        } else if(ataqueJugador[index] === "Fuego 🔥" && ataqueEnemigo[index] === "Tierra 🌱") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === "Tierra 🌱" && ataqueEnemigo[index] === "Agua 💧") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Agua 💧" && ataqueEnemigo[index] === "Fuego 🔥") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
        indexAmbosOponentes(index, index)
        crearMensaje("Perdiste")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    // Revisar las Vidas
    revisarVidas()
    }
}

function revisarVidas() {
    if(victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!")
    } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Ganaste!!")
    } else {
        crearMensajeFinal("Perdiste!!")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.Width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )  
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.114:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, "./assets/hipodoge.png", enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, "./assets/capipepo.png", enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, "./assets/ratigueya.png", enemigo.id)
                        } else if (mokeponNombre === "Langostelvis") {
                            mokeponEnemigo = new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png', 5, "./assets/langostelvis.png", enemigo.id)
                        } else if (mokeponNombre === "Pydos") {
                            mokeponEnemigo = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', 5, "./assets/pydos.png", enemigo.id)
                        } else {
                            mokeponEnemigo = new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png', 5, "./assets/tucapalma.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown",sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquieraEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota= mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquieraEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    } else {
        detenerMovimiento()
        clearInterval(intervalo)
        console.log("Se detecto una colision")

        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
    }
}

window.addEventListener("load" , iniciarJuego)