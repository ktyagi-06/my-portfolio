// script.js
// Handles dynamic subtitle rotation (typewriter effect) and removal of "My Portfolio" project card(s)

(function () {
  const phrases = ["Full Stack Developer", "ML Enthusiast"];
  const typingSpeed = 60;     // ms per character
  const deletingSpeed = 40;   // ms per character when deleting
  const holdDelay = 1300;     // how long to hold the phrase before deleting
  let current = 0; // index of current phrase

  function typewriter(el, cursorEl, phrase, cb) {
    let i = 0;
    function type() {
      if (i <= phrase.length) {
        el.textContent = phrase.slice(0, i);
        i++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => deleteText(), holdDelay);
      }
    }
    function deleteText() {
      if (i >= 0) {
        el.textContent = phrase.slice(0, i);
        i--;
        setTimeout(deleteText, deletingSpeed);
      } else {
        cb && cb();
      }
    }
    type();
  }

  function startLoop() {
    const el = document.getElementById("subtitle");
    const cursorEl = document.getElementById("subtitle-cursor");
    if (!el) return;
    function next() {
      typewriter(el, cursorEl, phrases[current], () => {
        current = (current + 1) % phrases.length;
        setTimeout(next, 300);
      });
    }
    next();
  }

  // Remove any project entries that match "My Portfolio" (case-insensitive)
  function removeMyPortfolioProject() {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;
    // search inside project grid for nodes that look like project cards
    const candidates = projectsSection.querySelectorAll('*');
    const needle = "my portfolio";
    candidates.forEach(node => {
      try {
        const text = (node.textContent || "").trim().toLowerCase();
        if (!text) return;
        if (text.includes(needle)) {
          // prefer removing a containing project-card or article element if present
          const card = node.closest('.project-card') || node.closest('article') || node.closest('li') || node;
          if (card && card.parentNode) {
            card.parentNode.removeChild(card);
            // also remove any empty container wrappers if they become empty
            const parent = card.parentNode;
            if (parent && parent.childElementCount === 0 && parent.id !== 'projects-grid') {
              parent.remove();
            }
          }
        }
      } catch (e) {
        // ignore nodes that trigger errors
      }
    });
  }

  // Small reveal for hero content once loaded
  function revealHero() {
    const hero = document.querySelector('#home .text-center');
    if (!hero) return;
    hero.classList.add('hero-fade-in');
    requestAnimationFrame(() => {
      // allow CSS transition to run
      setTimeout(() => hero.classList.add('visible'), 40);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Start subtitle rotation
    startLoop();
    // Remove portfolio project(s)
    removeMyPortfolioProject();
    // Reveal hero
    revealHero();
  });

})();
