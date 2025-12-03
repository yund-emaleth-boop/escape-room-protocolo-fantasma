// --- INICIALIZACIÓN Y FUERZA DE REINICIO ---
localStorage.clear(); 

// --- DATOS DE LOS ENIGMAS ---
const enigmas = [
    {
        nivel: 1,
        titulo: "Constante 1 — El Muro de Permanencia de Raoul",
        enigma: "El muro revela la matriz A y te exige el <b>determinante de A<sup>T</sup>A</b>. A = <code>[[3,4],[4,-3]]</code>.",
        pista: "Recuerda que det(A<sup>T</sup>A) = (det(A))<sup>2</sup>.",
        respuestaCorrecta: "25",
        respuestaGuardada: "",
        resolucionNarrativa: "Cuando introduces <b>25</b>, el muro exhala un impulso estático y las líneas de energía se alinean en el Núcleo."
    },
    {
        nivel: 2,
        titulo: "Constante 2 — El Resonador del Caos de Erik",
        enigma: "Un modo resonante satisface n<sub>x</sub><sup>2</sup> + n<sub>y</sub><sup>2</sup> + n<sub>z</sub><sup>2</sup> = 12. Introduce la suma.",
        pista: "Suma de los cuadrados de los números enteros.",
        respuestaCorrecta: "12",
        respuestaGuardada: "",
        resolucionNarrativa: "Tu entrada <b>12</b> hace vibrar el aire digital y el resonador de Erik pulsa con intensidad creciente."
    },
    {
        nivel: 3,
        titulo: "Constante 3 — El Arsenal Galvánico de Christine",
        enigma: "Identifica el Número Atómico (Z) del elemento con configuración externa <code>[Ar] 3d10 4s2</code>.",
        pista: "Número entero: suma de los electrones en 3d10 y 4s2.",
        respuestaCorrecta: "30",
        respuestaGuardada: "",
        resolucionNarrativa: "El <b>30</b> aparece en la consola y los espectros se ordenan siguiendo patrones precisos de Christine."
    },
    {
        nivel: 4,
        titulo: "Constante 4 — El Compresor del Núcleo Languideciente",
        enigma: "Trabajo de expansión isoterma: introduce <b>W = 2000</b> (sin unidades).",
        pista: "Valor exacto: 2000",
        respuestaCorrecta: "2000",
        respuestaGuardada: "",
        resolucionNarrativa: "Cuando ingresas <b>2000</b>, el compresor libera un chorro de aire tibio que estabiliza el flujo interno."
    },
    {
        nivel: 5,
        titulo: "Constante 5 — El Autómata de la Evolución Contenida",
        enigma: "Un autómata necesita m estados si m = 11. Introduce el número de estados.",
        pista: "Número entero que define la congruencia: m",
        respuestaCorrecta: "11",
        respuestaGuardada: "",
        resolucionNarrativa: "Tu respuesta —<b>11</b>— resuena como un chasquido en el engranaje binario y desbloquea la memoria del sistema."
    },
    {
        nivel: 6,
        titulo: "Constante 6 — La Vitrina de los Pilares Universales",
        enigma: "¿Cuántas unidades base del SI dependen de <b>h</b> o <b>k</b>? Formato: dos dígitos.",
        pista: "Kilogramo y Kelvin",
        respuestaCorrecta: "02",
        respuestaGuardada: "",
        resolucionNarrativa: "El <b>02</b> ilumina dos unidades en la vitrina: Kelvin y kilogramo, recordando la esencia de las constantes fundamentales."
    },
    {
        nivel: 7,
        titulo: "Constante 7 — El Altar de las Fuerzas Primordiales",
        enigma: "Número total de fuerzas fundamentales (incluyendo gravedad). Formato: dos dígitos.",
        pista: "Electromagnetismo, Fuerte, Débil, Gravedad",
        respuestaCorrecta: "04",
        respuestaGuardada: "",
        resolucionNarrativa: "Al escribir <b>04</b>, los cuatro símbolos del altar se alinean, estabilizando la energía de la Simulación."
    },
    {
        nivel: 8,
        titulo: "Constante 8 — Reinicio Maestro",
        enigma: "Introduce la Clave de 16 dígitos concatenando las 7 constantes: C1C2C3C4C5C6C7.",
        pista: "Concatenación de todas las constantes",
        respuestaCorrecta: "2512302000110204",
        respuestaGuardada: "",
        resolucionNarrativa: "¡Acceso concedido! La simulación se estabiliza y el Núcleo retorna a su equilibrio original."
    }
];

// --- VARIABLES DE ESTADO ---
let nivelActual = 0;

// --- FUNCIONES DE PERSISTENCIA ---
function guardarEstado() {
    localStorage.setItem('nivelActual', nivelActual);
    localStorage.setItem('enigmasGuardados', JSON.stringify(enigmas.map(e => e.respuestaGuardada)));
}

function cargarEstado() {
    const nivelGuardado = localStorage.getItem('nivelActual');
    const respuestasGuardadas = localStorage.getItem('enigmasGuardados');

    if (nivelGuardado !== null) nivelActual = parseInt(nivelGuardado, 10);

    if (respuestasGuardadas) {
        const respuestas = JSON.parse(respuestasGuardadas);
        enigmas.forEach((e, i) => e.respuestaGuardada = respuestas[i] || "");
    }
}

// --- CARGA DEL NIVEL ---
document.addEventListener('DOMContentLoaded', () => {
    cargarEstado();
    cargarNivel();
});

function cargarNivel() {
    document.getElementById('juego-contenedor').style.display = 'block';
    
    if (nivelActual >= enigmas.length) {
        mostrarFinal();
        return;
    }

    const enigmaData = enigmas[nivelActual];

    document.getElementById('mensaje-area').innerHTML = '';
    document.getElementById('mensaje-area').className = '';
    document.getElementById('progreso-area').textContent = `Constante [${nivelActual + 1} de ${enigmas.length}]`;

    document.getElementById('juego-contenedor').querySelector('h1').textContent = `PROTOCOLO: ${enigmaData.titulo}`;
    document.getElementById('enigma-texto').innerHTML = enigmaData.enigma;
    document.querySelector('.pista').textContent = `(Pista: ${enigmaData.pista})`;

    document.getElementById('respuesta').value = '';
    document.getElementById('respuesta').focus();

    if (enigmaData.respuestaGuardada !== "") {
        document.getElementById('mensaje-area').innerHTML = `
            <div class="mensaje-constante-resuelto">
                <p><b>CLAVE ENCONTRADA: ${enigmaData.respuestaGuardada}</b></p>
                <hr style="border-top: 1px dashed var(--color-primary-neon); margin: 15px 0;">
                <p style="font-size: 0.9em;">${enigmaData.resolucionNarrativa}</p>
            </div>
        `;
        document.getElementById('mensaje-area').className = 'correcto';
    }

    actualizarControles();
}

function actualizarControles() {
    const botonAnt = document.getElementById('boton-anterior');
    const botonSig = document.getElementById('boton-siguiente');
    const botonVerificar = document.querySelector('#interaccion-area button');
    const resuelta = enigmas[nivelActual].respuestaGuardada !== "";
    const respuestaInput = document.getElementById('respuesta');

    botonAnt.disabled = (nivelActual === 0);
    botonSig.disabled = !resuelta;
    
    botonVerificar.textContent = resuelta ? 'Resuelto' : 'Verificar';
    botonVerificar.disabled = resuelta;
    respuestaInput.disabled = resuelta;

    if (nivelActual === enigmas.length - 1 && resuelta) {
        botonSig.textContent = 'Secuencia Final →';
    } else if (nivelActual < enigmas.length - 1 && resuelta) {
        botonSig.textContent = 'Siguiente →';
    } else {
        botonSig.textContent = 'Siguiente →';
    }
}

// --- NAVEGACIÓN ENTRE NIVELES ---
function cambiarNivel(direccion) {
    if (nivelActual + direccion >= 0 && nivelActual + direccion < enigmas.length) {
        nivelActual += direccion;
        cargarNivel();
        guardarEstado();
    } else if (nivelActual + direccion === enigmas.length) {
        mostrarFinal();
    }
}

// --- VERIFICAR RESPUESTA ---
function verificarRespuesta() {
    const respuestaInput = document.getElementById('respuesta');
    const respuestaUsuario = respuestaInput.value.trim().toUpperCase();
    const enigmaData = enigmas[nivelActual];
    const mensajeArea = document.getElementById('mensaje-area');

    if (respuestaUsuario === enigmaData.respuestaCorrecta.toUpperCase()) {
        enigmaData.respuestaGuardada = enigmaData.respuestaCorrecta;
        guardarEstado();
        respuestaInput.value = '';

        mensajeArea.innerHTML = `
            <div class="mensaje-constante-resuelto">
                <p>¡CLAVE CORRECTA! CONSTANTE ALINEADA.</p>
                <hr style="border-top: 1px dashed var(--color-primary-neon); margin: 15px 0;">
                <p style="font-size: 0.9em;">${enigmaData.resolucionNarrativa}</p>
            </div>
        `;
        mensajeArea.className = 'correcto';
        actualizarControles();
    } else {
        mensajeArea.textContent = 'Clave incorrecta. ¡Error en la matriz!';
        mensajeArea.className = 'incorrecto';
    }
}

// --- PANTALLA FINAL ---
function mostrarFinal() {
    document.getElementById('navegacion-area').style.display = 'none';
    document.getElementById('progreso-area').style.display = 'none';
    document.getElementById('interaccion-area').style.display = 'none';

    const contenedor = document.getElementById('juego-contenedor');
    const claveFinal = enigmas.map(e => e.respuestaGuardada).join('');
    
    contenedor.querySelector('h1').textContent = 'PROTOCOLO FANTASMA COMPLETADO: REINICIO MAESTRO.';
    
    let contenidoFinal = '<h2>[CLAVE MAESTRA GENERADA]</h2>';
    contenidoFinal += '<p>Has descifrado las siete constantes y alineado la lógica de Raoul con la evolución de Erik. La Simulación está a salvo.</p>';
    contenidoFinal += '<p>La <b>Secuencia de Reinicio</b> es:</p>';
    
    contenidoFinal += '<div class="clave-final-display">';
    for (let i = 0; i < claveFinal.length; i++) {
        contenidoFinal += `<span style="animation-delay:${i*0.1}s">${claveFinal[i]}</span>`;
    }
    contenidoFinal += '</div>';

    contenidoFinal += '<p class="resaltado">Introduce esta Secuencia Maestra en el puerto de salida para acceder a las coordenadas del mundo real (TU REGALO).</p>';
    contenidoFinal += `<a href="https://sites.google.com/view/engranaje-cero" id="enlace-final" class="boton-caratula" target="_blank" style="margin-top: 30px; display: block; text-decoration: none;">ACCEDER AL PUERTO DE SALIDA (${claveFinal.length} DÍGITOS)</a>`;

    document.getElementById('enigma-area').innerHTML = contenidoFinal;
    document.getElementById('mensaje-area').innerHTML = '';
}

// --- EXPORTAR FUNCIONES PARA BOTONES ---
window.cambiarNivel = cambiarNivel;
window.verificarRespuesta = verificarRespuesta;
window.cargarNivel = cargarNivel;
