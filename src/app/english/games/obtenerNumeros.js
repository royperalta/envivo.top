export function obtenerTresNumerosUnicos(total) {
    // Array con los números del 1 al 10
    const numerosDisponibles = Array.from({ length: total }, (_, index) => index + 1);
  
    // Array para almacenar los tres números seleccionados
    const numerosSeleccionados = [];
  
    // Muestreo sin reemplazo para obtener tres números únicos
    for (let i = 0; i < 3; i++) {
      // Obtener un índice aleatorio dentro del rango actual de números disponibles
      const indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
  
      // Obtener el número correspondiente al índice aleatorio
      const numeroSeleccionado = numerosDisponibles.splice(indiceAleatorio, 1)[0];
  
      // Agregar el número seleccionado al array de números seleccionados
      numerosSeleccionados.push(numeroSeleccionado);
    }
  
    return numerosSeleccionados;
  }
  
  