document.getElementById("clienteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const cedula = document.getElementById("cedula").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !correo || !telefono || !direccion || !cedula || !fecha) {
        document.getElementById("resultado").innerHTML = "Complete todos los campos.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        document.getElementById("resultado").innerHTML = "Ingrese un correo electrónico válido.";
        return;
    }

    if (!/^\d{10}$/.test(telefono)) {
        document.getElementById("resultado").innerHTML = "Ingrese un número de teléfono válido.";
        return;
    }

    if (!/^\d{10}$/.test(cedula)) {
        document.getElementById("resultado").innerHTML = "La cédula debe tener 10 dígitos numéricos.";
        return;
    }

    const resultado = `
        <h3>Datos Ingresados:</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Cédula:</strong> ${cedula}</p>
        <p><strong>Fecha de nacimiento:</strong> ${fecha}</p>
    `;

    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("clienteForm").reset();
});
