/* =========================
   THEME TOGGLE (WITH MEMORY)
========================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================
   FOOTER YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* =========================
   TYPING TAGLINE EFFECT
========================= */

const roles = [
  "ML Enthusiast",
  "Full Stack Developer",
  "AIML Engineer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const tag = document.getElementById("dynamic-tag");

function typeRole() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    tag.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1200);
      return;
    }
  } else {
    tag.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 60 : 100);
}

typeRole();

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

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
