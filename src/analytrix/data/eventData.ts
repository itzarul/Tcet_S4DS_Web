import { FloatingCardItem, GalleryItem, ChapterData } from '../types';

// Hero scattered cards (15 cards for 3D concave sphere)
export const HERO_GALLERY_CARDS: FloatingCardItem[] = [
  {
    id: 'hero-1',
    title: 'Neural Architecture Sprint',
    subtitle: 'Model optimization under GPU constraints',
    category: 'datathon',
    meta: 'Session 01 // Hall A',
    imageUrl: '/images/datathon/datathon1.JPG',
    scatterX: -38,
    scatterY: -28,
    scatterRotate: -9,
    scale: 0.95
  },
  {
    id: 'hero-2',
    title: 'Collaborative Ideation Board',
    subtitle: 'Whiteboard topology and workflow trees',
    category: 'datathon',
    meta: 'Team Alpha // Brainstorm',
    imageUrl: '/images/datathon/datathon2.JPG',
    scatterX: -22,
    scatterY: -36,
    scatterRotate: 6,
    scale: 1.05
  },
  {
    id: 'hero-3',
    title: 'Tensor Telemetry Monitor',
    subtitle: 'Real-time training loss & latency curves',
    category: 'datathon',
    meta: 'Telemetry Terminal 04',
    imageUrl: '/images/datathon/datathon4.JPG',
    scatterX: 6,
    scatterY: -38,
    scatterRotate: -4,
    scale: 0.9
  },
  {
    id: 'hero-4',
    title: 'Opening Conclave Keynote',
    subtitle: 'Main auditorium stage address on Frontier AI',
    category: 'conclave',
    meta: 'Grand Hall // Attendees',
    imageUrl: '/images/datathon/datathon5.JPG',
    scatterX: 32,
    scatterY: -24,
    scatterRotate: 12,
    scale: 1.0
  },
  {
    id: 'hero-5',
    title: 'Fireside AI Ethics Dialogue',
    subtitle: 'Governance, safety, and agentic autonomy',
    category: 'conclave',
    meta: 'Panel Discussion 02',
    imageUrl: '/images/datathon/datathon6.JPG',
    scatterX: 42,
    scatterY: 2,
    scatterRotate: -8,
    scale: 1.05
  },
  {
    id: 'hero-6',
    title: 'Embedded Inference Edge Test',
    subtitle: 'Low-power latency benchmarks on micro-clusters',
    category: 'datathon',
    meta: 'Hardware Bench 09',
    imageUrl: '/images/datathon/datathon7.JPG',
    scatterX: -42,
    scatterY: 8,
    scatterRotate: 14,
    scale: 0.9
  },
  {
    id: 'hero-7',
    title: 'Late-Night Coding Sprint',
    subtitle: 'Collaborative analysis and pipeline building',
    category: 'datathon',
    meta: 'Datathon Floor // Midnight',
    imageUrl: '/images/datathon/datathon8.JPG',
    scatterX: -32,
    scatterY: 28,
    scatterRotate: -11,
    scale: 1.02
  },
  {
    id: 'hero-8',
    title: 'Jury Evaluation & Code Review',
    subtitle: 'Industry leads stress-testing pipeline stability',
    category: 'datathon',
    meta: 'Review Booth 03',
    imageUrl: '/images/datathon/datathon9.JPG',
    scatterX: -10,
    scatterY: 34,
    scatterRotate: 5,
    scale: 0.95
  },
  {
    id: 'hero-9',
    title: 'Audience Q&A & Discourse',
    subtitle: 'Direct dialogue with leading practitioners',
    category: 'conclave',
    meta: 'Main Amphitheater',
    imageUrl: '/images/datathon/datathon10.JPG',
    scatterX: 18,
    scatterY: 32,
    scatterRotate: -7,
    scale: 1.0
  },
  {
    id: 'hero-10',
    title: 'Grand Awards & Recognition',
    subtitle: 'Celebrating breakthroughs and team excellence',
    category: 'conclave',
    meta: 'Closing Ceremony',
    imageUrl: '/images/conclave/dataconclave1.JPG',
    scatterX: 38,
    scatterY: 24,
    scatterRotate: 9,
    scale: 0.95
  },
  {
    id: 'hero-11',
    title: 'Matrix Factorization Lab',
    subtitle: 'Dimensionality reduction exploration',
    category: 'datathon',
    meta: 'Research Cluster',
    imageUrl: '/images/conclave/dataconclave2.JPG',
    scatterX: -26,
    scatterY: 15,
    scatterRotate: -5,
    scale: 1.0
  },
  {
    id: 'hero-12',
    title: 'Future of Foundational Models',
    subtitle: 'Keynote discourse on multi-modal reasoning',
    category: 'conclave',
    meta: 'Keynote Track B',
    imageUrl: '/images/conclave/dataconclave3.JPG',
    scatterX: 14,
    scatterY: -15,
    scatterRotate: 6,
    scale: 0.98
  },
  {
    id: 'hero-13',
    title: 'Algorithmic Fairness Workshop',
    subtitle: 'Auditing bias in training distributions',
    category: 'workshop',
    meta: 'Seminar Room 04',
    imageUrl: '/images/conclave/dataconclave4.JPG',
    scatterX: -15,
    scatterY: -18,
    scatterRotate: 4,
    scale: 1.0
  },
  {
    id: 'hero-14',
    title: 'Data Visualisation Exhibit',
    subtitle: 'Generative and interactive visual installations',
    category: 'archive',
    meta: 'Gallery Pavilion',
    imageUrl: '/images/conclave/dataconclave5.JPG',
    scatterX: 25,
    scatterY: 10,
    scatterRotate: -8,
    scale: 0.95
  },
  {
    id: 'hero-15',
    title: 'Closing Plenary Discussion',
    subtitle: 'Connecting classroom theory with industry reality',
    category: 'conclave',
    meta: 'Executive Stage',
    imageUrl: '/images/conclave/dataconclave6.JPG',
    scatterX: 0,
    scatterY: 20,
    scatterRotate: 3,
    scale: 1.0
  }
];

export const FULL_ARCHIVE_GRID: GalleryItem[] = HERO_GALLERY_CARDS;

// Exactly 9 Photos for Chapter 01 (Datathon)
export const CHAPTER_01_GALLERY: GalleryItem[] = [
  {
    id: 'dt-1',
    title: 'Pipeline Architecture Debate',
    subtitle: 'Selecting between gradient boosting and neural ensembles',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon1.JPG',
    meta: 'Team 09 // Ideation'
  },
  {
    id: 'dt-2',
    title: 'Cluster GPU Compute Lab',
    subtitle: 'Parallel hyperparameter tuning across distributed nodes',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon2.JPG',
    meta: 'Node 04 // Peak Compute'
  },
  {
    id: 'dt-3',
    title: 'Midnight Heuristic Ideation',
    subtitle: 'Whiteboarding vector embeddings under time pressure',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon4.JPG',
    meta: 'Breakout Pod B'
  },
  {
    id: 'dt-4',
    title: 'Live Scoreboard Convergence',
    subtitle: 'Real-time leaderboard shifts during final evaluation phase',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon5.JPG',
    meta: 'Evaluation Portal'
  },
  {
    id: 'dt-5',
    title: 'Jury Scrutiny & Q&A',
    subtitle: 'Data scientists reviewing statistical validity and test set leakage',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon6.JPG',
    meta: 'Judges Bench 01'
  },
  {
    id: 'dt-6',
    title: 'Feature Engineering Sprint',
    subtitle: 'Synthesizing composite domain features from sensor time series',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon7.JPG',
    meta: 'Lab Station 08'
  },
  {
    id: 'dt-7',
    title: 'Model Diagnostics Session',
    subtitle: 'Residual analysis and confusion matrix inspections',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon8.JPG',
    meta: 'Cluster Pod 3'
  },
  {
    id: 'dt-8',
    title: 'Collaborative Problem Solving',
    subtitle: 'Interdisciplinary teams dividing mathematical workflows',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon9.JPG',
    meta: 'Workspace Hall C'
  },
  {
    id: 'dt-9',
    title: 'Final Model Serialization',
    subtitle: 'Containerizing inference scripts for submission pipeline',
    category: 'datathon',
    imageUrl: '/images/datathon/datathon10.JPG',
    meta: 'Submission Gateway'
  }
];

// Exactly 9 Photos for Chapter 02 (Conclave)
export const CHAPTER_02_GALLERY: GalleryItem[] = [
  {
    id: 'cc-1',
    title: 'Keynote: Scaled Intelligence',
    subtitle: 'Unpacking compute paradigms and modern inference stacks',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave9.JPG',
    meta: 'Auditorium A'
  },
  {
    id: 'cc-2',
    title: 'Executive Panel on Governance',
    subtitle: 'Balancing velocity with safety in automated decision agents',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave1.JPG',
    meta: 'Plenary Stage'
  },
  {
    id: 'cc-3',
    title: 'Roundtable Career Clinic',
    subtitle: 'Direct resume and technical feedback from staff engineers',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave2.JPG',
    meta: 'Mezzanine Lounge'
  },
  {
    id: 'cc-4',
    title: 'Audience Engagement & Polling',
    subtitle: 'Live sentiment tracking and interactive audience telemetry',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave3.JPG',
    meta: 'Main Tier'
  },
  {
    id: 'cc-5',
    title: 'Technical Demonstration',
    subtitle: 'Live deployment of local quantized agentic workflow',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave4.JPG',
    meta: 'Demo Booth 02'
  },
  {
    id: 'cc-6',
    title: 'Society for Data Science Mixer',
    subtitle: 'Post-conclave collaborative networking and research exchange',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave5.JPG',
    meta: 'Atrium Terrace'
  },
  {
    id: 'cc-7',
    title: 'Frontier AI Architecture Keynote',
    subtitle: 'Deep dive into foundation models and emergent capabilities',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave6.JPG',
    meta: 'Grand Hall'
  },
  {
    id: 'cc-8',
    title: 'Industry Career Roadmap Panel',
    subtitle: 'Data science vs data engineering vs ML infrastructure paths',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave7.JPG',
    meta: 'Seminar Hall 2'
  },
  {
    id: 'cc-9',
    title: 'Fireside Mentorship Dialogue',
    subtitle: 'Navigating certifications, open-source projects, and portfolios',
    category: 'conclave',
    imageUrl: '/images/conclave/dataconclave8.JPG',
    meta: 'Speakers Lounge'
  }
];

// CHAPTER 01: DATATHON
// Description trimmed to exactly 52 words (matching 50-60 words max rule)
export const CHAPTER_01_DATA: ChapterData = {
  id: 'chapter-01',
  badge: 'CHAPTER 01',
  title: 'DATATHON',
  tagline: 'Where the data becomes a challenge.',
  description:
    'Step into Chapter 01 of ANALYTRIX, where real-world datasets meet rigorous analytical problem solving. Students collaborate in intensive sprints to explore messy telemetry, extract actionable patterns, and engineer resilient predictive models under deadlines. Experience firsthand how data-driven challenges move beyond classroom theory into tangible, high-impact solutions.',
  highlightWords: ['real-world datasets', 'analytical problem solving', 'predictive models'],
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    caption: 'Datathon Intensive — Analytical Sprint',
    metaBadge: 'CH.01 — DATATHON FLOOR'
  },
  features: [
    {
      id: 'dt-feat-1',
      title: 'Datasets & Exploration',
      iconName: 'database',
      bullets: ['Real-world complex datasets', 'Pattern & trend discovery', 'Telemetry cleaning pipelines']
    },
    {
      id: 'dt-feat-2',
      title: 'Analytical Engineering',
      iconName: 'cpu',
      bullets: ['Hypothesis-driven testing', 'AI & ML toolchains', 'Statistical model validation']
    },
    {
      id: 'dt-feat-3',
      title: 'Collaborative Sprints',
      iconName: 'users',
      bullets: ['Team workflow division', 'Time-bound decision sprints', 'Agile solution architecture']
    },
    {
      id: 'dt-feat-4',
      title: 'Insight Delivery',
      iconName: 'presentation',
      bullets: ['Interactive visualizations', 'Jury technical defense', 'Translating data into decisions']
    }
  ],
  gallery: CHAPTER_01_GALLERY
};

// CHAPTER 02: DATASCIENCE CONCLAVE
// Description trimmed to exactly 53 words (matching 50-60 words max rule)
export const CHAPTER_02_DATA: ChapterData = {
  id: 'chapter-02',
  badge: 'CHAPTER 02',
  title: 'DATASCIENCE CONCLAVE',
  tagline: 'Where the data becomes a direction.',
  description:
    'Chapter 02 takes you into the broader landscape of modern Data Science and AI. Connect directly with industry leaders, examine production architectures, and uncover emerging technical career pathways. Discover essential industry-ready toolsets and gain clear perspective on where data expertise and continuous research can take your professional journey.',
  highlightWords: ['Data Science and AI', 'production architectures', 'career pathways'],
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    caption: 'Conclave Grand Plenary — Keynote Address',
    metaBadge: 'CH.02 — CONCLAVE MAIN STAGE'
  },
  features: [
    {
      id: 'cc-feat-1',
      title: 'Industry Perspectives',
      iconName: 'globe',
      bullets: ['Frontier enterprise insights', 'Petabyte production realities', 'CDO executive keynotes']
    },
    {
      id: 'cc-feat-2',
      title: 'Frontier AI Trends',
      iconName: 'sparkles',
      bullets: ['Foundation model evolution', 'Quantized edge inference', 'Agentic workflow architectures']
    },
    {
      id: 'cc-feat-3',
      title: 'Career Roadmaps',
      iconName: 'compass',
      bullets: ['Ecosystem career navigation', 'Industry-ready skill profiles', 'Portfolio & GitHub roadmaps']
    },
    {
      id: 'cc-feat-4',
      title: 'Dialogue & Direction',
      iconName: 'layers',
      bullets: ['Direct mentor roundtables', 'Practical project guidance', 'Student activity points recognition']
    }
  ],
  gallery: CHAPTER_02_GALLERY
};
