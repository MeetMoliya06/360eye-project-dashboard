// ── Import project screenshots so Vite can bundle them correctly ──
import imgCopywriter from '../assests/ai_content_generatot.png';
import imgCms        from '../assests/portfolio_cms.png';
import imgMapEditor  from '../assests/map-editor.png';
import imgInsta      from '../assests/ai-social-media-manager.png';

const makeArt = (index) => ['map', 'grid', 'tower', 'tour', 'code', 'drone'][index % 6];

export const PROJECTS = [
  {
    title: '360EYE COPYWRITER AI',
    image: imgCopywriter,
    client: 'Meet Moliya',
    developer: 'Meet Moliya',
    projectId: 'ID-8841-C',
    password: 'Meet@360Eye',
    stagingUrl: 'https://three60eye-copywriter-ai.onrender.com/',
    status: 'DEMO',
    statusKey: 'demo',
    primaryGenre: 'AI TOOL',
    genres: ['AI TOOL', 'WEB APP'],
    tone: 'mustard',
    art: makeArt(4),
    tilt: -0.8,
  },
  {
    title: 'CMS FRONTEND LOGIN',
    image: imgCms,
    client: 'Aryan Tolani',
    developer: 'Aryan Tolani',
    projectId: 'ID-2914-L',
    username: 'admin@gmail.com',
    password: 'admin@123',
    stagingUrl: 'https://cms-frontnd.onrender.com/',
    status: 'DEMO',
    statusKey: 'demo',
    primaryGenre: 'WEB APP',
    genres: ['WEB APP'],
    tone: 'coral',
    art: makeArt(3),
    tilt: 1.2,
  },
  {
    title: 'MAP EDITOR',
    image: imgMapEditor,
    client: 'Prince Mistry',
    developer: 'Prince Mistry',
    projectId: 'ID-5032-M',
    password: 'demo-8pM4-6v',
    stagingUrl: 'https://map-editor-5bk4.onrender.com/',
    status: 'DEMO',
    statusKey: 'demo',
    primaryGenre: 'MAP VIEWER',
    genres: ['MAP VIEWER', 'WEB APP'],
    tone: 'mustard',
    art: makeArt(0),
    tilt: -1.2,
  },
  {
    title: 'AI INSTA MANAGER',
    image: imgInsta,
    client: 'Meet Moliya',
    developer: 'Meet Moliya',
    projectId: 'ID-7448-I',
    password: 'Meet@2004',
    stagingUrl: 'https://ai-insta-manager.onrender.com/',
    status: 'DEMO',
    statusKey: 'demo',
    primaryGenre: 'AI TOOL',
    genres: ['AI TOOL', 'WEB APP'],
    tone: 'teal',
    art: makeArt(4),
    tilt: 0.5,
  },
];

export const GENRE_FILTERS = ['ALL', 'VIRTUAL TOUR', 'MAP VIEWER', '3D RENDER', 'AI TOOL', 'WEB APP', 'DRONE'];
