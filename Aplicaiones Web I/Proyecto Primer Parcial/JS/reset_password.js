document.addEventListener('DOMContentLoaded', () => {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const messageDiv = document.getElementById('message');

    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`; 
            messageDiv.style.display = 'block';

            setTimeout(() => {
                messageDiv.style.display = 'none';
                messageDiv.classList.remove('success', 'error'); 
            }, 5000);
        } else {
            alert(message);
        }
    }

    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', (event) => {
            event.preventDefault(); 

            messageDiv.style.display = 'none';
            messageDiv.classList.remove('success', 'error');
            newPasswordInput.classList.remove('input-error');
            confirmPasswordInput.classList.remove('input-error');

            let isValid = true;
            let errorMessage = '';

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const addError = (inputElement, msg) => {
                isValid = false;
                errorMessage += msg + '<br>'; 
                inputElement.classList.add('input-error');
            };

            // Validaciones
            if (newPassword === '') {
                addError(newPasswordInput, 'La nueva contraseña no puede estar vacía.');
            } else if (newPassword.length < 6) { 
                addError(newPasswordInput, 'La nueva contraseña debe tener al menos 6 caracteres.');
            }

            if (confirmPassword === '') {
                addError(confirmPasswordInput, 'Por favor, confirma tu nueva contraseña.');
            }

            if (newPassword !== '' && confirmPassword !== '' && newPassword !== confirmPassword) {
                addError(confirmPasswordInput, 'Las contraseñas no coinciden.');
            }

            if (!isValid) {
                messageDiv.innerHTML = errorMessage;
                messageDiv.classList.add('error');
                messageDiv.style.display = 'block';
            } else {
                showMessage('Tu contraseña ha sido restablecida exitosamente.', 'success');
            }
        });
    }

    newPasswordInput.addEventListener('input', () => {
        messageDiv.style.display = 'none';
        messageDiv.classList.remove('success', 'error');
        newPasswordInput.classList.remove('input-error');
        confirmPasswordInput.classList.remove('input-error'); 
    });

    confirmPasswordInput.addEventListener('input', () => {
        messageDiv.style.display = 'none';
        messageDiv.classList.remove('success', 'error');
        newPasswordInput.classList.remove('input-error'); 
        confirmPasswordInput.classList.remove('input-error');
    });
});