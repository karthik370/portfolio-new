// GSAP Animations with ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Animations {
    constructor() {
        // Wait for intro to complete
        window.addEventListener('intro-complete', () => {
            this.init();
        });
    }

    init() {
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupProjectCards();
        this.setupStaggerAnimations();
    }

    setupScrollAnimations() {
        // Fade in sections on scroll
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });
        });

        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // About stats
        gsap.from('.stat-card', {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.6,
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Achievement cards
        gsap.from('.achievement-card', {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            scrollTrigger: {
                trigger: '.achievements-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Contact section
        gsap.from('.contact-info', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from('.contact-form', {
            opacity: 0,
            x: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    setupSkillBars() {
        // Animate skill bars on scroll
        gsap.utils.toArray('.skill-category').forEach(category => {
            const skillBars = category.querySelectorAll('.skill-progress');

            gsap.from(skillBars, {
                width: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: category,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    setupProjectCards() {
        // Add subtle float animation to project cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            // Initial reveal
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Floating animation
            gsap.to(card, {
                y: -10,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
        });
    }

    setupStaggerAnimations() {
        // Tech tags stagger
        gsap.utils.toArray('.project-card').forEach(card => {
            const tags = card.querySelectorAll('.tech-tag');

            gsap.from(tags, {
                opacity: 0,
                scale: 0,
                stagger: 0.05,
                duration: 0.4,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Social links stagger
        gsap.from('.hero-social .social-link', {
            opacity: 0,
            scale: 0,
            stagger: 0.1,
            duration: 0.4,
            delay: 1.6
        });
    }
}

export default Animations;
