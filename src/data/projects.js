// Placeholder project data for the Cartridge Shelf portfolio dashboard
export const PROJECTS = [
  {
    id: 1,
    title: "NOVA DASH",
    subtitle: "Realtime Analytics Engine",
    developer: "A. Rivera",
    projectId: "ID-4471-X",
    password: "n0vaD@sh!99",
    genres: ["WEB APP", "ANALYTICS"],
    status: "COMPLETE",
    year: "2024",
    labelColor: "#e8b84b",   // mustard
    accentColor: "#c49a2a",
    thumbnail: "/images/retro_thumbnail_1_1786089138101.png",
    description: "High-throughput data pipeline dashboard with live chart feeds and anomaly detection.",
  },
  {
    id: 2,
    title: "PIXEL FORGE",
    subtitle: "AI Image Generator",
    developer: "M. Tanaka",
    projectId: "ID-7832-A",
    password: "p!x3lF0rge",
    genres: ["AI TOOL", "CREATIVE"],
    status: "COMPLETE",
    year: "2024",
    labelColor: "#e8513a",   // coral
    accentColor: "#c43820",
    thumbnail: "/images/retro_thumbnail_2_1786089228661.png",
    description: "Browser-based AI image synthesis tool with style transfer and batch export.",
  },
  {
    id: 3,
    title: "LOOT BOX",
    subtitle: "E-Commerce Storefront",
    developer: "S. Okonkwo",
    projectId: "ID-2209-B",
    password: "L00tB0x$21",
    genres: ["WEB APP", "E-COMM"],
    status: "IN PROGRESS",
    year: "2025",
    labelColor: "#3ab5a8",   // teal
    accentColor: "#258f84",
    thumbnail: "/images/retro_thumbnail_3_1786089262588.png",
    description: "Full-stack store with real-time inventory, cart system and Stripe integration.",
  },
  {
    id: 4,
    title: "QUEST LOG",
    subtitle: "RPG Task Manager",
    developer: "J. Moreau",
    projectId: "ID-5560-Q",
    password: "Qu3stL0g#44",
    genres: ["MOBILE", "PRODUCTIVITY"],
    status: "DEMO",
    year: "2025",
    labelColor: "#a855f7",   // purple accent
    accentColor: "#7c3aed",
    thumbnail: "/images/retro_thumbnail_4_1786089278773.png",
    description: "Gamified to-do system with XP, level-ups and quest chains. React Native.",
  },
  {
    id: 5,
    title: "SIGNAL TOWER",
    subtitle: "IoT Control Center",
    developer: "E. Nakamura",
    projectId: "ID-3381-S",
    password: "S!gn@lTwr77",
    genres: ["IOT", "DASHBOARD"],
    status: "COMPLETE",
    year: "2023",
    labelColor: "#e8b84b",   // mustard
    accentColor: "#c49a2a",
    thumbnail: "/images/retro_thumbnail_5_1786089300341.png",
    description: "MQTT-based control panel for smart home sensor arrays with alert rules.",
  },
  {
    id: 6,
    title: "VOID RUNNER",
    subtitle: "Social Platform",
    developer: "C. Baptiste",
    projectId: "ID-9901-V",
    password: "V0idRun!2025",
    genres: ["SOCIAL", "WEB APP"],
    status: "IN PROGRESS",
    year: "2025",
    labelColor: "#e8513a",   // coral
    accentColor: "#c43820",
    thumbnail: "/images/retro_thumbnail_6_1786089312620.png",
    description: "Decentralized micro-blogging platform with end-to-end encryption and federation.",
  },
];

export const STATUS_LABELS = {
  "COMPLETE":     "COMPLETE",
  "IN PROGRESS":  "IN PROG",
  "DEMO":         "DEMO",
};

export const ALL_GENRES = [
  "ALL", "WEB APP", "AI TOOL", "MOBILE", "IOT", "DASHBOARD", "E-COMM", "SOCIAL", "CREATIVE", "ANALYTICS", "PRODUCTIVITY",
];
