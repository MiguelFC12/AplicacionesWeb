document.addEventListener('DOMContentLoaded', () => {
    const sendRecoveryBtn = document.getElementById('sendRecoveryBtn');
    const recoveryEmailInput = document.getElementById('recoveryEmail');
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

    if (sendRecoveryBtn) {
        sendRecoveryBtn.addEventListener('click', (event) => { 
            event.preventDefault(); 
            
            messageDiv.style.display = 'none';
            messageDiv.classList.remove('success', 'error');
            recoveryEmailInput.classList.remove('input-error'); 

            const emailToRecover = recoveryEmailInput.value.trim(); 

            // Validaciones 
            if (!emailToRecover) {
                recoveryEmailInput.classList.add('input-error'); 
                showMessage('Por favor, ingresa tu correo electrónico para la recuperación.', 'error');
                return;
            }

            const uleamDomain = '@uleam.edu.ec';
            if (!emailToRecover.endsWith(uleamDomain)) {
                recoveryEmailInput.classList.add('input-error'); 
                showMessage(`El correo electrónico debe ser institucional (${uleamDomain}).`, 'error');
                return; 
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToRecover)) {
                recoveryEmailInput.classList.add('input-error');
                showMessage('Por favor, ingresa un formato de correo electrónico válido.', 'error');
                return;
            }
            showMessage('Hemos procesado tu solicitud. Verifica tu email para continuar.', 'success');
        });
    }

    recoveryEmailInput.addEventListener('input', () => {
        messageDiv.style.display = 'none';
        messageDiv.classList.remove('success', 'error');
        recoveryEmailInput.classList.remove('input-error'); 
    });
});