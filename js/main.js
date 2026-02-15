// Main Application Entry Point
import IntroExperience from './intro.js';
import HeroScene from './3d-scene.js';
import Animations from './animations.js';
import { initMobileNav } from './mobile-nav.js';

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize intro experience
        new IntroExperience();

        // Wait for intro to complete before initializing other features
        window.addEventListener('intro-complete', () => {
            this.initHero();
            this.initAnimations();
            this.initNavigation();
            this.initSmoothScroll();
            this.initContactForm();
            this.initTypingEffect();
        });
    }

    initHero() {
        // Initialize 3D hero scene
        new HeroScene();
    }

    initAnimations() {
        // Initialize GSAP animations
        new Animations();
    }

    initNavigation() {
        // Initialize mobile navigation
        initMobileNav();

        // Highlight active section in nav
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = target.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initContactForm() {
        const form = document.getElementById('contact-form');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                // Display success message (in production, send to backend)
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

                // Reset form
                form.reset();
            });
        }
    }

    initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const texts = [
            'Software Engineering Student',
            'Full-Stack Developer',
            'Mobile App Developer',
            'AI Enthusiast',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing effect after intro
        setTimeout(type, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, hsl(260, 100%, 65%), hsl(320, 100%, 60%));
      color: white;
      padding: 1rem 2rem;
      border-radius: 1rem;
      box-shadow: 0 8px 32px hsla(0, 0%, 0%, 0.4);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize portfolio when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Portfolio());
} else {
    new Portfolio();
}
