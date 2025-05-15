function calcular() {
    const num1Input = document.getElementById("num1");
    const num2Input = document.getElementById("num2");

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    if (num1Input.value === "" || num2Input.value === "") {
        document.getElementById("resultados").innerHTML = "Datos Imcompletos.";
        return;
    }

    let resultados = "";

    for (let i = 1; i <= 5; i++) {
        switch (i) {
            case 1:
                resultados += `1. Suma: ${num1 + num2}<br>`;
                break;
            case 2:
                resultados += `2. Resta: ${num1 - num2}<br>`;
                break;
            case 3:
                resultados += `3. Multiplicación: ${num1 * num2}<br>`;
                break;
            case 4:
                resultados += num2 !== 0
                    ? `4. División: ${num1 / num2}<br>`
                    : `4. División: Error<br>`;
                break;
            case 5:
                resultados += num2 !== 0
                    ? `5. Módulo: ${num1 % num2}<br>`
                    : `5. Módulo: Error<br>`;
                break;
        }
    }

    document.getElementById("resultados").innerHTML = resultados;
}
