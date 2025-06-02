document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cedulaInput = document.getElementById('cedula');
    const passwordInput = document.getElementById('contrasena'); 
    const messageDiv = document.getElementById('message'); 

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        messageDiv.textContent = '';
        messageDiv.style.display = 'none';
        messageDiv.classList.remove('success', 'error');

        cedulaInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');

        // Validación
        let isValid = true; 
        let errorMessage = ''; 

        const cedulaValue = cedulaInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (cedulaValue === '') {
            isValid = false;
            errorMessage += 'La cédula no puede estar vacía.<br>';
            cedulaInput.classList.add('input-error');
        } 
        else if (!/^\d{10}$/.test(cedulaValue)) {
            isValid = false;
            errorMessage += 'La cédula debe contener exactamente 10 dígitos numéricos.<br>';
            cedulaInput.classList.add('input-error');
        }

        if (passwordValue === '') {
            isValid = false;
            errorMessage += 'La contraseña no puede estar vacía.<br>';
            passwordInput.classList.add('input-error');
        } 
        else if (passwordValue.length < 6) {
            isValid = false;
            errorMessage += 'La contraseña debe tener al menos 6 caracteres.<br>';
            passwordInput.classList.add('input-error');
        }

        if (!isValid) {
            messageDiv.innerHTML = errorMessage; 
            messageDiv.classList.add('error');
            messageDiv.style.display = 'block';
        } else {
            messageDiv.textContent = '¡Validación exitosa! Datos correctos.';
            messageDiv.classList.add('success');
            messageDiv.style.display = 'block';
        }
    });
});