# TCET S4DS — Official Chapter Website

Welcome to the official repository for the **Society for Data Science (S4DS) Club** at **Thakur College of Engineering & Technology (TCET), Mumbai**.

This frontend repository is architected with **React 19, Vite, Tailwind CSS v4, Framer Motion, and React Router v6**. It features a modern dark-theme aesthetic (`#090D16`), glassmorphism, responsive mobile drawers, interactive modals, and structured data models for easy content management by the frontend team.

Live Production URL: **[https://tcet-s4ds-web.web.app](https://tcet-s4ds-web.web.app)**

---

## 🚀 Quick Start for Developers

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/kaushalshetty987/Tcet_S4DS_Web.git
   cd Tcet_S4DS_Web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📁 Repository Structure

```
Tcet_S4DS_Web/
├── index.html              # Entry HTML shell with SEO metadata & Google Fonts
├── vite.config.js          # Vite bundler configuration
├── firebase.json           # Firebase Hosting rewrites (SPA routing & security headers)
├── .firebaserc             # Firebase project targeting (tcet-s4ds-web)
├── .gitignore              # Ignored files (node_modules, dist, .env, secrets)
├── package.json            # Manifest & dependencies
├── src/
│   ├── main.jsx            # React 19 root renderer
│   ├── App.jsx             # React Router v6 setup & scroll restoration
│   ├── index.css           # Global design system tokens, fonts & keyframe animations
│   ├── data/               # 💡 FRONTEND EDIT DATA FILES (Update content here)
│   │   ├── team.js         # HOD, Faculty Advisor, 14 Core Leaders, Junior Core
│   │   ├── events.js       # ANALYTRIX flagship data, winners podium & timeline
│   │   ├── publications.js # DataSphere Vol 1-3 metadata & PDF previews
│   │   └── gallery.js      # Event photos, categories, captions & dates
│   ├── components/         # Reusable UI components
│   │   ├── S4DSLogo.jsx    # Custom glowing SVG vector logo
│   │   ├── Navbar.jsx      # Sticky navbar & mobile drawer
│   │   ├── Footer.jsx      # Multi-column footer & social links
│   │   ├── Hero.jsx        # Landing hero banner & stats integration
│   │   ├── TeamCard.jsx    # Member profile card with LinkedIn integration
│   │   ├── EventCard.jsx   # Event card & registration modal with confetti
│   │   ├── PublicationCard.jsx # DataSphere magazine showcase & PDF reader modal
│   │   ├── Timeline.jsx    # Vertical event timeline roadmap
│   │   └── ...             # ScrollProgress, BackToTop, AnimatedBackground, LoadingScreen
│   ├── layouts/
│   │   └── MainLayout.jsx  # Global layout wrapper
│   └── pages/
│       ├── Home.jsx        # Aggregates Hero, About, Events, Magazine & Sponsors
│       ├── Team.jsx        # Leadership directory with real-time search filter
│       ├── Events.jsx      # ANALYTRIX Spotlight, Winners Podium & 2025-26 Calendar
│       ├── Publications.jsx# DataSphere editions & Call for Research Papers
│       ├── Gallery.jsx     # Masonry grid & full-screen Lightbox viewer
│       ├── Contact.jsx     # Inquiry form, TCET Google Map & contact info
│       └── NotFound.jsx    # Custom 404 screen
```

---

## 🛠️ How to Content Update (For Frontend Team)

All dynamic text, team profiles, event details, magazine links, and photos are decoupled into **`src/data/`**:

- **Update Team Members**: Edit `src/data/team.js` to change names, roles, bios, profile images, or LinkedIn links.
- **Update Events**: Edit `src/data/events.js` to add upcoming hackathons, registration deadlines, or prize pool details.
- **Update Publications**: Edit `src/data/publications.js` to release new volumes of DataSphere.
- **Update Gallery**: Edit `src/data/gallery.js` to add event photos and tags.

---

## 🛡️ Deploying to Firebase

This repository is pre-configured for Firebase Hosting with Single Page Application rewrites and security headers.

To deploy updates to live production:
```bash
# 1. Build production bundle
npm run build

# 2. Deploy to Firebase
npx firebase-tools deploy --only hosting
```

---

## 🔒 Security Best Practices
- **API Keys**: Never commit `.env` or secret credentials to Git. Use `.env.example` as a template.
- **Routing**: `firebase.json` automatically handles client-side SPA routing (`/team`, `/events`, etc.) to prevent 404 errors on browser refreshes.

---

© S4DS Chapter — Thakur College of Engineering & Technology (TCET), Mumbai.
