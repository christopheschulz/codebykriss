// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links with full section display
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to target section
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// CONTACT FORM - TEMPORAIREMENT DÉSACTIVÉ
// ==========================================
// Formulaire de contact avec EmailJS
// À réactiver quand l'email professionnel sera prêt
// 
// Pour réactiver :
// 1. Décommenter le code ci-dessous
// 2. Configurer EmailJS avec les vraies clés
// 3. Remplacer le message temporaire par le vrai formulaire
// ==========================================

/*
// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique EmailJS
})();

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        showFormStatus('loading', 'Envoi de votre message...');
        
        // Send email using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('success', 'Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showFormStatus('error', 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement par email.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            });
    });
}

function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    
    // Hide status after 5 seconds for success/error
    if (type !== 'loading') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}
*/

// Save scroll position before leaving page
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
});

// Restore scroll position when returning to page
window.addEventListener('load', () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.98) 0%, rgba(52, 152, 219, 0.98) 100%)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 152, 219, 0.95) 100%)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Section navigation observer for active nav links
const sectionObserver = new IntersectionObserver((entries) => {
    let mostVisibleEntry = null;
    let maxIntersectionRatio = 0;
    
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
        }
    });
    
    if (mostVisibleEntry) {
        // Update active navigation link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`.nav-menu a[href="#${mostVisibleEntry.target.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}, {
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: '-80px 0px -20% 0px'
});

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe sections for navigation
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});