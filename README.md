# 🚀 Govardhan Reddy Bommineni - Portfolio

A world-class, unique portfolio website featuring cutting-edge 3D effects, premium animations, and an unforgettable user experience.

## ✨ Features

- 🎬 **3D WebGL Intro**: Particle system with animated loading
- 🌟 **Interactive 3D Hero**: Floating geometric shapes with mouse parallax
- 🎨 **Glassmorphic Design**: Premium dark theme with blur effects
- 📜 **GSAP Animations**: Cinematic scroll-triggered reveals
- 💼 **3D Project Cards**: Interactive flip cards on hover
- 📊 **Animated Skills**: Progress bars with elastic animations
- 📱 **Fully Responsive**: Perfect on all devices
- ⚡ **Lightning Fast**: Optimized with Vite

## 🛠️ Tech Stack

- **Build**: Vite 5.0
- **3D Graphics**: Three.js 0.160
- **Animations**: GSAP 3.12 + ScrollTrigger
- **Styling**: Custom CSS with CSS Variables
- **JavaScript**: ES6+ Modules

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML
├── styles/
│   └── main.css       # Design system
├── js/
│   ├── main.js        # Entry point
│   ├── intro.js       # 3D intro
│   ├── 3d-scene.js    # Hero background
│   └── animations.js  # GSAP animations
└── assets/
    └── images/        # Images
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
  --color-primary: hsl(260, 100%, 65%);
  --color-secondary: hsl(320, 100%, 60%);
  --color-accent: hsl(180, 100%, 50%);
}
```

### Content
Update personal information in `index.html`

### 3D Effects
Modify particle count, shapes, or animations in:
- `js/intro.js` - Intro particles
- `js/3d-scene.js` - Hero geometries

## 📊 Performance

- ⚡ Vite for instant HMR
- 🎯 Code splitting for libraries
- 🔄 60fps animations
- 📦 Optimized bundle size

## 🚢 Deployment

### Netlify (Recommended)
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 📝 License

MIT License - feel free to use for your own portfolio!

## 🙏 Credits

Created by Govardhan Reddy Bommineni  
Portfolio showcasing expertise in full-stack development, mobile apps, and AI

---

**Made with 💜 and cutting-edge web technologies**
