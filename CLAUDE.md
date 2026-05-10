@AGENTS.md

# Nitish Kumar - Portfolio Documentation

## Overview
Modern, minimalist portfolio website for Nitish Kumar - MERN Stack Developer & DevOps Engineer.

## Tech Stack
- **Framework:** Next.js 16.2.6 (App Router)
- **React:** 19.2.4
- **Styling:** Vanilla CSS with CSS-in-JS
- **Fonts:** Geist & Geist Mono (Next.js fonts)
- **Icons:** 
  - react-icons (social media icons)
  - lucide-react (UI icons)
  - skillicons.dev + devicon (skill badges)
- **Carousel:** Swiper.js
- **Theme:** next-themes (dark/light mode)
- **Animations:** CSS animations + Framer Motion concepts

## Project Structure
```
/app
  layout.js          # Root layout with ThemeProvider
  page.jsx           # Main portfolio orchestrator
  globals.css        # Global styles + theme variables

/app-pages
  AboutPage.jsx      # About section
  ProjectsPage.jsx   # Projects showcase
  DesignsPage.jsx    # Design portfolio

/components
  Loader.jsx              # Signature animation loader (3.2s)
  NavBar.jsx              # Fixed navigation with theme toggle
  Hero.jsx                # Hero section with typewriter
  ThemeToggle.jsx         # Animated theme switcher
  ExperienceCarousel.jsx  # Swiper carousel for experience
  Experience.jsx          # Experience section wrapper
  MarqueeBand.jsx         # Scrolling tech stack
  ProjectsBento.jsx       # Projects grid
  SkillsGrid.jsx          # Skills with icons
  Footer.jsx              # Footer with social links

/hooks
  useTypewriter.js   # Typewriter effect hook

/lib
  data.js            # All content data
  theme.js           # Theme color definitions

/components
  theme-provider.jsx # next-themes wrapper
```

## Key Features

### 1. Signature Loader
- Custom SVG handwriting animation
- Duration: ~3.2 seconds (optimized from 5.6s)
- Font: Great Vibes (cursive)
- Phases: Draw → Fill → Slide out

### 2. Theme System
- Dark/Light mode with next-themes
- Custom ThemeToggle component with smooth animations
- CSS variables for theming
- Persistent theme preference

### 3. Experience Carousel
- Swiper.js implementation
- Responsive breakpoints:
  - Mobile: 1 card
  - Tablet: 2 cards
  - Desktop: 3 cards
- Touch/swipe gestures
- Auto-play (5s delay)
- Navigation arrows (desktop)
- Pagination dots

### 4. Typewriter Effect
- Alternates between roles:
  - "MERN Stack Developer"
  - "DevOps Engineer"
- Custom hook implementation
- Smooth typing animation

### 5. Skills Grid
- 22 technologies displayed
- Icons from skillicons.dev + devicon
- Hover animations
- Custom icons for: Helm, Azure DevOps, Bash, Argo CD

## Content Data

### Experience
- MERN Stack Developer @ Vizualytic (Jan 2024 - Present)
- Freelance MERN Stack Developer (Nov 2023 - Present)
- Freelance DevOps Engineer (Sept 2023 - Present)

### Skills (22 total)
React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Node.js, Express.js, MongoDB, MySQL, Git, Docker, Kubernetes, Helm, GitHub Actions, Azure DevOps, Azure, AWS, Terraform, Bash, Argo CD

### Contact
- Email: nitish.kumar.cs57@mail.com
- Phone: +91 7294002072
- LinkedIn: https://www.linkedin.com/in/nitishkweb/
- GitHub: https://github.com/Nitishkumar22

## Color Scheme

### Dark Mode (Default)
- Background: `#09090b`
- Text: `#fafafa`
- Muted: `#a1a1aa`
- Dim: `#71717a`
- Border: `#27272a`

### Light Mode
- Background: `#ffffff`
- Text: `#09090b`
- Muted: `#71717a`
- Dim: `#a1a1aa`
- Border: `#e4e4e7`

## Performance Optimizations
- Reduced loader time from 5.6s → 3.2s
- Lazy loading for images
- CSS-in-JS for component isolation
- Optimized animations with CSS transforms
- Minimal dependencies

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

## Recent Updates
1. ✅ Replaced "Full Stack Developer" with "MERN Stack Developer" throughout
2. ✅ Added Swiper.js carousel for Experience section
3. ✅ Implemented custom ThemeToggle with animations
4. ✅ Added social icons (LinkedIn, GitHub) with react-icons
5. ✅ Added contact information (email, phone) in About & Footer
6. ✅ Removed Instagram, FastAPI, Redux from portfolio
7. ✅ Added Helm, Azure DevOps, Bash, Argo CD skills
8. ✅ Optimized loader timing (43% faster)
9. ✅ Updated typewriter to show only 2 roles

## Notes for AI Assistants
- Project uses vanilla CSS, NOT Tailwind (despite having it in skills)
- Skiper UI components require Tailwind, so custom implementations were used
- Theme system uses both local state and next-themes for compatibility
- All icons use external CDNs (skillicons.dev, devicon, react-icons)
- Loader timing is critical for UX - keep under 3.5s
