// menu, theme, reveal
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('theme-toggle');
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Load saved theme or prefer dark by default
  const saved = localStorage.getItem('theme');
  const initial = saved || 'dark';
  body.setAttribute('data-theme', initial);
  updateThemeIcon(initial);

  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      const cur = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme){
    if(!themeBtn) return;
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
  }

  // mobile burger
  if(burger){
    burger.addEventListener('click', () => {
      if(!mobileMenu) return;
      mobileMenu.classList.toggle('open');
      if(mobileMenu.classList.contains('open')){
        mobileMenu.style.display = 'flex';
      } else {
        mobileMenu.style.display = '';
      }
    });
  }

  // close mobile menu on link click
  document.querySelectorAll('#mobileMenu a').forEach(a=>{
    a.addEventListener('click', ()=> {
      if(mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.style.display=''; }
    });
  });

  // Reveal on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
