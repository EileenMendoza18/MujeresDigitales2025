const Cantidad=require("readline").createInterface({ // libreria readline para leer datos ingresados 
    input:process.stdin, // entrada de datos
    output:process.stdout // salida de datos
});

Cantidad.question("Ingrese cuántas tablas de multiplicar quiere ver: ", (valor) => {
    const cantidad = Number(valor);

    Cantidad.question(`Ingrese las ${cantidad} tablas que desea ver separadas por espacio: `, (entrada) => {
        let partes = entrada.split(" ").map(Number); // dividir la entrada en números
        let NumeroTabla = [];

        // usar un for para guardar en la lista
        for (let i = 0; i < cantidad; i++) {
            NumeroTabla.push(partes[i]);
        }

        // usar un while para imprimir cada tabla
        let indice = 0;
        while (indice < NumeroTabla.length) {
            let i = 1;
            console.log(`\n--- Tabla del ${NumeroTabla[indice]} ---`);
            while (i <= 10) {
                console.log(`${NumeroTabla[indice]} x ${i} = ${NumeroTabla[indice] * i}`);
                i++;
            }
            indice++;
        }

        Cantidad.close();
    });
});
