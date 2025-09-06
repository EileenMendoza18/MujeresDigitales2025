// const numero=10;

// if (isNaN(numero)) {
//     console.log("El valor ingresado no es un numero")
//     return
// }else if(numero%2===0){
//     console.log("El numero ingresado es par")
// }else{
//     console.log("El numero ingresado es impar")
// }


const ParImpar=require("readline").createInterface({ // libreria readline para leer datos ingresados 
    input:process.stdin, // entrada de datos
    output:process.stdout // salida de datos
});

ParImpar.question("Ingrese el valor del numero: ", (valor)=>{ // pregunta al usuario y el valor ingresado se guarda en la variable valor
    console.log("El valor ingresado es: ", valor);
    const numero=Number(valor); // convierte el valor ingresado a numero
    if (isNaN(numero)) { // si el valor ingresado no es un numero 
        console.log("El valor ingresado no es un numero");
        ParImpar.close(); // se cierra si se cumple la condicion
        return; // se sale de la funcion
    }else if(numero%2===0){
        console.log("El numero ingresado es par"); // si el numero es divisible entre 2 es par
    }else{
        console.log("El numero ingresado es impar");// si no es par es impar
    }

    ParImpar.close();// se cierra el programa
});