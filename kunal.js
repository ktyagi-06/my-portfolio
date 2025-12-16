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
