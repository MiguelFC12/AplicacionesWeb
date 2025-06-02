document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message'); 

    if (registerForm) {
        const nombresInput = document.getElementById('nombres');
        const cedulaInput = document.getElementById('cedula');
        const correoInput = document.getElementById('correo');
        const telefonoInput = document.getElementById('telefono');
        const contrasenaInput = document.getElementById('contrasena');
        const confirmarContrasenaInput = document.getElementById('confirmar_contrasena');
        const areaSelect = document.getElementById('area');

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            messageDiv.textContent = '';
            messageDiv.style.display = 'none';
            messageDiv.classList.remove('success', 'error');

            nombresInput.classList.remove('input-error');
            cedulaInput.classList.remove('input-error');
            correoInput.classList.remove('input-error');
            telefonoInput.classList.remove('input-error');
            contrasenaInput.classList.remove('input-error');
            confirmarContrasenaInput.classList.remove('input-error');
            areaSelect.classList.remove('input-error');

            let isValid = true; 
            let errorMessage = '';

            const addError = (inputElement, msg) => {
                isValid = false;
                errorMessage += msg + '<br>';
                inputElement.classList.add('input-error');
            };

            const nombres = nombresInput.value.trim();
            const cedula = cedulaInput.value.trim();
            const correo = correoInput.value.trim();
            const telefono = telefonoInput.value.trim();
            const contrasena = contrasenaInput.value; 
            const confirmar_contrasena = confirmarContrasenaInput.value;
            const area_trabajo = areaSelect.value;

            // Validaciones 
            if (nombres === '') {
                addError(nombresInput, 'Los nombres no pueden estar vacíos.');
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombres)) {
                addError(nombresInput, 'Los nombres solo pueden contener letras y espacios.');
            }

            if (cedula === '') {
                addError(cedulaInput, 'La cédula no puede estar vacía.');
            } else if (!/^\d{10}$/.test(cedula)) {
                addError(cedulaInput, 'La cédula debe contener exactamente 10 dígitos numéricos.');
            }

            if (correo === '') {
                addError(correoInput, 'El correo no puede estar vacío.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { 
                 addError(correoInput, 'El formato del correo electrónico no es válido.');
            } else if (!correo.endsWith('@uleam.edu.ec')) {
                addError(correoInput, 'El correo electrónico debe ser institucional (@uleam.edu.ec).');
            }

            if (telefono === '') {
                addError(telefonoInput, 'El teléfono no puede estar vacío.');
            } else if (!/^\d{10}$/.test(telefono)) {
                addError(telefonoInput, 'El teléfono debe contener exactamente 10 dígitos numéricos.');
            }

            if (contrasena === '') {
                addError(contrasenaInput, 'La contraseña no puede estar vacía.');
            } else if (contrasena.length < 6) {
                addError(contrasenaInput, 'La contraseña debe tener al menos 6 caracteres.');
            }

            if (confirmar_contrasena === '') {
                addError(confirmarContrasenaInput, 'Por favor, confirma tu contraseña.');
            } else if (contrasena !== confirmar_contrasena) {
                addError(confirmarContrasenaInput, 'Las contraseñas no coinciden.');
            }

            if (area_trabajo === "" || area_trabajo === "Selecciona una opción") { 
                addError(areaSelect, 'Por favor, selecciona tu área de trabajo.');
            }

            if (!isValid) {
                messageDiv.innerHTML = errorMessage;
                messageDiv.classList.add('error');
                messageDiv.style.display = 'block';
            } else {
                showMessage('Registro exitoso. ¡Bienvenido!', 'success');
            }
        });
    }
    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.innerHTML = message; 
            messageDiv.className = `message ${type}`; 
            messageDiv.style.display = 'block'; 
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000); 
        } else {
            alert(message); 
        }
    }
});