// ================= THEME TOGGLE =================
document.getElementById('theme-toggle')
  .addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

// ================= DYNAMIC TAGLINE =================
(function () {
  const tagEl = document.getElementById('dynamic-tag');
  const cursor = document.querySelector('.cursor');

  const taglines = [
    'ML Enthusiast',
    'Full Stack Developer',
    'AIML Engineer'
  ];

  let idx = 0, char = 0, deleting = false;

  function typeEffect() {
    const word = taglines[idx];

    if (!deleting) {
      tagEl.textContent = word.slice(0, ++char);
      if (char === word.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      tagEl.textContent = word.slice(0, --char);
      if (char === 0) {
        deleting = false;
        idx = (idx + 1) % taglines.length;
      }
    }
    setTimeout(typeEffect, deleting ? 50 : 90);
  }

  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 500);

  typeEffect();

  document.getElementById('year').textContent = new Date().getFullYear();
})();
document.getElementById("year").textContent =
  new Date().getFullYear();
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
const roles = [
  "ML Enthusiast",
  "Full Stack Developer",
  "AIML Engineer",
  "Problem Solver"
];

let i = 0;
let j = 0;
let isDeleting = false;
const tag = document.getElementById("dynamic-tag");

function typeEffect() {
  const current = roles[i];

  if (!isDeleting) {
    tag.textContent = current.slice(0, j++);
    if (j > current.length) isDeleting = true;
  } else {
    tag.textContent = current.slice(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }
  }
}

setInterval(typeEffect, 120);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll("section, .project-card")
  .forEach(el => observer.observe(el));
