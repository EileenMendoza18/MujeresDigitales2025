// Se importa el módulo readline de Node.js que permite crear interfaces de línea de comandos
const readline = require("readline");
// Se crea una interfaz de línea de comandos llamada opciones que utiliza stdin para entrada y stdout para salida
const opciones = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Se define la función menu que será la función principal para mostrar las opciones de la calculadora
const menu = () => {
    // Se muestra el título del menú de opciones
    console.log("\nOpciones: \n1-Sumar");
    // Se muestra la opción 2 para restar
    console.log("2-Restar");
    // Se muestra la opción 3 para multiplicar
    console.log("3-Multiplicar");
    // Se muestra la opción 4 para dividir
    console.log("4-Dividir");
    // Se muestra la opción 5 para sacar porcentaje
    console.log("5-Sacar porcentaje");
    // Se muestra la opción 6 para sacar raíces
    console.log("6-Sacar raices");
    // Se muestra la opción 7 para sacar potencia
    console.log("7-Sacar potencia");
    // Se muestra la opción 8 para sacar seno
    console.log("8-Sacar seno");
    // Se muestra la opción 9 para sacar coseno
    console.log("9-Sacar Coseno");
    // Se muestra la opción 10 para sacar tangente
    console.log("10-Sacar Tangente");
    // Se muestra la opción 11 para sacar cotangente
    console.log("11-Sacar Cotangente");
    // Se muestra la opción 12 para sacar secante
    console.log("12-Sacar Secante");
    // Se muestra la opción 13 para sacar cosecante
    console.log("13-Sacar Cosecante");
    // Se muestra la opción 14 para salir
    console.log("14-Salir");

    // Se utiliza el método question para solicitar al usuario que ingrese la opción deseada
    opciones.question("\nIngrese la opcion que desea: ", (num_opc)=>{
        // Se convierte la entrada del usuario a un número y se almacena en la constante opcion
        const opcion=Number(num_opc);

        // Se inicia una declaración switch que evaluará la opción seleccionada por el usuario
        switch (opcion) {
            // Se agrupan los casos 1, 2, 3 y 4 ya que requieren el mismo flujo: solicitar dos números
            case 1:
            case 2:
            case 3:
            case 4: 
                // Se solicita al usuario que ingrese el primer número para las operaciones básicas
                opciones.question("\nIngrese el primer numero: ", (valor1) => {
                // Se convierte la entrada del primer número a tipo Number y se almacena en numero1
                const numero1 = Number(valor1);

                // Se valida que el primer número ingresado sea válido usando isNaN()
                if (isNaN(numero1)) {
                    // Se muestra mensaje de error si no es válido
                    console.log("\nNo es un numero valido");
                    // Se retorna al menú principal
                    return menu(); 
                }

                // Se solicita al usuario que ingrese el segundo número para completar la operación
                opciones.question("\nIngrese el segundo numero: ", (valor2) => {
                    // Se convierte la entrada del segundo número a tipo Number y se almacena en numero2
                    const numero2 = Number(valor2);

                    // Se valida que el segundo número ingresado sea válido
                    if (isNaN(numero2)) {
                        // Se muestra mensaje de error si no es válido
                        console.log("\nNo es un numero valido");
                        // Se retorna al menú principal
                        return menu();
                    }
                    // Se inicia un bloque else para cuando ambos números son válidos
                    else {
                        // Se inicia un segundo switch anidado para determinar qué operación específica realizar
                        switch (opcion) {
                            // Se maneja el caso 1 para suma
                            case 1:
                                // Se calcula la suma de numero1 + numero2 y se muestra el resultado
                                console.log(`El resultado de la suma es: ${numero1 + numero2}`);
                                break;
                            // Se maneja el caso 2 para resta
                            case 2:
                                // Se calcula la resta de numero1 - numero2 y se muestra el resultado
                                console.log(`El resultado de la resta es: ${numero1 - numero2}`);
                                break;
                            // Se maneja el caso 3 para multiplicación
                            case 3:
                                // Se calcula la multiplicación de numero1 * numero2 y se muestra el resultado
                                console.log(`El resultado de la multiplicacion es: ${numero1 * numero2}`);
                                break;
                            // Se maneja el caso 4 para división
                            case 4:
                                // Se verifica si el segundo número es cero para evitar división por cero
                                if (numero2 === 0) {
                                    // Se muestra mensaje de error si es cero
                                    console.log("No se puede dividir entre 0");
                                } else {
                                    // Se calcula y muestra la división si es válida
                                    console.log(`El resultado de la división es: ${numero1 / numero2}`);
                                }
                                break;
                            
                            }
                        }   

                    // Se llama recursivamente a la función menu() para mostrar las opciones nuevamente
                    menu();
                });
            });
            // Se agrega la declaración break para salir del switch principal
            break
            // Se inicia el caso 5 para calcular porcentajes
            case 5:
                // Se solicita al usuario que ingrese el número base para el cálculo de porcentaje
                opciones.question("\nInngrese el numero: ", (valor) =>{
                    // Se convierte la entrada a número y se almacena en numero
                    const numero=Number(valor);

                    // Se valida que el número ingresado sea válido
                    if (isNaN(numero)) {
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl numero ingresado no es valido");
                        // Se retorna al menú
                        return menu();
                    }else{
                        // Se solicita al usuario que ingrese el valor del porcentaje
                        opciones.question("\nIngrese el valor del porcentaje: ", (valorPorcentaje) =>{
                            // Se convierte la entrada del porcentaje a número y se almacena en porcentaje
                            const porcentaje=Number(valorPorcentaje);
                            // Se valida que el porcentaje ingresado sea válido
                            if (isNaN(porcentaje)) {
                                // Se muestra mensaje de error si el porcentaje no es válido
                                console.log("\nEl porcentaje ingresado no es valido");
                                // Se retorna al menú principal
                                return menu();
                            }else{
                                // Se calcula y muestra el resultado del porcentaje usando la fórmula (numero * porcentaje) / 100
                                console.log(`El ${porcentaje}% de ${numero} es: ${(numero * porcentaje) / 100}`);
                                // Se retorna al menú principal después del cálculo
                                return menu();
                            }
                        })
                    }
                })
                // Se agrega el break para finalizar el caso 5
                break;
            // Se inicia el caso 6 para calcular raíces
            case 6:
                // Se solicita al usuario que ingrese el número para calcular su raíz
                opciones.question("\nIngrese el numero: ", valor =>{
                    // Se convierte la entrada a número y se almacena en numero
                    const numero=Number(valor); 

                    // Se valida que el número ingresado sea válido
                    if (isNaN(numero)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl numero ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se verifica que el número no sea negativo ya que no se pueden calcular raíces reales de números negativos
                        if (numero < 0) {
                            // Se muestra mensaje de error para números negativos
                            console.log("\nNo se pueden sacar raices de numeros negativos");
                            // Se retorna al menú principal
                            return menu();
                        } else {
                            // Se solicita al usuario que ingrese el índice de la raíz
                            opciones.question("\nIngrese el indice de la raiz: ", (valorIndice)=>{
                                // Se convierte la entrada del índice a número
                                const indice=Number(valorIndice);
                                // Se valida que el índice sea válido (número mayor que 0)
                                if (isNaN(indice) || indice <= 0) {
                                    // Se muestra mensaje de error si el índice no es válido
                                    console.log("\nEl indice ingresado no es valido");
                                    // Se retorna al menú principal
                                    return menu();
                                }else {
                                    // Se calcula y muestra la raíz usando Math.pow(numero, 1/indice)
                                    console.log(`La raiz ${indice} de ${numero} es: ${Math.pow(numero, 1/indice)}`);
                                    // Se retorna al menú principal
                                    return menu();
                                }
                            })
                        }
                    }
                })
                // Se agrega el break para finalizar el caso 6
                break;
            // Se inicia el caso 7 para calcular potencias
            case 7:
                // Se solicita al usuario que ingrese el número base
                opciones.question("\nIngrese el numero: ", (valor)=>{
                    // Se convierte la entrada a número y se almacena en numero
                    const numero=Number(valor);

                    // Se valida que el número ingresado sea válido
                    if (isNaN(numero)) {
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl numero ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {

                        // Se solicita al usuario que ingrese la potencia
                        opciones.question("\nIngrese la potencia: ",(valorPotencia)=>{
                            // Se convierte la entrada de la potencia a número
                            const potencia=Number(valorPotencia);

                            // Se valida que la potencia ingresada sea válida
                            if (isNaN(potencia)) {
                                // Se muestra mensaje de error si la potencia no es válida
                                console.log("\nLa potencia ingresada no es valida");
                                // Se retorna al menú principal
                                return menu();
                            }else if (potencia === 0) {
                                // Se maneja el caso especial donde la potencia es 0 (cualquier número elevado a 0 es 1)
                                console.log(`Cualquier numero elevado a la potencia 0 es 1`);
                                // Se retorna al menú principal
                                return menu();
                            }else if (numero === 0) {
                                // Se maneja el caso especial donde el número base es 0
                                console.log(`0 elevado a cualquier potencia es 0`);
                                // Se retorna al menú principal
                                return menu();
                            }else if (numero<0){
                                // Se maneja el caso donde el número base es negativo, mostrando el resultado con formato especial
                                console.log(`El resultado de ${numero} elevado a la ${potencia} es: - ${Math.pow(numero, potencia)}`);
                                // Se retorna al menú principal
                                return menu();
                            }else {
                                // Se calcula y muestra la potencia usando Math.pow(numero, potencia) para casos normales
                                console.log(`El resultado de ${numero} elevado a la ${potencia} es: ${Math.pow(numero, potencia)}`);
                                // Se retorna al menú principal
                                return menu();
                            }
                        })
                    }
                })
                // Se agrega el break para finalizar el caso 7
                break;
            // Se inicia el caso 8 para calcular el seno
            case 8:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);

                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula el seno usando Math.sin(radianes) y se almacena en seno
                        const seno=Math.sin(radianes);
                        // Se muestra el resultado del seno del ángulo
                        console.log(`El seno de ${grados} grados es: ${seno}`);
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 8
                break;
            // Se inicia el caso 9 para calcular el coseno
            case 9:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);

                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula el coseno usando Math.cos(radianes) y se almacena en coseno
                        const coseno=Math.cos(radianes);
                        // Se muestra el resultado del coseno del ángulo
                        console.log(`El coseno de ${grados} grados es: ${coseno}`);
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 9
                break;
            // Se inicia el caso 10 para calcular la tangente
            case 10:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);

                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula la tangente usando Math.tan(radianes) y se almacena en tangente
                        const tangente=Math.tan(radianes);
                        // Se muestra el resultado de la tangente del ángulo
                        console.log(`La tangente de ${grados} grados es: ${tangente}`);
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 10
                break;
            // Se inicia el caso 11 para calcular la cotangente
            case 11:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);
                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula la tangente primero ya que cotangente = 1/tangente
                        const tangente=Math.tan(radianes);
                        
                        // Se verifica si la tangente es 0 para evitar división por cero (cotangente indefinida)
                        if (tangente === 0) {
                            // Se muestra mensaje indicando que la cotangente es indefinida
                            console.log(`La cotangente de ${grados} grados es indefinida`);
                        }else {
                            // Se calcula la cotangente como 1/tangente si es válida
                            const cotangente=1/tangente;
                            // Se muestra el resultado de la cotangente del ángulo
                            console.log(`La cotangente de ${grados} grados es: ${cotangente}`);
                        }
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 11
                break;
            // Se inicia el caso 12 para calcular la secante
            case 12:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);

                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula el coseno primero ya que secante = 1/coseno
                        const coseno=Math.cos(radianes);
                        // Se verifica si el coseno es 0 para evitar división por cero (secante indefinida)
                        if (coseno === 0) {
                            // Se muestra mensaje indicando que la secante es indefinida
                            console.log(`La secante de ${grados} grados es indefinida`);
                        }else {
                            // Se calcula la secante como 1/coseno si es válida
                            const secante=1/coseno;
                            // Se muestra el resultado de la secante del ángulo
                            console.log(`La secante de ${grados} grados es: ${secante}`);
                        }  
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 12
                break;
            // Se inicia el caso 13 para calcular la cosecante
            case 13:
                // Se solicita al usuario que ingrese el ángulo en grados
                opciones.question("\nIngrese el angulo en grados: ",(valor )=>{
                    // Se convierte la entrada a número y se almacena en grados
                    const grados=Number(valor);

                    // Se valida que el valor del ángulo ingresado sea válido
                    if(isNaN(grados)){
                        // Se muestra mensaje de error si no es válido
                        console.log("\nEl valor ingresado no es valido");
                        // Se retorna al menú principal
                        return menu();
                    }else {
                        // Se convierte los grados a radianes usando la fórmula (grados * Math.PI) / 180
                        const radianes=(grados * Math.PI) / 180;
                        // Se calcula el seno primero ya que cosecante = 1/seno
                        const seno=Math.sin(radianes);

                        // Se verifica si el seno es 0 para evitar división por cero (cosecante indefinida)
                        if (seno === 0) {
                            // Se muestra mensaje indicando que la cosecante es indefinida
                            console.log(`La cosecante de ${grados} grados es indefinida`);
                        }else {
                            // Se calcula la cosecante como 1/seno si es válida
                            const cosecante=1/seno;
                            // Se muestra el resultado de la cosecante del ángulo
                            console.log(`La cosecante de ${grados} grados es: ${cosecante}`);
                        }
                        // Se retorna al menú principal
                        return menu();
                    }
                })
                // Se agrega el break para finalizar el caso 13
                break;
            // Se implementa el caso 14 para salir de la aplicación
            case 14:
                // Se muestra un mensaje de despedida
                console.log("\nSaliendo de la calculadora ...");
                // Se cierra la interfaz de readline para terminar el programa
                opciones.close();
                // Se retorna para terminar la función
                return;
            // Se implementa el caso default para opciones inválidas
            default:
                // Se muestra un mensaje de error para opciones no válidas
                console.log("\nLa opcion ingresada no es valida");
                // Se retorna al menú principal
                return menu();
        }
    });
};

// Se agrega un comentario para indicar el inicio del programa
// Inicia el menú
// Se llama a la función menu() para iniciar la calculadora
menu();