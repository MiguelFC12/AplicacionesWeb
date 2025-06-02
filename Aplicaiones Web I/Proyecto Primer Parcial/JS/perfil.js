document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('editProfileBtnBottom');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            alert('Aquí se abriría un formulario de edición.');
        });
    }
});