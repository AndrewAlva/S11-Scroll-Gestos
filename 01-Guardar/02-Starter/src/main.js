import './style.css';
import * as THREE from 'three';
console.log("01-Guardar (datos). 02-Starter.");

// Obtener referencias a los elementos del DOM ---------------------------------------------------------------
const deltaModeContainer = document.getElementById("wheel-deltaMode");
const deltaYContainer = document.getElementById("wheel-deltaY");
const deltaTotalContainer = document.getElementById("wheel-deltaTotal");
const directionContainer = document.getElementById("wheel-direction");
const speedContainer = document.getElementById("wheel-speed");
// -------------------------------------------------------------------------



// Definición de variables y constantes ---------------------------------------------------------------
let wheelData = {
  deltaMode: 0,   // 0 píxeles · 1 líneas · 2 páginas
  deltaY: 0,      // el último cambio que llegó: positivo abajo, negativo arriba
  deltaTotal: 0,  // la suma de todos los deltaY que llegaron
  direction: 0,   // 1 abajo · -1 arriba · 0 quieto
  speed: 0        // qué tan rápido llega el gesto
};

let deltaFrame = 0;          // lo que llegó desde el último frame
let ultimoGesto = -Infinity; // cuándo llegó el último delta distinto de 0
let eventos = 0;             // eventos contados en la ventana actual
let ventana = performance.now();

const PX_POR_LINEA = 16;
// -------------------------------------------------------------------------






// Funciones de utilidad ---------------------------------------------------------------
// map(): convierte un valor de un rango a otro
function map(valor, inMin, inMax, outMin, outMax) {
  const t = (valor - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

// clamp(): mantiene un valor entre un mínimo y un máximo
function clamp(valor, min, max) {
  return Math.min(max, Math.max(min, valor));
}
// -------------------------------------------------------------------------








// Gesto: contar (solo en el evento) ---------------------------------------------------------------
// No hay scroll que leer: la página no se mueve. Pero el gesto sí llega, en el evento wheel.
document.addEventListener("wheel", (eventData) => {
  // console.log("eventData", eventData);
  // console.log("eventData.deltaMode", eventData.deltaMode);
  // console.log("eventData.deltaY", eventData.deltaY);

  updateWheelData(eventData);
});

function updateWheelData(eventData) {
  // Nota: en Firefox con mouse de rueda deltaY puede llegar en líneas (eventData.deltaMode === 1).
  // Para esta demo lo usamos directo; para convertir a píxeles, multiplica por 16.

  // 1 · deltaMode: lee la unidad ANTES de usar deltaY
  

  // 2 · deltaY en píxeles
  

  // 3 · delta acumulado: con signo, abajo suma y arriba resta
  

  // para el loop

  // 5 · dirección
}

function updateDOMContainers() {
  
}
// -------------------------------------------------------------------------






// Loop de animación ---------------------------------------------------------------
let tPrevio = performance.now();

function animate(t) {
  const dt = Math.max((t - tPrevio) / 1000, 0.001); // segundos; nunca 0, evita dividir entre 0
  tPrevio = t;

  // 4 · velocidad: píxeles de este frame ÷ tiempo del frame, suavizada
  
  // 5 · dirección: si pasan 150 ms sin gesto, vuelve a "quieto"
  
  // 6 · eventos por segundo: contar y reiniciar cada segundo
  if (t - ventana >= 1000) {
    wheelData.eps = Math.round(eventos / ((t - ventana) / 1000));
    eventos = 0;
    ventana = t;
  }

  updateDOMContainers();
  
  requestAnimationFrame(animate);
}

animate();
// -------------------------------------------------------------------------
