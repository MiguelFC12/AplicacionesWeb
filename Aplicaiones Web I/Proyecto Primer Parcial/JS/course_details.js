document.addEventListener('DOMContentLoaded', () => {
    const courseTitleElem = document.getElementById('courseTitle');
    const courseDescriptionElem = document.getElementById('courseDescription');
    const courseDateElem = document.getElementById('courseDate');
    const courseDurationElem = document.getElementById('courseDuration');
    const courseModalityElem = document.getElementById('courseModality');
    const courseTypeElem = document.getElementById('courseType');
    const courseInstructorElem = document.getElementById('courseInstructor');
    const courseLocationElem = document.getElementById('courseLocation');
    const courseScheduleElem = document.getElementById('courseSchedule');
    const courseSyllabusElem = document.getElementById('courseSyllabus');

    const locationDetailsSection = document.querySelector('.location-details');
    const scheduleDetailsSection = document.querySelector('.schedule-details');
    const virtualActivitiesSection = document.querySelector('.virtual-activities-section');
    const virtualVideosSection = document.querySelector('.virtual-videos-section');
    const videoGallery = document.getElementById('videoGallery');
    const syllabusSection = document.getElementById('syllabusSection');

    const course = {
        title: 'Curso de Seguridad Informática',
        description: 'Este curso te sumergirá en los fundamentos de la seguridad informática, proporcionándote las herramientas y el conocimiento para proteger tu información personal y profesional en el ciberespacio. Se abordarán temas como la identificación de amenazas, la creación de contraseñas robustas, el uso seguro de redes, la prevención de phishing y la importancia de las actualizaciones de software.',
        date: '3 de Junio, 2025',
        duration: '40 horas',
        modality: 'Virtual', 
        type: 'Inscrito', 
        instructor: 'Ing. Ana Gómez',
        location: 'Plataforma Virtual ULEAM', 
        schedule: null, 
        syllabus: [
            'Introducción a la ciberseguridad y amenazas comunes.',
            'Gestión de contraseñas y autenticación de doble factor.',
            'Navegación segura y reconocimiento de sitios web maliciosos.',
            'Protección contra phishing y ataques de ingeniería social.',
            'Seguridad en redes Wi-Fi públicas y privadas.',
            'Actualizaciones de software y antivirus.'
        ],
        activities: [
            'Foro de discusión: Amenazas actuales y cómo identificarlas.',
            'Cuestionario interactivo: Evaluando tu seguridad en línea.',
            'Caso práctico: Análisis de un correo de phishing.',
            'Proyecto final: Creación de un plan de seguridad personal.'
        ],
        videos: [
            { title: 'Introducción a la Ciberseguridad', url: 'https://www.youtube.com/embed/YOUR_THIRD_VIDEO_ID' }, // Ejemplo real: Rick Astley
            { title: 'Cómo crear contraseñas seguras', url: 'https://www.youtube.com/embed/YOUR_THIRD_VIDEO_ID' }, // Otro ejemplo
            { title: 'Evitando el Phishing', url: 'https://www.youtube.com/embed/YOUR_THIRD_VIDEO_ID' }
        ]
    };

    courseTitleElem.textContent = course.title;
    courseDescriptionElem.textContent = course.description;
    courseDateElem.textContent = course.date;
    courseDurationElem.textContent = course.duration;
    courseModalityElem.textContent = course.modality;
    courseInstructorElem.textContent = course.instructor;
    
    courseTypeElem.textContent = course.type;
    courseTypeElem.className = `type-tag ${course.type.toLowerCase()}-tag`; 
    
    courseSyllabusElem.innerHTML = '';
    if (course.syllabus && course.syllabus.length > 0) {
        course.syllabus.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${item}`;
            courseSyllabusElem.appendChild(li);
        });
    } else {
        syllabusSection.style.display = 'none'; 
    }

    if (course.modality === 'Presencial') {
        locationDetailsSection.style.display = 'flex'; 
        courseLocationElem.textContent = course.location;

        if (course.schedule) {
            scheduleDetailsSection.style.display = 'flex'; 
            courseScheduleElem.textContent = course.schedule;
        } else {
            scheduleDetailsSection.style.display = 'none';
        }

        virtualActivitiesSection.style.display = 'none';
        virtualVideosSection.style.display = 'none';

    } else if (course.modality === 'Virtual') {
        locationDetailsSection.style.display = 'none';
        scheduleDetailsSection.style.display = 'none';

        if (course.activities && course.activities.length > 0) {
            virtualActivitiesSection.style.display = 'block';
            const virtualActivitiesList = document.getElementById('virtualActivities');
            virtualActivitiesList.innerHTML = ''; 
            course.activities.forEach(activity => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-laptop-code"></i> ${activity}`;
                virtualActivitiesList.appendChild(li);
            });
        } else {
            virtualActivitiesSection.style.display = 'none';
        }

        if (course.videos && course.videos.length > 0) {
            virtualVideosSection.style.display = 'block';
            videoGallery.innerHTML = ''; 
            course.videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');
                videoItem.innerHTML = `
                    <iframe src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>${video.title}</p>
                `;
                videoGallery.appendChild(videoItem);
            });
        } else {
            virtualVideosSection.style.display = 'none';
        }
    }
});