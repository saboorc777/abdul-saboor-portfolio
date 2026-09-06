// ==========================================================================
// PORTFOLIO CONTENT
// Real details pulled from GitHub/LinkedIn/old portfolio where available.
// Items marked TODO should be reviewed and personalized further.
// ==========================================================================

export const personalInfo = {
  name: 'Abdul Saboor',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer & Computer Science student crafting fast, elegant, user-focused web experiences.',
  location: 'Hingorja, Sindh, Pakistan',
  email: 'saboorc.777@gmail.com',
  phone: '+92 327 7099599', // TODO: confirm you're comfortable publishing this publicly
  whatsapp: 'https://wa.me/923277099599',
  github: 'https://github.com/saboorc777',
  linkedin: 'https://www.linkedin.com/in/abdul-saboor-719a34365',
  resumeUrl: '/resume/Abdul-Saboor-CV.pdf', // TODO: drop your latest CV into public/resume/
};

export const stats = [
  { label: 'Projects Built', value: 6 },
  { label: 'Technologies', value: 15 },
  { label: 'Internships', value: 2 },
  { label: 'Certificates', value: 3 },
];

export const skills = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Tailwind', category: 'Frontend' },
  { name: 'C#', category: 'Backend' },
  { name: 'SQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Python', category: 'Language' },
  { name: 'Pandas', category: 'ML' },
  { name: 'NumPy', category: 'ML' },
  { name: 'Scikit-learn', category: 'ML' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
];

export const experience = [
  {
    id: 'exp-1',
    company: 'Core Tech Innovation',
    role: 'Frontend Developer Intern',
    duration: '2025',
    description:
      'Completed a remote internship focused on HTML, CSS and JavaScript, building responsive and modern web interfaces.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'exp-2',
    company: 'DecodeLabs',
    role: 'AI Internship',
    duration: '2025', // TODO: confirm exact dates
    description:
      'Worked on practical machine learning and AI-focused tasks as part of a structured internship program, applying Python-based tooling to real problems.',
    tech: ['Python', 'Machine Learning'],
  },
];

export const education = [
  {
    id: 'edu-1',
    degree: 'BS Computer Science',
    institution: 'QUEST Nawabshah (Quaid-e-Awam University of Engineering, Science & Technology)',
    duration: '2023 — Present',
    description:
      'Pursuing a Bachelor\u2019s degree with a focus on software development, databases and web technologies.',
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'General Store Management System',
    description:
      'Desktop-based inventory management system for retail stores, built with C#, SQL Server and the .NET Framework.',
    category: 'Desktop Application',
    tech: ['C#', 'SQL Server', '.NET'],
    github: 'https://github.com/saboorc777/General-Store-Management',
    live: null,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Car Showroom Management',
    description:
      'A luxury, fully responsive car showroom website built with HTML, CSS and JavaScript.',
    category: 'Frontend',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/saboorc777/Web-Development-Projects',
    live: null,
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Marksheet Generator Application',
    description:
      'Desktop-based marksheet generator for academic institutions, developed with C#, SQL Server and .NET Framework.',
    category: 'Desktop Application',
    tech: ['C#', 'SQL Server', '.NET Framework'],
    github: 'https://github.com/saboorc777/General-Store-Management',
    live: null,
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'AI Resume Analyzer',
    description:
      'Extracts resume content, identifies strengths and weaknesses, and generates personalized recommendations to help job seekers optimize their resumes.',
    category: 'AI Application',
    tech: ['Python', 'CSS', 'PDF Parsing'],
    github: 'https://github.com/saboorc777/Ai-Projects',
    live: null,
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'AI & Machine Learning Projects',
    description:
      'A collection of machine learning models, deep learning experiments, computer vision and NLP projects built for hands-on practice.',
    category: 'AI Application',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    github: 'https://github.com/saboorc777/Ai-Projects',
    live: null,
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Coretech Internship Coursework',
    description:
      'Projects, assignments and learning tasks completed during a frontend development internship at Core Tech Innovation.',
    category: 'Frontend',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/saboorc777/coretech_internship',
    live: null,
    featured: false,
  },
];

export const projectCategories = ['All', 'Frontend', 'Desktop Application', 'AI Application'];

export const certificates = [
  {
    id: 'cert-1',
    title: 'Frontend Development Internship',
    issuer: 'Core Tech Innovation',
    image: null, // TODO: add certificate image to public/certificates/
    fileUrl: null,
  },
  {
    id: 'cert-2',
    title: 'Web Development Competition',
    issuer: 'QUEST Nawabshah',
    image: null,
    fileUrl: null,
  },
  {
    id: 'cert-3',
    title: 'CSET 2025',
    issuer: 'Department of Computer Science, QUEST Nawabshah',
    image: null,
    fileUrl: null,
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];
