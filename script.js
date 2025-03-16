// Preview uploaded photo
function previewPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const photoPreview = document.getElementById('photo-preview');
        photoPreview.src = reader.result;
        photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Add more Education fields
function addEducation() {
    const container = document.getElementById('education-container');
    const newField = document.createElement('textarea');
    newField.className = 'education';
    newField.placeholder = "Enter your education details";
    container.appendChild(newField);
}

// Add more Work Experience fields
function addWork() {
    const container = document.getElementById('work-container');
    const newField = document.createElement('textarea');
    newField.className = 'work';
    newField.placeholder = "Enter your work experience";
    container.appendChild(newField);
}

// Generate Resume preview
function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const education = [...document.getElementsByClassName('education')].map(e => e.value).join('<br>');
    const work = [...document.getElementsByClassName('work')].map(e => e.value).join('<br>');
    const photoSrc = document.getElementById('photo-preview').src;

    document.getElementById('resume-preview').innerHTML = `
        <h2>${name}</h2>
        <p>${email}</p>
        <img src="${photoSrc}" class="profile-pic" alt="Profile Picture">
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${work}</p>
    `;

    document.getElementById('download-pdf').style.display = 'block';
}

// Download Resume as PDF
function downloadResumePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const education = [...document.getElementsByClassName('education')].map(e => e.value).join('\n');
    const work = [...document.getElementsByClassName('work')].map(e => e.value).join('\n');
    const photoSrc = document.getElementById('photo-preview').src;

    doc.setFontSize(16);
    doc.text(name, 10, 20);
    doc.setFontSize(12);
    doc.text(email, 10, 30);
    doc.setFontSize(14);
    doc.text("Education", 10, 40);
    doc.setFontSize(12);
    doc.text(education, 10, 50);
    doc.setFontSize(14);
    doc.text("Work Experience", 10, 70);
    doc.setFontSize(12);
    doc.text(work, 10, 80);

    if (photoSrc && photoSrc.startsWith('data:image/')) {
        const img = new Image();
        img.src = photoSrc;
        img.onload = function () {
            doc.addImage(img, 'JPEG', 140, 10, 50, 50);
            doc.save('resume.pdf');
        };
    } else {
        doc.save('resume.pdf');
    }
}
