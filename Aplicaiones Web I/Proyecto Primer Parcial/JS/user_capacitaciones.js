document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-button');
    const capacitacionCards = document.querySelectorAll('.capacitacion-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterType = button.dataset.filter;
            capacitacionCards.forEach(card => {
                const cardType = card.dataset.type; 

                if (filterType === 'all' || cardType === filterType) {
                    card.style.display = 'flex'; 
                } else {
                    card.style.display = 'none'; 
                }
            });
        });
    });

    const inscribirmeButtons = document.querySelectorAll('.action-button.inscribirme');

    inscribirmeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 

            const card = button.closest('.capacitacion-card');
            if (!card) return; 

            card.dataset.type = 'inscrito';

            card.classList.remove('obligatorio', 'opcional'); 
            card.classList.add('inscrito');

            const tag = card.querySelector('.card-tag');
            if (tag) {
                tag.classList.remove('obligatorio-tag', 'opcional-tag');
                tag.classList.add('inscrito-tag');
                tag.textContent = 'Inscrito';
            }

            button.textContent = 'Inscrito';
            button.classList.remove('inscribirme'); 
            button.classList.add('details');
            button.classList.add('disabled'); 
            button.disabled = true; 
            
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-user-plus');
                icon.classList.add('fa-check-circle'); 
            }

            alert('¡Te has inscrito exitosamente a la capacitación!'); 
        });
    });
});