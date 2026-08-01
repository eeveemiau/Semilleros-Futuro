console.log("prueba")


const comun = 1
const raro = 2
const enPeligro = 3
let cantidad = 200

function calcularPuntaje(comun, raro, enPeligro) {
    if (cantidad >= 100) {
        console.log("La planta es común, su puntaje es: " + comun)
    } else if (cantidad >= 50) {
        console.log("La planta es rara, su puntaje es: " + raro)
    } else {
        console.log("La planta está en peligro, su puntaje es: " + enPeligro)
    }
}

calcularPuntaje(comun, raro, enPeligro)
console.log("Cantidad de plantas: " + cantidad)