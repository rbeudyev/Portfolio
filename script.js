// ===== ANIMATIONS DE SCROLL ET D'APPARITION =====

// Configuration des animations
const animationConfig = {
    // Délai entre les animations d'éléments
    staggerDelay: 100,
    // Distance de déclenchement des animations
    triggerDistance: 100,
    // Durée des animations
    animationDuration: 600
};

// ===== OBSERVER POUR LES ANIMATIONS D'APPARITION =====
const observerOptions = {
    root: null,
    rootMargin: `-${animationConfig.triggerDistance}px`,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animation en cascade pour les éléments enfants
            const children = entry.target.querySelectorAll('.animate-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * animationConfig.staggerDelay);
            });
        }
    });
}, observerOptions);

// ===== NAVBAR ANIMATION =====
let lastScrollY = window.scrollY;
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Animation de la navbar
    if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Animation de disparition/apparition de la navbar
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// ===== ANIMATION DES SECTIONS =====
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Ajouter les classes d'animation
        section.classList.add('animate-section');
        
        // Observer chaque section
        observer.observe(section);
        
        // Ajouter les classes d'animation aux éléments enfants
        const animatedElements = section.querySelectorAll('h1, h2, p, .bts-card, .project-card, .veille-card, .timeline-item, .skill-icon-placeholder');
        animatedElements.forEach(element => {
            element.classList.add('animate-child');
        });
    });
}

// ===== ANIMATION DES CARTES AU HOVER =====
function initCardAnimations() {
    const cards = document.querySelectorAll('.bts-card, .project-card, .veille-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 123, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
}

// ===== ANIMATION DE LA TIMELINE =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.transition = 'all 0.6s ease-out';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(item);
    });
}

// ===== ANIMATION DES COMPÉTENCES =====
function initSkillsAnimations() {
    const skillIcons = document.querySelectorAll('.skill-icon-placeholder');
    
    skillIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.background = 'linear-gradient(135deg, #007BFF, #0056b3)';
            icon.style.color = 'white';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = '#e0e0e0';
            icon.style.color = '#007BFF';
        });
    });
}

// ===== ANIMATION DU FORMULAIRE =====
function initFormAnimations() {
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.borderColor = '#007BFF';
            input.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.borderColor = '#ccc';
            input.style.boxShadow = 'none';
        });
    });
}

// ===== ANIMATION DE TYPING POUR LES TITRES =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== ANIMATION DES LIENS DE NAVIGATION =====
function initNavAnimations() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuster pour la navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATION DE PROGRESSION DE SCROLL =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #007BFF, #0056b3);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== ANIMATION DE PARTICULES D'ARRIÈRE-PLAN =====
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 123, 255, 0.1);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
}

// ===== CSS POUR LES ANIMATIONS =====
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animations de base */
        .animate-section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-child {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Animation de la navbar */
        .navbar {
            transition: all 0.3s ease;
        }
        
        .navbar-scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Animation des cartes */
        .bts-card, .project-card, .veille-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Animation des icônes de compétences */
        .skill-icon-placeholder {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Animation des inputs */
        #contact-form input, #contact-form textarea {
            transition: all 0.3s ease;
        }
        
        /* Animation des particules */
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        /* Animation de pulsation pour les éléments importants */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        /* Animation de glissement pour les sections */
        @keyframes slideInFromLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .slide-in-left {
            animation: slideInFromLeft 0.8s ease-out;
        }
        
        .slide-in-right {
            animation: slideInFromRight 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// ===== MENU HAMBURGER MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Empêcher le scroll du body quand le menu est ouvert
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== OPTIMISATIONS MOBILE =====
function initMobileOptimizations() {
    // Détecter si on est sur mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Désactiver certaines animations sur mobile pour de meilleures performances
        const style = document.createElement('style');
        style.textContent = `
            .skill-icon-placeholder:hover {
                transform: scale(1.1) rotate(3deg) !important;
            }
            
            .bts-card:hover, .project-card:hover, .veille-card:hover {
                transform: translateY(-5px) scale(1.01) !important;
            }
            
            /* Réduire les particules sur mobile */
            .particle-container {
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // Optimiser les animations pour mobile
        animationConfig.staggerDelay = 50;
        animationConfig.animationDuration = 300;
    }
}

// ===== GESTION DU VIEWPORT MOBILE =====
function initViewportHandling() {
    // Empêcher le zoom sur les inputs iOS
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 300);
            }
        });
    });
    
    // Gérer l'orientation du device
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les styles d'animation
    addAnimationStyles();
    
    // Initialiser le menu mobile
    initMobileMenu();
    
    // Optimisations mobile
    initMobileOptimizations();
    
    // Gestion du viewport
    initViewportHandling();
    
    // Initialiser toutes les animations
    initSectionAnimations();
    initCardAnimations();
    initTimelineAnimations();
    initSkillsAnimations();
    initFormAnimations();
    initNavAnimations();
    initScrollProgress();
    createParticles();
    
    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.8s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    console.log('🎨 Animations et responsive mobile initialisés avec succès !');
});

// ===== GESTION DES ERREURS =====
window.addEventListener('error', (e) => {
    console.error('Erreur dans les animations:', e.error);
});

// ===== PERFORMANCE - DÉSACTIVER LES ANIMATIONS SUR MOBILE SI NÉCESSAIRE =====
if (window.innerWidth < 768) {
    // Réduire les animations sur mobile pour de meilleures performances
    animationConfig.staggerDelay = 50;
    animationConfig.animationDuration = 300;
}
