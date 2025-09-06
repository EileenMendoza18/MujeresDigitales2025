//if - else

console.log("=== IF-ELSE==");

const numero=10;

if (isNaN(numero)) {
    console.log("El valor ingresado no es un numero, entrada invalida.")
}else if (numero%2===0) {
    console.log("El numero ingresado es par.")
}else {
    console.log("El numero ingresado es impar.")
}


//SWITCH

console.log("=== SWITCH==");

const option=2;

switch (option) {
    case 1:
        console.log("Medicina general")
        break;
    case 2:
        console.log("Odontologia") 
        break;
    case 3: 
        console.log("Psicologia")
        break;
       
    default:
        console.log("La opcion seleccionada no se encuentra en las opciones de este hospital")
        break;
}


//CICLOS-FOR

console.log("===CICLO FOR===");

for (let NumVuelta = 1; NumVuelta <= 5; NumVuelta++) {
    console.log(`Esta es la vuelta numero ${NumVuelta}`); 
}

//CICLOS-WHILE

console.log("===CICLO WHILE===");

let contador=1;

while (contador<=10) {
    console.log(`Vamos en el numero ${contador}`)
    contador++;
}