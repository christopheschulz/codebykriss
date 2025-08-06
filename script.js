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
// CONTACT FORM - EmailJS
// ==========================================

// Initialize EmailJS
(function() {
    emailjs.init("D9Lbpf5Qshz4fGR9F"); // Clé publique EmailJS
})();

// Contact form handling with EmailJS and validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        if (!phone) return true; // Optional field
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous validation classes and error messages
        formGroup.classList.remove('error', 'success');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = `Le champ "${field.labels[0].textContent.replace(' *', '')}" est obligatoire`;
        }
        // Email validation
        else if (field.type === 'email' && value && !validateEmail(value)) {
            isValid = false;
            errorMessage = 'Veuillez saisir une adresse email valide (ex: nom@domaine.fr)';
        }
        // Phone validation
        else if (field.type === 'tel' && value && !validatePhone(value)) {
            isValid = false;
            errorMessage = 'Veuillez saisir un numéro de téléphone français valide';
        }
        // Select validation
        else if (field.tagName === 'SELECT' && field.required && !value) {
            isValid = false;
            errorMessage = `Veuillez sélectionner ${field.labels[0].textContent.replace(' *', '').toLowerCase()}`;
        }
        // Textarea minimum length validation
        else if (field.tagName === 'TEXTAREA' && field.name === 'message' && value && value.length < 50) {
            isValid = false;
            errorMessage = `Veuillez décrire votre projet avec au moins 50 caractères (${value.length}/50)`;
        }
        
        // Apply validation classes and show error message
        if (value || field.required) {
            formGroup.classList.add(isValid ? 'success' : 'error');
            
            if (!isValid && errorMessage) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errorMessage;
                formGroup.appendChild(errorDiv);
            }
        }
        
        return { isValid, errorMessage };
    }
    
    // Add real-time validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        // Validate immediately on input (real-time)
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields and collect errors
        let isFormValid = true;
        let errorMessages = [];
        
        formFields.forEach(field => {
            const validation = validateField(field);
            if (!validation.isValid) {
                isFormValid = false;
                if (validation.errorMessage) {
                    errorMessages.push(`• ${validation.errorMessage}`);
                }
            }
        });
        
        if (!isFormValid) {
            const errorSummary = errorMessages.length > 0 
                ? `Erreurs détectées :\n${errorMessages.join('\n')}`
                : 'Veuillez corriger les erreurs dans le formulaire.';
            showFormMessage('error', errorSummary);
            
            // Scroll to first error field
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = firstError.querySelector('input, select, textarea');
                if (input) input.focus();
            }
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.querySelector('.btn-content').innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-content').innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Envoi en cours...
        `;
        
        // Add loading animation
        const loadingIcon = submitBtn.querySelector('svg');
        loadingIcon.style.animation = 'spin 1s linear infinite';
        
        // Send email using EmailJS
        emailjs.sendForm('service_i5fh0wc', 'template_rlp6fxk', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormMessage('success', 'Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais.');
                contactForm.reset();
                
                // Reset validation classes
                formFields.forEach(field => {
                    field.closest('.form-group').classList.remove('error', 'success');
                });
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showFormMessage('error', 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement par email.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-content').innerHTML = originalContent;
                loadingIcon.style.animation = '';
            });
    });
}

function showFormMessage(type, message) {
    // Create or get existing message element
    let messageElement = document.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        const formActions = contactForm.querySelector('.form-actions');
        formActions.appendChild(messageElement);
    }
    
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Smooth scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 8 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 8000);
}

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