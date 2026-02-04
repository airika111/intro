// app.js — kompaktne ja turvaline (asenda oma olemasolevaga)

document.addEventListener('DOMContentLoaded', () => {
  // --- mobiilimenüü ja nav ---
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mainNav = document.getElementById('main-nav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks.length) {
    navLinks.forEach(link =>
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      })
    );
  }

  // aasta element (kui kasutad)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // thumbnail → suur pilt (kui kasutad)
  window.changeImage = el => {
    const main = document.getElementById('mainImage');
    if (!main || !el) return;
    main.src = el.dataset.large || el.src || main.src;
    document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
    el.classList.add('active');
  };

  // ===== INTRO TAUSTA PILTIDE VAHETUS =====
  const introImages = [
    "Pildid/taust1.jpg",
    "Pildid/taust2.png",
    "Pildid/taust3.jpg"
  ];

  const bgLayers = Array.from(document.querySelectorAll(".intro_bg"));
  if (bgLayers.length < 2) {
    console.warn("Intro: ootan vähemalt kahte .intro_bg elementi — kontrolli HTML-i.");
    return;
  }

  const preload = url => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({url, ok:true});
    img.onerror = () => resolve({url, ok:false});
    img.src = url;
  });

  // seadista esialgsed taustad
  let current = 0;
  bgLayers[0].style.backgroundImage = `url('${introImages[0]}')`;
  bgLayers[0].classList.add('active');
  bgLayers[1].style.backgroundImage = `url('${introImages[1] || introImages[0]}')`;

  // eel-laadi ja logi vigasid (valikuline)
  Promise.all(introImages.map(preload)).then(results => {
    results.forEach(r => { if(!r.ok) console.warn("Intro: ei laadinud pilt:", r.url); });
  });

  let top = 0;
  const holdMs = 5000;

  const swap = async () => {
    const next = (current + 1) % introImages.length;
    const idle = bgLayers[1 - top];
    const active = bgLayers[top];

    await preload(introImages[next]);
    idle.style.backgroundImage = `url('${introImages[next]}')`;

    idle.classList.add('active');
    active.classList.remove('active');

    top = 1 - top;
    current = next;
  };

  let timer = setInterval(swap, holdMs);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
      timer = null;
    } else if (!timer) {
      timer = setInterval(swap, holdMs);
    }
  });
}); // DOMContentLoaded lõpp
