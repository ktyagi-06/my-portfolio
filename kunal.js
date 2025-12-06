// UI utilities and interactions: smooth scrolling, header behavior, and project modal

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // If it's a link to the same page
    if (this.hash) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Header background toggle on scroll for better contrast
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add('bg-gray-900/95', 'backdrop-blur-sm');
  } else {
    header.classList.remove('bg-gray-900/95', 'backdrop-blur-sm');
  }
});

// Project modal logic
(function(){
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalRepo = document.getElementById('modal-repo');
  const modalDemo = document.getElementById('modal-demo');
  const modalClose = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');

  function openModalFromCard(card) {
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    const tech = (card.dataset.tech || '').split(',').map(s => s.trim()).filter(Boolean);
    const repo = card.dataset.repo || '#';
    const demo = card.dataset.demo || '';

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTech.innerHTML = tech.map(t => `<span class="tag">${t}</span>`).join(' ');
    modalRepo.href = repo;
    modalRepo.setAttribute('target', '_blank');

    if (demo) {
      modalDemo.href = demo;
      modalDemo.style.display = 'inline-block';
      modalDemo.setAttribute('target', '_blank');
    } else {
      modalDemo.style.display = 'none';
    }

    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // focus trap: focus the close button
    modalClose?.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Attach event listeners to "Details" buttons on project cards
  document.querySelectorAll('.project-card').forEach(card => {
    const detailsBtn = card.querySelector('.btn-details');
    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => openModalFromCard(card));
    }
    // Open on Enter when card focused
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openModalFromCard(card);
      }
    });
  });

  // Close behavior
  modalClose?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();


// Initialize simple scroll-in animation for elements already present
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .skill-tag, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    observer.observe(el);
  });
});
