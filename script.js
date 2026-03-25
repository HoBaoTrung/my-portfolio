// Modal elements
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// Project data
const projects = {
    social: {
        title: "Social Media Platform",
        shortDesc: "A full-stack social media application featuring rich realtime interactions and robust administration.",
        tech: "Spring Boot • Thymeleaf • Bootstrap 5 • Spring Security + OAuth2 • WebSocket + WebRTC • MySQL • Redis • Docker",
        features: [
            "Registration & Login (form + Google/Facebook)",
            "Friend system (add, remove, mutual friends)",
            "Realtime posts, likes, and comments",
            "Group chat + Video calling (WebRTC)",
            "Realtime notifications",
            "Admin dashboard (user management, blocking, statistics)"
        ],
        architectureItems: [
            "WebSocket implementation for all realtime features (likes, comments, notifications, chat)",
            "Docker Compose integration with init.sql and sample data",
            "Privacy settings and performance optimization using Spring Data JPA"
        ],
        github: "https://github.com/HoBaoTrung/team_social_media/tree/develop"
    },

    mobile: {
        title: "Mobile Store",
        shortDesc: "A complete mobile phone e-commerce web application with session-based shopping cart, AJAX product filtering, and multi-language support.",
        tech: "Spring MVC • Spring Security • Spring Data JPA • Thymeleaf • Hibernate • Bootstrap 5 • MySQL • jQuery + AJAX",
        features: [
            "Full CRUD for products with image upload",
            "AJAX-based product filtering and pagination",
            "Session-based shopping cart (add/update/remove in realtime)",
            "Form login + OAuth2 (Google & Facebook)",
            "User registration with BCrypt encryption",
            "Multi-language support (EN / VI / JA)"
        ],
        architectureItems: [
            "Built with MVC pattern and customized Spring Security for AJAX and file upload",
            "Using Specification for dynamic product filtering",
            "Internationalization (i18n) with message properties",
            "Session-based shopping cart with stock validation"
        ],
        github: "https://github.com/HoBaoTrung/mobile_store"
    }
};

// Open modal function
function openModal(projectKey) {
    const proj = projects[projectKey];
    if (!proj) return;

    document.getElementById('modalTitle').textContent = proj.title;
    document.getElementById('modalShortDesc').innerHTML = `<strong>${proj.shortDesc}</strong>`;
    document.getElementById('modalTech').textContent = proj.tech;
    document.getElementById('modalGitHubLink').href = proj.github;

    // Render Features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    proj.features.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        featuresList.appendChild(li);
    });

    // Render Architecture
    const archList = document.getElementById('modalArchitecture');
    archList.innerHTML = '';
    (proj.architectureItems || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        archList.appendChild(li);
    });

    modal.style.display = 'flex';
}

// Event listeners
closeBtn.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Connect all detail buttons
document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectKey = btn.getAttribute('data-project');
        if (projectKey) openModal(projectKey);
    });
});

// Smooth scroll + Active nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove active from all
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Add active to current
        this.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 200 && rect.bottom >= 200) {
            current = section.getAttribute('id');
        }
    });
    
    const lastSection = sections[sections.length - 1];
    const lastRect = lastSection.getBoundingClientRect();

    if (lastRect.top <= window.innerHeight) {
        current = lastSection.getAttribute('id');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});