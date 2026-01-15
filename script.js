// SPA navigation
const links = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('main section');
const hamburger = document.querySelector('.hamburger');
const menuEl = document.getElementById('menu');


function showSection(id){
sections.forEach(s => s.classList.toggle('active', s.id === id));
links.forEach(a => a.classList.toggle('active', a.dataset.target === id));
history.replaceState(null, '', '#'+id);
}


links.forEach(a => a.addEventListener('click', e => {
e.preventDefault();
const t = a.dataset.target;
showSection(t);
if(window.innerWidth <= 900){ menuEl.style.display='none'; hamburger.setAttribute('aria-expanded','false'); }
}));


// open correct section based on hash
const initial = location.hash ? location.hash.replace('#','') : 'about';
showSection(initial);


hamburger.addEventListener('click', ()=>{
const expanded = hamburger.getAttribute('aria-expanded') === 'true';
hamburger.setAttribute('aria-expanded', String(!expanded));
menuEl.style.display = expanded ? 'none' : 'flex';
menuEl.style.flexDirection = 'column';
menuEl.style.position = 'absolute';
menuEl.style.right = '18px';
menuEl.style.top = '68px';
menuEl.style.background = 'white';
menuEl.style.padding = '10px';
menuEl.style.boxShadow = '0 6px 18px rgba(2,6,23,0.08)';
menuEl.style.borderRadius = '10px';
});


// notes save
const saveBtn = document.getElementById('save-note');
if(saveBtn){
saveBtn.addEventListener('click', ()=>{
const txt = document.getElementById('note').value;
localStorage.setItem('mart_note', txt);
alert('Märkus salvestatud kohalikku brauserisse.');
});
}


// restore note
document.addEventListener('DOMContentLoaded', ()=>{
const n = localStorage.getItem('mart_note');
if(n) document.getElementById('note').value = n;


// download-cv demo
const dl = document.getElementById('download-cv');
if(dl) dl.addEventListener('click', (e)=>{ e.preventDefault(); alert('CV allalaadimine pole hetkel aktiivne — saatke e-kiri mart@example.ee'); });
});
