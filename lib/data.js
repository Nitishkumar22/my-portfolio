// lib/data.js

export const SKILL_ICONS = [
  { name:"React",           id:"react" },
  { name:"Next.js",         id:"nextjs" },
  { name:"TypeScript",      id:"ts" },
  { name:"JavaScript",      id:"js" },
  { name:"HTML",            id:"html" },
  { name:"CSS",             id:"css" },
  { name:"Tailwind CSS",    id:"tailwind" },
  { name:"Node.js",         id:"nodejs" },
  { name:"Express.js",      id:"express" },
  { name:"MongoDB",         id:"mongodb" },
  { name:"MySQL",           id:"mysql" },
  { name:"Git",             id:"git" },
  { name:"Docker",          id:"docker" },
  { name:"Kubernetes",      id:"kubernetes" },
  { name:"Helm",            id:"helm", custom: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg" },
  { name:"GitHub Actions",  id:"githubactions" },
  { name:"Azure DevOps",    id:"azuredevops", custom: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg" },
  { name:"Azure",           id:"azure" },
  { name:"AWS",             id:"aws" },
  { name:"Terraform",       id:"terraform" },
  { name:"Bash",            id:"bash", custom: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name:"Argo CD",         id:"argocd", custom: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg" },
];

export const EXPERIENCE = [
  {
    role:    "MERN Stack Developer",
    company: "Vizualytic Data Solutions Pvt. Ltd.",
    period:  "Jan 2024 – Present",
    type:    "Full-time",
    points:  [
      "Built MERN stack web apps with React.js, Node.js & MongoDB",
      "Developed reusable component systems for better scalability",
      "Integrated APIs & optimised performance across platforms",
      "Implemented CI/CD pipelines with GitHub Actions & Docker",
    ],
  },
  {
    role:    "Freelance MERN Stack Developer",
    company: "Self-Employed",
    period:  "Nov 2023 – Present",
    type:    "Freelance",
    points:  [
      "Delivered full-stack MERN apps for diverse clients",
      "Designed intuitive frontends with secure backend APIs",
      "Optimised performance & implemented responsive layouts",
      "Shipped scalable solutions with clean architecture",
    ],
  },
  {
    role:    "Freelance DevOps Engineer",
    company: "Self-Employed",
    period:  "Sept 2023 – Present",
    type:    "Freelance",
    points:  [
      "Built CI/CD pipelines using GitHub Actions & Docker",
      "Configured AWS & DigitalOcean for high-availability",
      "Automated deployment workflows to streamline releases",
      "Monitored system performance & infrastructure reliability",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Ts-cloud",
    size:  "large",
    desc:  "Cloud-native SaaS platform with a React frontend and scalable Node.js backend infrastructure deployed on cloud.",
    tags:  ["React","Node.js","MongoDB","Cloud","SaaS"],
    live:  "https://tscloud-ui-dev.traydstream.io/",
    year:  "2024",
  },
  {
    title: "Calsphere",
    size:  "small",
    desc:  "Full-featured calendar & scheduling application with real-time collaboration.",
    tags:  ["React","MongoDB","Express","REST API"],
    live:  "https://calsphere-forntend-new.vercel.app/login",
    year:  "2024",
  },
  {
    title: "Vaculator",
    size:  "small",
    desc:  "Vacation cost calculator with dynamic inputs, interactive charts and responsive UI.",
    tags:  ["React","JavaScript","Tailwind"],
    live:  "https://vds-vaculator.vercel.app/",
    year:  "2023",
  },
  {
    title: "Aditi-one",
    size:  "small",
    desc:  "Modern web platform with optimised performance and clean full-stack MERN architecture.",
    tags:  ["Next.js","TypeScript","Node.js","MongoDB"],
    live:  "#",
    year:  "2024",
  },
];

export const DESIGNS = [
  { title:"Game Dashboard",     cat:"UI/UX",   src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2F1673037142250.jpg&w=828&q=75" },
  { title:"Barba Animation",    cat:"Motion",  src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2Fbarba.gif&w=828&q=75" },
  { title:"Clock Landing Page", cat:"UI/UX",   src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2Fclock.png&w=828&q=75" },
  { title:"Editorial Layout",   cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FFrame%202.png&w=828&q=75" },
  { title:"Golden USA Poster",  cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2Fgolden%20usa.png&w=828&q=75" },
  { title:"Gucci Campaign",     cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FGucci.png&w=828&q=75" },
  { title:"Hotel Booking App",  cat:"UI/UX",   src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FHotel%20booking.png&w=828&q=75" },
  { title:"Web Dashboard",      cat:"UI/UX",   src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FScreenshot%20(42%27).png&w=828&q=75" },
  { title:"Sneaker Promo",      cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2Fshoes.png&w=828&q=75" },
  { title:"Titan Watch Visual", cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FTitan%20watch.png&w=828&q=75" },
  { title:"Experimental",       cat:"Graphic", src:"https://portfolio-eight-swart-55.vercel.app/_next/image?url=%2FMyDesign%2FUntitled.png&w=828&q=75" },
];

export const MARQUEE = [
  "React.js","Next.js","TypeScript","Node.js","MongoDB",
  "Docker","Kubernetes","GitHub Actions","AWS","Terraform","CI/CD",
];

export const TYPEWRITER_ROLES = [
  "MERN Stack Developer",
  "DevOps Engineer",
];
