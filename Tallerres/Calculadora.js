const readline = require("readline");
const opciones = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    console.log("\nOpciones: \n1-Sumar \n2-Restar \n3-Multiplicar \n4-Dividir \n5-Sacar porcentaje \n 6-Sacar raices \n7-Salir");
    opciones.question("\nIngrese la opcion que desea: ", (num_opc)=>{
        const opcion=Number(num_opc);

        switch (opcion) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6: 
                opciones.question("\nIngrese el primer numero: ", (valor1) => {
                const numero1 = Number(valor1);

                if (isNaN(numero1)) {
                    console.log("\nNo es un numero valido");
                    return menu(); 
                }

                opciones.question("\nIngrese el segundo numero: ", (valor2) => {
                    const numero2 = Number(valor2);

                    if (isNaN(numero2)) {
                        console.log("\nNo es un numero valido");
                        return menu();
                    }
                    else {
                        switch (opcion) {
                            case 1:
                                console.log(`El resultado de la suma es: ${numero1 + numero2}`);
                                break;
                            case 2:
                                console.log(`El resultado de la resta es: ${numero1 - numero2}`);
                                break;
                            case 3:
                                console.log(`El resultado de la multiplicacion es: ${numero1 * numero2}`);
                                break;
                            case 4:
                                if (numero2 === 0) {
                                    console.log("No se puede dividir entre 0");
                                } else {
                                    console.log(`El resultado de la división es: ${numero1 / numero2}`);
                                }
                                break;
                            case 5:
                            }
                        }   

                    menu();
                });
            });
            break
            case 7:
                console.log("\nSaliendo de la calculadora ...");
                opciones.close();
                return;
            default:
                console.log("\nLa opcion ingresada no es valida");
                return menu();
        }
    });
};

// Inicia el menú
menu();
