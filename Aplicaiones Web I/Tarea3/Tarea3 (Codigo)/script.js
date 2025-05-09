document.getElementById("clienteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const cedula = document.getElementById("cedula").value;
    const fecha = document.getElementById("fecha").value;

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
