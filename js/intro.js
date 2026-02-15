// 3D Intro Experience with Three.js Particles
import * as THREE from 'three';

class IntroExperience {
    constructor() {
        this.canvas = document.getElementById('intro-canvas');
        this.intro = document.getElementById('intro-screen');
        this.progress = document.getElementById('loading-progress');
        this.loadingProgress = 0;

        this.init();
        this.createParticles();
        this.animate();
        this.simulateLoading();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x8b5cf6, 2);
        pointLight.position.set(0, 0, 50);
        this.scene.add(pointLight);

        // Handle resize
        window.addEventListener('resize', () => this.onResize());
    }

    createParticles() {
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        // Create particle positions in a sphere
        for (let i = 0; i < particlesCount * 3; i += 3) {
            const radius = 30 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);

            // Purple to pink to cyan gradient
            const colorIndex = Math.random();
            if (colorIndex < 0.33) {
                colors[i] = 0.54; // Purple
                colors[i + 1] = 0.36;
                colors[i + 2] = 0.96;
            } else if (colorIndex < 0.66) {
                colors[i] = 0.96; // Pink
                colors[i + 1] = 0.36;
                colors[i + 2] = 0.75;
            } else {
                colors[i] = 0.36; // Cyan
                colors[i + 1] = 1.0;
                colors[i + 2] = 1.0;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x += 0.0005;
        }

        this.renderer.render(this.scene, this.camera);
    }

    simulateLoading() {
        const interval = setInterval(() => {
            this.loadingProgress += Math.random() * 15;

            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                clearInterval(interval);

                // Complete loading
                this.progress.style.width = '100%';

                setTimeout(() => {
                    this.complete();
                }, 500);
            } else {
                this.progress.style.width = this.loadingProgress + '%';
            }
        }, 200);
    }

    complete() {
        // Hide intro screen
        this.intro.classList.add('hidden');

        // Show navigation
        const nav = document.getElementById('nav');
        if (nav) {
            setTimeout(() => nav.classList.add('show'), 300);
        }

        // Cleanup
        this.cleanup();

        // Trigger event for other scripts
        window.dispatchEvent(new Event('intro-complete'));
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    cleanup() {
        // Clean up Three.js resources
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }
        window.removeEventListener('resize', this.onResize);
    }
}

// Initialize intro experience
export default IntroExperience;
