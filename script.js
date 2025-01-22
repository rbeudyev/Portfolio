// Gestion du thème
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Configuration des animations au scroll
document.addEventListener('DOMContentLoaded', () => {
    // Configuration de ScrollReveal
    const sr = ScrollReveal({
        distance: '50px',
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        interval: 100,
        opacity: 0,
        origin: 'bottom',
        reset: false
    });

    // Animations au scroll
    sr.reveal('.service-card', {
        interval: 200
    });

    sr.reveal('.competence-card', {
        interval: 200,
        afterReveal: (el) => {
            // Animation de la barre de progression
            const progress = el.querySelector('.progress');
            if (progress) {
                const width = progress.getAttribute('data-width');
                setTimeout(() => {
                    progress.style.width = width;
                }, 300);
            }
        }
    });

    sr.reveal('#services h2, #competences h2', { 
        origin: 'left'
    });

    sr.reveal('.contact-info', { 
        origin: 'left'
    });

    sr.reveal('.contact-form', { 
        origin: 'right'
    });
});

// Gestion du formulaire
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message envoyé !');
});

// Gestion du menu burger
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('nav ul');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fermer le menu quand on clique en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Effet de scroll sur la navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation des liens du menu mobile
document.querySelectorAll('nav a').forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.1}s`;
});

// Gestion des liens actifs dans la navbar
const navLinks = document.querySelectorAll('nav a');

function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink); 