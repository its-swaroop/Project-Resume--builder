document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            generateResume();
        });
    }

    loadResumeData();
});

function generateResume() {
    let resumeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        summary: document.getElementById("summary").value,
        skills: document.getElementById("skills").value.split(","),
        experience: document.getElementById("experience").value,
        education: document.getElementById("education").value
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    window.location.href = "resume.html";
}

function loadResumeData() {
    let resumeData = JSON.parse(localStorage.getItem("resumeData"));

    if (resumeData && document.getElementById("resume-name")) {
        document.getElementById("resume-name").innerText = resumeData.name;
        document.getElementById("resume-email").innerText = resumeData.email;
        document.getElementById("resume-phone").innerText = resumeData.phone;
        document.getElementById("resume-summary").innerText = resumeData.summary;
        
        let skillsList = document.getElementById("resume-skills");
        skillsList.innerHTML = "";
        resumeData.skills.forEach(skill => {
            let li = document.createElement("li");
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        });

        document.getElementById("resume-experience").innerText = resumeData.experience;
        document.getElementById("resume-education").innerText = resumeData.education;
    }

    if (document.getElementById("downloadPDF")) {
        document.getElementById("downloadPDF").addEventListener("click", () => {
            let resume = document.getElementById("resume");
            html2pdf().from(resume).save("Resume.pdf");
        });
    }
}
