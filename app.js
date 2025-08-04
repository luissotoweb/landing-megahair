// Nicole Megahair Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    initFAQ();
    
    // CTA Button tracking
    initCTAButtons();
    
    // Smooth scrolling for internal links
    initSmoothScrolling();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Start countdown timer
    startCountdown();
    
// Countdown timer function
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set initial time: 24 hours
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    // Función para obtener una cookie por su nombre
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    // Primero intentar recuperar de localStorage
    const storedCountdown = localStorage.getItem('megahairCountdown');
    // Luego intentar recuperar de cookies como respaldo
    const cookieCountdown = getCookie('megahairCountdownCookie');
    
    let endTime = null;
    
    if (storedCountdown) {
        const countdownData = JSON.parse(storedCountdown);
        endTime = countdownData.endTime;
    } else if (cookieCountdown) {
        endTime = parseInt(cookieCountdown);
    }
    
    const now = new Date().getTime();
    
    if (endTime && endTime > now) {
        // Si tenemos un tiempo final válido y está en el futuro
        const timeLeft = endTime - now;
        hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    } else {
        // Si no hay tiempo guardado o ya expiró, establecer uno nuevo
        setNewCountdown();
    }
    
    function setNewCountdown() {
        // Set end time to 24 hours from now
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('megahairCountdown', JSON.stringify({ endTime }));
        
        // También guardar en una cookie para mayor persistencia
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 días para la cookie
        document.cookie = `megahairCountdownCookie=${endTime};expires=${expiryDate.toUTCString()};path=/`;
    }
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
        // Decrementar el tiempo
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                } else {
                    // Si el contador llega a cero, reiniciar a 24 horas
                    setNewCountdown();
                    
                    // Obtener el nuevo tiempo final
                    const storedData = JSON.parse(localStorage.getItem('megahairCountdown'));
                    const now = new Date().getTime();
                    const timeLeft = storedData.endTime - now;
                    
                    hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                }
            }
        }
        
        // Update the display
        // Mostrar en formato horas:minutos:segundos
        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Decrement the time
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                } else {
                    // Countdown finished, reset to 5 hours
                    hours = 4;
                    minutes = 59;
                    seconds = 59;
                    setNewCountdown();
                }
            }
        }
    }, 1000);
}
});

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// CTA Button functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section where the button was clicked
            const section = this.getAttribute('data-section') || 'unknown';
            
            // Track the click (you can integrate with analytics here)
            trackCTAClick(section);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Redirect to checkout/payment page
            // Replace this URL with your actual checkout/payment URL
            const checkoutUrl = 'https://pay.hotmart.com/your-product-link';
            
            // Open in new tab for better user experience
            window.open(checkoutUrl, '_blank');
        });
    });
}

// Track CTA clicks (integrate with your analytics)
function trackCTAClick(section) {
    // Google Analytics 4 tracking example
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'section': section,
            'product': 'megahair_manual',
            'price': '19.90'
        });
    }
    
    // Facebook Pixel tracking example
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            content_name: 'Manual Megahair Nicole Mathias',
            content_category: 'Ebook',
            value: 19.90,
            currency: 'BRL'
        });
    }
    
    // Console log for debugging
    console.log(`CTA clicked in section: ${section}`);
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.problem__item, .audience__item, .testimonial, .value__item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add urgency timer (optional countdown)
function initUrgencyTimer() {
    const timerElements = document.querySelectorAll('.urgency-timer');
    
    if (timerElements.length === 0) return;
    
    // Set countdown for 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (5000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (5000 * 60 * 60)) / (5000 * 60));
            const seconds = Math.floor((timeLeft % (5000 * 60)) / 5000);
            
            timerElements.forEach(el => {
                el.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            });
        } else {
            timerElements.forEach(el => {
                el.textContent = 'Oferta Expirada!';
            });
        }
    }
    
    // Update timer every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Form validation (if you add forms later)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const isValid = validateForm(formData);
            
            if (isValid) {
                // Submit form or handle data
                console.log('Form is valid, submitting...');
                handleFormSubmission(formData);
            } else {
                console.log('Form validation failed');
            }
        });
    });
}

function validateForm(formData) {
    let isValid = true;
    
    // Add your validation rules here
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            showFieldError(key, 'Este campo é obrigatório');
        }
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-4)';
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = 'var(--color-error)';
    }
}

function handleFormSubmission(formData) {
    // Here you would typically send the data to your server
    // For now, we'll just log it
    console.log('Submitting form data:', Object.fromEntries(formData));
    
    // Show success message
    showNotification('Formulário enviado com sucesso!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: 'var(--space-16) var(--space-20)',
        borderRadius: 'var(--radius-base)',
        color: 'white',
        fontWeight: 'var(--font-weight-medium)',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Lazy loading for images (if you add images later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Mobile menu toggle (if you add navigation later)
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Price animation effect
function initPriceAnimation() {
    const priceElements = document.querySelectorAll('.hero__price-current, .offer__price-current');
    
    priceElements.forEach(price => {
        // Add a pulse animation when the element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'pulse 2s infinite';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(price);
    });
}

// Add pulse animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize price animation
initPriceAnimation();

// Add click tracking for all links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        const text = e.target.textContent.trim();
        
        console.log(`Link clicked: ${text} -> ${href}`);
        
        // Track with analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Link',
                'event_label': text,
                'value': href
            });
        }
    }
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--color-pink-accent), var(--color-gold));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// Initialize scroll progress
initScrollProgress();