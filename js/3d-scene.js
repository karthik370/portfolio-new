// 3D Hero Background Scene
import * as THREE from 'three';

class HeroScene {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;

        this.mouse = { x: 0, y: 0 };
        this.init();
        this.createGeometry();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x8b5cf6, 2);
        pointLight1.position.set(10, 10, 10);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xec4899, 2);
        pointLight2.position.set(-10, -10, 10);
        this.scene.add(pointLight2);
    }

    createGeometry() {
        this.geometries = [];

        // Create floating geometric shapes
        const shapes = [
            { geometry: new THREE.TorusGeometry(3, 0.5, 16, 100), position: [-15, 10, -10] },
            { geometry: new THREE.OctahedronGeometry(2), position: [15, -8, -5] },
            { geometry: new THREE.IcosahedronGeometry(2.5), position: [-10, -10, -8] },
            { geometry: new THREE.TetrahedronGeometry(2), position: [12, 8, -12] },
            { geometry: new THREE.BoxGeometry(3, 3, 3), position: [8, -5, -15] }
        ];

        shapes.forEach((shape, index) => {
            const material = new THREE.MeshStandardMaterial({
                color: index % 2 === 0 ? 0x8b5cf6 : 0xec4899,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            const mesh = new THREE.Mesh(shape.geometry, material);
            mesh.position.set(...shape.position);

            // Store rotation speed for animation
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };

            this.scene.add(mesh);
            this.geometries.push(mesh);
        });

        // Add particle field
        this.createParticleField();
    }

    createParticleField() {
        const particlesCount = 500;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x8b5cf6,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particleField = new THREE.Points(geometry, material);
        this.scene.add(this.particleField);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate geometries
        this.geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
        });

        // Gently rotate particle field
        if (this.particleField) {
            this.particleField.rotation.y += 0.0002;
        }

        // Mouse parallax effect
        this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

export default HeroScene;
