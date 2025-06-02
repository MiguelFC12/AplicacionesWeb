document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html'; 
        });
    }
});