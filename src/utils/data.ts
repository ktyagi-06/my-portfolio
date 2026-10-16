/* Single source of truth for personal details — edit here, the site updates. */

export const profile = {
  name: "Kunal Tyagi",
  email: "ktyagi0506@gmail.com",
  phone: "+91 9354900424",
  github: "https://github.com/ktyagi-06",
  githubRepos: "https://github.com/ktyagi-06?tab=repositories",
  linkedin: "https://www.linkedin.com/in/kunal-tyagi-b34537314/",
  x: "https://x.com/KunalKtyagi0506",
  resumePdf: "/Kunal_Tyagi_Resume.pdf",
  resumePreview: "/resume-preview.png",
};

export const roles = [
  "Full-stack developer",
  "Machine learning builder",
  "Data analyst",
  "Open-source contributor",
];

export const education = {
  school: "Manipal University Jaipur",
  degree: "Bachelor of Technology, Computer Science and Engineering (Core)",
  period: "Oct 2024 – May 2028",
  cgpa: "7.5 (as of 4th semester)",
  coursework: [
    "OOP",
    "DSA",
    "Operating Systems",
    "Computer Architecture",
    "Computer Networks",
    "DBMS",
    "High Performance Computing",
  ],
};

export const experiences = [
  {
    company: "Elite Coders",
    role: "Open Source Contributor",
    period: "Jun 2026 – Aug 2026",
    place: "Remote",
    points: [
      "Fixed bugs, improved documentation and built new features in open-source repositories under maintainer guidance.",
      "Wrote clean, documented code and took part in peer code reviews to keep projects maintainable.",
    ],
  },
  {
    company: "Future Interns",
    role: "Full Stack Web Development Intern",
    period: "Mar 2026 – Apr 2026",
    place: "Remote",
    points: [
      "Built full-stack features that connect a frontend to backend services.",
      "Applied APIs, databases and responsive UI design to real tasks.",
      "Worked in a remote team using structured development practices.",
    ],
  },
];

export const research = {
  title: "AI in Healthcare — IEEE research paper (in progress)",
  text: "Synthetic Clinical Data Generation Using AI: A Privacy-Preserving Approach for Medical Research.",
};

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "C++", "C", "SQL", "JavaScript"],
  },
  {
    title: "Web development",
    items: ["React", "Next.js", "Node.js", "Express", "MongoDB", "HTML", "CSS", "Tailwind CSS", "FastAPI"],
  },
  {
    title: "Data and machine learning",
    items: ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn", "EDA", "Regression analysis", "Streamlit"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },
];


/* kept for any older imports */
export const skills = skillGroups.flatMap((g) => g.items);
