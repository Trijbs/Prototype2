// Custom Cursor
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});
document.querySelectorAll('a, .skill-item, .contact-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Hamburger menu for mobile
const sidebar = document.querySelector('.sidebar');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') sidebar.classList.toggle('collapsed');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').length > 1) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Progress Bar Animation on Scroll
const skillsSection = document.querySelector('#skills');
const progressFills = document.querySelectorAll('.progress-fill');
let skillsAnimated = false;
function animateSkills() {
    if (!skillsAnimated && skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        progressFills.forEach(fill => {
            fill.style.width = fill.getAttribute('data-progress') + '%';
        });
        skillsAnimated = true;
    }
}
window.addEventListener('scroll', animateSkills);
animateSkills();

// Section fade-in on scroll
const sections = document.querySelectorAll('section');
function revealSections() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
revealSections();

// Light/Dark Mode Toggle
const themeBtn = document.getElementById('theme-toggle-btn');
themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> <span style="margin-left:6px;">Theme</span>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span style="margin-left:6px;">Theme</span>';
    }
});
// Respect system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span style="margin-left:6px;">Theme</span>';
}

// GitHub Contributions Score
fetch('https://api.github.com/users/trijbs')
    .then(response => response.json())
    .then(data => {
        const githubScore = data.public_repos + data.followers;
        document.getElementById('github-score').textContent = githubScore;
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error);
        document.getElementById('github-score').textContent = 'Failed to load';
    });