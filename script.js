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

    // Animation de ScrollReveal
    const srAbout = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    // Animation du titre et de l'introduction
    srAbout.reveal('.about-content h2', {
        delay: 300,
        origin: 'top'
    });

    srAbout.reveal('.about-intro', {
        delay: 400,
        origin: 'bottom'
    });

    // Animation des cartes
    srAbout.reveal('.about-card', {
        delay: 500,
        interval: 200,
        origin: 'bottom'
    });

    // Animation pour la section BTS SIO
    const srBts = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    // Animation du titre de la section BTS
    srBts.reveal('.bts-presentation h2', {
        delay: 300,
        origin: 'left'
    });

    // Animation du paragraphe d'introduction
    srBts.reveal('.bts-presentation > p', {
        delay: 400,
        origin: 'right'
    });

    // Animation des cartes de spécialités
    srBts.reveal('.specialite', {
        delay: 500,
        interval: 200,
        origin: 'bottom'
    });

    // Animation des listes à puces dans les spécialités
    srBts.reveal('.specialite ul li', {
        delay: 600,
        interval: 100,
        origin: 'left'
    });

    // Animation pour la frise chronologique
    const srTimeline = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    srTimeline.reveal('#parcours-pro h2', {
        delay: 300
    });

    srTimeline.reveal('.timeline::before', {
        delay: 400,
        origin: 'top',
        distance: '100%'
    });

    srTimeline.reveal('.timeline-item', {
        interval: 300
    });

    srTimeline.reveal('.timeline-dot', {
        scale: 0.5,
        delay: 500,
        interval: 300
    });

});

// Gestion du formulaire
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message envoyé !');
});

// Gestion du menu burger
document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.querySelector('aside.sidebar');
  var toggle = document.querySelector('.burger-toggle');
  var overlay = document.querySelector('.sidebar-overlay');

  function openMenu() {
    if (!sidebar) return;
    sidebar.classList.add('is-open');
    document.body.classList.add('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.hidden = false;
  }

  function closeMenu() {
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.hidden = true;
  }

  function toggleMenu() {
    if (sidebar.classList.contains('is-open')) closeMenu(); else openMenu();
  }

  if (toggle) toggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking a nav link
  var navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(function (a) { a.addEventListener('click', closeMenu); });
});