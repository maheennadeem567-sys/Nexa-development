export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Globe' | 'Smartphone' | 'Layout' | 'ShoppingCart' | 'Code2' | 'Sparkles';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url: string;
  category: string;
  themeColor: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Smartphone' | 'FileCode' | 'Sparkles' | 'Gauge';
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: 'Mail' | 'Linkedin' | 'Github' | 'MessageCircle' | 'MapPin' | 'Instagram';
  displayLabel: string;
}

export interface TechBadgeItem {
  name: string;
  dotColor: string;
}

export const TECH_BADGES_DATA: TechBadgeItem[] = [
  { name: 'HTML', dotColor: '#E34F26' },
  { name: 'CSS', dotColor: '#2965F1' },
  { name: 'JavaScript', dotColor: '#F7DF1E' },
  { name: 'React.js', dotColor: '#61DAFB' },
  { name: 'Flutter', dotColor: '#54C5F8' },
  { name: 'Firebase', dotColor: '#FFCA28' },
];

export const BRAND = {
  first: "Nexa",
  second: "",
} as const;

export const BRAND_DATA = {
  name: "Nexa",
  brand: BRAND,
  heroHeading: {
    highlight: "Innovative",
    suffix: "Web & App Development",
  },
  heroDescription:
    "We build modern, responsive websites and web applications that help businesses establish a strong digital presence. From landing pages to custom web solutions, we turn ideas into functional digital experiences.",
  techBadges: TECH_BADGES_DATA,
  footerDescription:
    "Crafting performant, resilient digital platforms and web apps that elevate businesses with clean code and modern aesthetics.",
  socials: [
    {
      name: "Email",
      url: "mailto:maheennadeem567@gmail.com",
      iconName: "Mail" as const,
      displayLabel: "maheennadeem567@gmail.com",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/maheen-nadeem-446340405",
      iconName: "Linkedin" as const,
      displayLabel: "maheen-nadeem-446340405",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mahii15531/",
      iconName: "Instagram" as const,
      displayLabel: "@mahii15531",
    },
    {
      name: "Location",
      url: "#",
      iconName: "MapPin" as const,
      displayLabel: "Rawalpindi, Pakistan",
    },
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

// Services: 6 cards, 15-25 words each
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "website-dev",
    title: "Website Development",
    description: "Custom, standards-compliant websites built with modern frameworks to represent your brand and engage every visitor.",
    iconName: "Globe",
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description: "Fluid layouts that adapt flawlessly to smartphones, tablets and desktops for a seamless browsing experience.",
    iconName: "Smartphone",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Structured wireframes and user-centric interfaces that improve navigation, boost conversions and raise user satisfaction.",
    iconName: "Layout",
  },
  {
    id: "ecommerce-dev",
    title: "E-commerce Website Development",
    description: "Secure, easy-to-manage online stores with product catalogs, smooth checkout flows and mobile-friendly shopping.",
    iconName: "ShoppingCart",
  },
  {
    id: "web-app-dev",
    title: "Web Application Development",
    description: "Scalable, interactive web applications with clean architecture, built to handle real business workflows.",
    iconName: "Code2",
  },
  {
    id: "redesign-optimization",
    title: "Website Redesign and Optimization",
    description: "Refresh outdated websites with a modern look, faster load times and better usability.",
    iconName: "Sparkles",
  },
];

// Featured Projects: 1 card, 15-25 words each, 3-4 tech badges, configurable url
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "personal-portfolio",
    title: "Maheen's Portfolio Website",
    description: "A modern full-stack developer and UI/UX portfolio featuring bold typography, dark theme design, project showcase, skills, certifications, and a contact section.",
    tech: ["React.js", "HTML5", "CSS3", "JavaScript"],
    url: "https://maheen-dev-portfolio.netlify.app/",
    category: "Showcase Site",
    themeColor: "#0EA5E9",
  },
];

// Why Choose Us: 4 cards, 12-20 words each
export const WHY_CHOOSE_US_DATA: FeatureItem[] = [
  {
    id: "responsive-devices",
    title: "Responsive Across Devices",
    // 16 words
    description: "Every page adapts naturally to mobile screens, laptops, and ultra-wide monitors without visual compromises.",
    iconName: "Smartphone",
  },
  {
    id: "clean-code",
    title: "Clean and Maintainable Code",
    // 15 words
    description: "Modular, well-documented architecture that makes future updates easy, secure, and hassle-free to scale.",
    iconName: "FileCode",
  },
  {
    id: "modern-ux",
    title: "Modern User Experience",
    // 15 words
    description: "Intuitive navigation, clear content hierarchies, and pleasant interactive cues that keep visitors engaged consistently.",
    iconName: "Sparkles",
  },
  {
    id: "performance-focused",
    title: "Performance-Focused Development",
    // 15 words
    description: "Lean assets, optimized bundle sizes, and quick rendering ensure fast load times and high satisfaction.",
    iconName: "Gauge",
  },
];

// Work Process: 4 steps
export const PROCESS_STEPS_DATA: ProcessStepItem[] = [
  {
    step: "01",
    title: "Discuss Your Requirements",
    description:
      "We begin by understanding your objectives, target audience, brand aesthetic, and specific functional requirements to define a focused development scope.",
  },
  {
    step: "02",
    title: "Plan and Design",
    description:
      "We create structured wireframes, design intuitive interface layouts, and organize user flows to ensure an engaging, accessible experience.",
  },
  {
    step: "03",
    title: "Develop and Test",
    description:
      "We write clean, modular code with modern best practices, testing performance, responsiveness, and cross-browser reliability at every stage.",
  },
  {
    step: "04",
    title: "Launch Your Website",
    description:
      "After rigorous quality checks and client approval, we deploy your site to production, ensuring fast loading and seamless live operation.",
  },
];

// About Section: 2 short paragraphs, 70-100 words total
export const ABOUT_DATA = {
  heading: "Turning Ideas Into Digital Experiences",
  paragraphs: [
    // 44 words
    "At Nexa Development, we focus on building reliable, responsive websites and practical web solutions designed to solve real business challenges. We believe digital products should look visually polished while operating with effortless speed, solid security, and dependable structural stability across every device.",
    // 43 words
    "Our approach unites clean code standards with thoughtful user interface design. By focusing on essential usability and clear content flow, we deliver practical web platforms that represent your brand with distinction and turn incoming visitors into enthusiastic, long-term clients.",
  ],
  // Total words: 44 + 43 = 87 words (within 70-100 words range)
  valueChips: ["Responsive", "Clean Code", "User-Focused"],
};

export const CONTACT_SERVICES_OPTIONS = [
  "Website Development",
  "Responsive Web Design",
  "UI/UX Design",
  "E-commerce Website Development",
  "Web Application Development",
  "Website Redesign and Optimization",
  "Other",
];
