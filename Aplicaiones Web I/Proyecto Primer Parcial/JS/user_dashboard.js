document.addEventListener('DOMContentLoaded', () => {
    const userProfileIcon = document.getElementById('userProfileIcon');
    const userDropdown = document.getElementById('userDropdown');

    if (userProfileIcon && userDropdown) {
        userProfileIcon.addEventListener('click', () => {
            userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!userProfileIcon.contains(event.target) && !userDropdown.contains(event.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    const novedadesContainer = document.getElementById('novedadesContainer');
    const noNovedadesPlaceholder = document.getElementById('noNovedadesPlaceholder');

    const sampleAnnouncements = [
        {
            title: "Nuevo Curso de Ciberseguridad",
            description: "¡Inscríbete en nuestro nuevo curso avanzado de ciberseguridad!",
            date: "15 de Mayo, 2025"
        },
        {
            title: "Taller de Manejo de Plataformas Virtuales",
            description: "Taller intensivo sobre las últimas funcionalidades de Moodle y Teams para la enseñanza.",
            date: "20 de Mayo, 2025"
        },
        {
            title: "Conferencia de Inteligencia Artificial",
            description: "No te pierdas la conferencia anual sobre los avances en IA y su aplicación en la educación.",
            date: "25 de Mayo, 2025"
        },

    ];

    const loadAnnouncements = () => {
        setTimeout(() => {
            novedadesContainer.innerHTML = '';

            if (sampleAnnouncements.length > 0) {
                if (noNovedadesPlaceholder) {
                    noNovedadesPlaceholder.style.display = 'none';
                }

                sampleAnnouncements.forEach(announcement => {
                    const card = document.createElement('div');
                    card.classList.add('novedad-card');
                    card.innerHTML = `
                        <h3>${announcement.title}</h3>
                        <p>${announcement.description}</p>
                        <span class="date">${announcement.date}</span>
                    `;
                    novedadesContainer.appendChild(card);
                });
            } else {
                if (noNovedadesPlaceholder) {
                    noNovedadesPlaceholder.style.display = 'flex'; 
                    noNovedadesPlaceholder.querySelector('p').textContent = 'No hay anuncios importantes por el momento.';
                }
            }
        }, 1500);
    };
    loadAnnouncements();
});