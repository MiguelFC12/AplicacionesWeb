document.addEventListener('DOMContentLoaded', () => {
    const downloadPdfButtons = document.querySelectorAll('.download-pdf-btn');

    downloadPdfButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const certificateId = button.dataset.certificateId; 
            alert(`Certificado Descargado: ${certificateId}`);
        });
    });
});