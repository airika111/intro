/* script.js
   Eesti kommentaarid: väiksed interaktsioonid (mobiilmenüü, vormi käsitlemine ja aktiivse lehe markeerimine).
*/

/* DOM valmisoleku oote */
document.addEventListener('DOMContentLoaded', function () {
  // Mobiilmenüü nupp ja nav
  var mobileBtn = document.getElementById('mobile-menu-button');
  var mainNav = document.getElementById('main-nav');

  mobileBtn.addEventListener('click', function () {
    // Toggle nav nähtavust väiksemal ekraanil
    var expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    if (mainNav.style.display === 'block') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'block';
    }
  });

  // Lihtne nav-link aktiivse staatuse haldamine (visuaalne tagasiside)
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Prevent default link behaviour for demo; eemalda kui lingid viivad reaalsetele lehtedele
      e.preventDefault();

      // Eemalda aktiivne klass kõigilt ja lisa klikitud lingile
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      this.classList.add('active');

      // Kerime pealkirja juurde kui see on sama lehe sees (näiteks Kontakt)
      var target = this.getAttribute('href');
      if (target && target.startsWith('#')) {
        var el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


function changeImage(el) {
      document.getElementById('mainImage').src = el.dataset.large;

      document.querySelectorAll('.thumbnails img')
        .forEach(img => img.classList.remove('active'));

      el.classList.add('active');
    }

  // Aseta jooksva aasta jalusesse (üldine)
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
