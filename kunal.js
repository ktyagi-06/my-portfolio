// Dynamic tagline switcher
(function(){
  const tagEl = document.getElementById('dynamic-tag');
  const cursor = document.querySelector('.cursor');
  const taglines = ['ML Enthusiast','Full Stack Developer'];
  let idx = 0;
  let char = 0;
  let deleting = false;
  const typeSpeed = 90;
  const pauseAfter = 1200;

  function tick(){
    const full = taglines[idx];
    if(!deleting){
      tagEl.textContent = full.slice(0, char+1);
      char++;
      if(char === full.length){
        deleting = true;
        setTimeout(tick, pauseAfter);
        return;
      }
    } else {
      tagEl.textContent = full.slice(0, char-1);
      char--;
      if(char === 0){
        deleting = false;
        idx = (idx+1) % taglines.length;
      }
    }
    setTimeout(tick, deleting ? typeSpeed/2 : typeSpeed);
  }

  // Blink cursor
  setInterval(()=>{ cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0'; },500);

  // Kick off
  if(tagEl) tick();

  // footer year
  const y = new Date().getFullYear();
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = y;
})();
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
