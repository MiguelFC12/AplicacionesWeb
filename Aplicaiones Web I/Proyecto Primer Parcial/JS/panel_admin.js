// --- Datos de Simulación ---
let cursos = [
    {
        id: 'c1',
        nombre: 'Introducción a la Programación con Python',
        duracion: '40 horas',
        fechaFin: '2025-07-15',
        participantes: [
            { id: 'p1', nombre: 'Juan Pérez', cedula: '1710123456', elegible: true },
            { id: 'p2', nombre: 'María García', cedula: '0987654321', elegible: true },
            { id: 'p3', nombre: 'Carlos López', cedula: '0501234567', elegible: false },
            { id: 'p4', nombre: 'Ana Martínez', cedula: '1309876543', elegible: true }
        ]
    },
    {
        id: 'c2',
        nombre: 'Diseño Gráfico Avanzado con Figma',
        duracion: '60 horas',
        fechaFin: '2025-08-01',
        participantes: [
            { id: 'p5', nombre: 'Sofía Rodríguez', cedula: '1001234567', elegible: true },
            { id: 'p6', nombre: 'Pedro Sánchez', cedula: '1809876543', elegible: true }
        ]
    },
    {
        id: 'c3',
        nombre: 'Marketing Digital Estratégico',
        duracion: '30 horas',
        fechaFin: '2025-06-20',
        participantes: [
            { id: 'p7', nombre: 'Laura González', cedula: '0601234567', elegible: true },
            { id: 'p8', nombre: 'David Fernández', cedula: '1109876543', elegible: true },
            { id: 'p9', nombre: 'Elena Díaz', cedula: '0701234567', elegible: true }
        ]
    }
];

let anuncios = [
    { id: 'a1', title: '¡Bienvenida a la Plataforma!', content: 'Explora todas las nuevas funcionalidades y cursos disponibles.', date: '2025-05-28' },
    { id: 'a2', title: 'Mantenimiento Programado', content: 'El sistema estará inactivo el 01/07 de 2 AM a 4 AM por mejoras.', date: '2025-05-30' }
];

// Array para certificados emitidos simulados
let certificadosEmitidos = [
    { id: 'cert001', courseName: 'Introducción a la Programación con Python', participantName: 'Juan Pérez', issueDate: '2025-07-20' },
    { id: 'cert002', courseName: 'Diseño Gráfico Avanzado con Figma', participantName: 'Sofía Rodríguez', issueDate: '2025-08-05' }
];

// --- Elementos del DOM ---
const anuncioContent = document.getElementById('anuncioContent');
const cursoListDiv = document.getElementById('cursoList');
const cursoDetailsDiv = document.getElementById('cursoDetails');
const participantesTableBody = document.getElementById('participantesTableBody');

const capacitacionesTableBody = document.getElementById('capacitacionesTableBody');
const newCapacitacionName = document.getElementById('newCapacitacionName');
const newCapacitacionDuration = document.getElementById('newCapacitacionDuration');
const newCapacitacionDate = document.getElementById('newCapacitacionDate');

const anunciosTableBody = document.getElementById('anunciosTableBody');
const newAnuncioTitle = document.getElementById('newAnuncioTitle');
const newAnuncioContent = document.getElementById('newAnuncioContent');

// Elementos para la gestión de certificados emitidos
const certificadosTableBody = document.getElementById('certificadosTableBody');
const certificadoCourseName = document.getElementById('certificadoCourseName');
const certificadoParticipantName = document.getElementById('certificadoParticipantName');
const certificadoIssueDate = document.getElementById('certificadoIssueDate');
const editCertificadoId = document.getElementById('editCertificadoId');
const certSaveButton = document.getElementById('certSaveButton');
const certCancelButton = document.getElementById('certCancelButton');


let selectedCourseId = null;
let nextAnuncioId = anuncios.length + 1; // For new announcements
let nextCertificadoId = certificadosEmitidos.length + 1; // For new certificates

// --- Funciones Globales de Navegación ---
function showSection(sectionId, clickedElement) {
    document.querySelectorAll('[id^="section-"]').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`section-${sectionId}`).style.display = 'block';

    document.querySelectorAll('.sidebar ul li a').forEach(item => {
        item.classList.remove('active');
    });
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    // Ensure details section is hidden if moving away from certificates
    if (sectionId !== 'certificados') {
        document.getElementById('cursoDetails').style.display = 'none';
        selectedCourseId = null;
        const currentSelectedCard = document.querySelector('.card.selected');
        if (currentSelectedCard) currentSelectedCard.classList.remove('selected');
    }
}

// --- Funciones Específicas de Certificados (Generación y Selección de Curso) ---

function loadCursoCards() {
    cursoListDiv.innerHTML = '';
    cursos.forEach(curso => {
        const card = document.createElement('div');
        card.classList.add('card'); // Using general 'card' class
        card.setAttribute('data-id', curso.id);
        card.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p><strong>Duración:</strong> ${curso.duracion}</p>
            <p><strong>Fecha de Finalización:</strong> ${curso.fechaFin}</p>
            <p class="info-status">Participantes elegibles: <strong>${curso.participantes.filter(p => p.elegible).length}</strong></p>
        `;
        card.onclick = () => selectCurso(curso.id);
        cursoListDiv.appendChild(card);
    });
}

function selectCurso(id) {
    const currentSelected = document.querySelector('.card.selected');
    if (currentSelected) currentSelected.classList.remove('selected');

    selectedCourseId = id;
    const selectedCurso = cursos.find(c => c.id === id);

    if (selectedCurso) {
        document.querySelector(`.card[data-id="${id}"]`).classList.add('selected');

        document.getElementById('selectedCursoTitle').innerHTML = `<i class="fas fa-info-circle"></i> Detalles del Curso: ${selectedCurso.nombre}`;
        document.getElementById('selectedCursoDuration').textContent = selectedCurso.duracion;
        document.getElementById('selectedCursoDate').textContent = selectedCurso.fechaFin;

        participantesTableBody.innerHTML = '';
        selectedCurso.participantes.forEach(p => {
            const row = document.createElement('tr');
            const statusClass = p.elegible ? 'status-eligible' : 'status-not-eligible';
            const statusText = p.elegible ? '✅ Elegible' : '❌ No Elegible';
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.cedula}</td>
                <td class="${statusClass}">${statusText}</td>
            `;
            participantesTableBody.appendChild(row);
        });

        cursoDetailsDiv.style.display = 'block';
        cursoDetailsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        cursoDetailsDiv.style.display = 'none';
    }
}

function generarCertificados() {
    if (!selectedCourseId) {
        alert('Por favor, selecciona un curso primero.');
        return;
    }

    const curso = cursos.find(c => c.id === selectedCourseId);
    if (!curso) return;

    const elegibleParticipants = curso.participantes.filter(p => p.elegible);

    if (elegibleParticipants.length === 0) {
        alert(`No hay participantes elegibles para emitir certificados en el curso "${curso.nombre}".`);
        return;
    }

    let generatedCount = 0;
    elegibleParticipants.forEach(p => {
        // Para esta simulación, vamos a añadirlo a nuestra lista de certificados emitidos
        // si no existe ya para este curso y participante.
        const existingCert = certificadosEmitidos.find(
            c => c.courseName === curso.nombre && c.participantName === p.nombre
        );

        if (!existingCert) {
            const newCertId = 'cert' + String(nextCertificadoId++).padStart(3, '0');
            certificadosEmitidos.push({
                id: newCertId,
                courseName: curso.nombre,
                participantName: p.nombre,
                issueDate: new Date().toISOString().slice(0, 10) // Fecha actual
            });
            generatedCount++;
        }
    });

    if (generatedCount > 0) {
        alert(`¡Éxito! Se ha simulado la generación de ${generatedCount} certificados para el curso "${curso.nombre}".`);
        loadCertificadosTable(); // Actualizar la tabla de certificados emitidos
    } else {
        alert(`No se generaron nuevos certificados para el curso "${curso.nombre}" ya que todos los elegibles ya los tienen.`);
    }
}


// --- Funciones de Anuncios (Global Bar) ---
// Se simplifica para mostrar solo un mensaje general sin referencia a vista de estudiante
function updateGlobalAnuncios(message) {
    anuncioContent.innerHTML = message;
}

function clearAnuncios() {
    anuncioContent.innerHTML = 'No hay anuncios nuevos por el momento.';
}

// --- Funciones de Gestión de Capacitaciones ---
function loadCapacitacionesTable() {
    capacitacionesTableBody.innerHTML = '';
    cursos.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.duracion}</td>
            <td>${curso.fechaFin}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCapacitacion('${curso.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteCapacitacion('${curso.id}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        capacitacionesTableBody.appendChild(row);
    });
}

function addCapacitacion() {
    const name = newCapacitacionName.value.trim();
    const duration = newCapacitacionDuration.value.trim();
    const date = newCapacitacionDate.value.trim();

    if (name && duration && date) {
        const newId = 'c' + (cursos.length + 1);
        cursos.push({
            id: newId,
            nombre: name,
            duracion: duration,
            fechaFin: date,
            participantes: []
        });
        alert('Capacitación "' + name + '" agregada.');
        newCapacitacionName.value = '';
        newCapacitacionDuration.value = '';
        newCapacitacionDate.value = '';
        loadCapacitacionesTable();
        loadCursoCards(); // Update certificates section
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function editCapacitacion(id) {
    alert('Editar Capacitación (ID: ' + id + ')');
}

function deleteCapacitacion(id) {
    if (confirm('¿Eliminar esta capacitación?')) {
        cursos = cursos.filter(c => c.id !== id);
        alert('Capacitación eliminada.');
        loadCapacitacionesTable();
        loadCursoCards(); // Update certificates section
    }
}

// --- Funciones de Gestión de Anuncios ---
function loadAnunciosTable() {
    anunciosTableBody.innerHTML = '';
    anuncios.forEach(anuncio => {
        const row = document.createElement('tr');
        const contentExtract = anuncio.content.length > 50 ? anuncio.content.substring(0, 50) + '...' : anuncio.content;
        row.innerHTML = `
            <td>${anuncio.id}</td>
            <td>${anuncio.title}</td>
            <td>${contentExtract}</td>
            <td>${anuncio.date}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editAnuncio('${anuncio.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteAnuncio('${anuncio.id}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        anunciosTableBody.appendChild(row);
    });
}

function addAnuncio() {
    const title = newAnuncioTitle.value.trim();
    const content = newAnuncioContent.value.trim();
    const date = new Date().toISOString().slice(0, 10);

    if (title && content) {
        const newId = 'a' + nextAnuncioId++;
        anuncios.push({
            id: newId,
            title: title,
            content: content,
            date: date
        });
        alert('Anuncio "' + title + '" publicado.');
        newAnuncioTitle.value = '';
        newAnuncioContent.value = '';
        loadAnunciosTable();
    } else {
        alert('Por favor, completa el título y el contenido del anuncio.');
    }
}

function editAnuncio(id) {
    alert('Editar Anuncio (ID: ' + id + ')');
}

function deleteAnuncio(id) {
    if (confirm('¿Eliminar este anuncio?')) {
        anuncios = anuncios.filter(a => a.id !== id);
        alert('Anuncio eliminado.');
        loadAnunciosTable();
    }
}

// --- Funciones de Gestión de Certificados Emitidos ---
function loadCertificadosTable() {
    certificadosTableBody.innerHTML = '';
    certificadosEmitidos.forEach(cert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cert.id}</td>
            <td>${cert.courseName}</td>
            <td>${cert.participantName}</td>
            <td>${cert.issueDate}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editCertificado('${cert.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteCertificado('${cert.id}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        certificadosTableBody.appendChild(row);
    });
}

function addOrUpdateCertificado() {
    const course = certificadoCourseName.value.trim();
    const participant = certificadoParticipantName.value.trim();
    const date = certificadoIssueDate.value.trim();
    const id = editCertificadoId.value;

    if (course && participant && date) {
        if (id) {
            // Edit existing certificate
            const index = certificadosEmitidos.findIndex(cert => cert.id === id);
            if (index !== -1) {
                certificadosEmitidos[index] = { id, courseName: course, participantName: participant, issueDate: date };
                alert('Certificado actualizado.');
            }
        } else {
            // Add new certificate
            const newId = 'cert' + String(nextCertificadoId++).padStart(3, '0');
            certificadosEmitidos.push({ id: newId, courseName: course, participantName: participant, issueDate: date });
            alert('Certificado "' + course + ' - ' + participant + '" agregado.');
        }

        // Clear form
        certificadoCourseName.value = '';
        certificadoParticipantName.value = '';
        certificadoIssueDate.value = '';
        editCertificadoId.value = '';
        certSaveButton.innerHTML = '<i class="fas fa-plus-circle"></i> Añadir Certificado';
        certSaveButton.style.backgroundColor = 'var(--secondary-color)';
        certCancelButton.style.display = 'none';

        loadCertificadosTable();
    } else {
        alert('Por favor, completa todos los campos para el certificado.');
    }
}

function editCertificado(id) {
    const cert = certificadosEmitidos.find(c => c.id === id);
    if (cert) {
        certificadoCourseName.value = cert.courseName;
        certificadoParticipantName.value = cert.participantName;
        certificadoIssueDate.value = cert.issueDate;
        editCertificadoId.value = cert.id;

        certSaveButton.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';
        certSaveButton.style.backgroundColor = '#ffc107'; // Yellow for edit
        certCancelButton.style.display = 'inline-block';
        certificadoCourseName.focus(); // Set focus to the first field
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top if needed
    }
}

function cancelEditCertificado() {
    certificadoCourseName.value = '';
    certificadoParticipantName.value = '';
    certificadoIssueDate.value = '';
    editCertificadoId.value = '';
    certSaveButton.innerHTML = '<i class="fas fa-plus-circle"></i> Añadir Certificado';
    certSaveButton.style.backgroundColor = 'var(--secondary-color)';
    certCancelButton.style.display = 'none';
}

function deleteCertificado(id) {
    if (confirm('¿Eliminar este certificado?')) {
        certificadosEmitidos = certificadosEmitidos.filter(cert => cert.id !== id);
        alert('Certificado eliminado.');
        loadCertificadosTable();
        cancelEditCertificado(); // Clear form if the deleted one was being edited
    }
}


// --- Funciones de Perfil ---
function saveProfile() {
    alert('Perfil actualizado.');
    // In a real app, send data to backend
}

function changePassword() {
    const oldPass = document.getElementById('oldPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;

    if (oldPass && newPass && confirmPass && newPass === confirmPass) {
        alert('Contraseña cambiada con éxito.');
        // In a real app, update password in backend
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    } else {
        alert('Error al cambiar contraseña. Asegúrate de que las contraseñas coincidan y no estén vacías.');
    }
}

// --- Funciones de Configuración ---
function saveSettings() {
    alert('Ajustes guardados.');
    // In a real app, send data to backend
}
// Edit/Delete for User Management table are placeholders
document.querySelectorAll('.action-buttons button').forEach(button => {
    // Prevent re-attaching if already attached from previous runs or other scripts
    if (!button.hasAttribute('data-listener-added')) {
        button.setAttribute('data-listener-added', 'true');
        button.onclick = function() {
            const action = this.classList.contains('edit') ? 'Editar' : 'Eliminar';
            const userId = this.closest('tr').querySelector('td').textContent;
            alert(`${action} usuario (ID: ${userId}) - Funcionalidad simulada.`);
        };
    }
});

// Select the button for adding new users within the configuration section
const addUserButton = document.querySelector('#section-configuracion button[style*="margin-top"]'); // Select the button with the margin-top style

if (addUserButton) {
    addUserButton.onclick = function() {
        alert('Añadir nuevo usuario - Funcionalidad simulada.');
    };
}

// Select the "Guardar Ajustes" button within the configuration's form-section
const saveSettingsButton = document.querySelector('#section-configuracion .form-section button');
if (saveSettingsButton) {
    saveSettingsButton.onclick = saveSettings;
}


// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    loadCursoCards();
    loadCapacitacionesTable();
    loadAnunciosTable();
    loadCertificadosTable(); // Cargar la tabla de certificados emitidos

    // Set initial view to Certificados
    showSection('certificados', document.getElementById('nav-certificados'));
});