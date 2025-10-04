let map, openPopup=null;

function initMap(){
  map = L.map('map').setView([36.2,138.3],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors' }).addTo(map);
  coaches.forEach(c=>{
    const marker = L.marker([c.lat,c.lng]).addTo(map);
    marker.on('click', ()=> openCoachPopup(c, marker.getLatLng()));
  });

  // listen for popup open (attach click for modal)
  map.on('popupopen', (e)=>{
    const el = e.popup.getElement();
    const card = el?.querySelector('.popup-card');
    if(card){
      card.addEventListener('click', ()=>{
        const id = Number(card.dataset.id);
        const c = coaches.find(x=>x.id===id);
        if(c) openModal(c);
      }, { once:true });
    }
  });
}

function openCoachPopup(c, latlng){
  const html = `
    <div class="popup-card" data-id="${c.id}">
      <img src="${c.img}" alt="${c.name}" />
      <p class="name">${c.name}</p>
    </div>`;
  if(openPopup) map.closePopup(openPopup);
  openPopup = L.popup({ className:'clean-popup', closeButton:false, autoClose:true })
    .setLatLng(latlng).setContent(html).openOn(map);
}

function renderCoachList(){
  const grid = document.getElementById('coachGrid');
  grid.innerHTML = coaches.map(c => `
    <div class="card" data-id="${c.id}">
      <div class="row">
        <img src="${c.img}" alt="${c.name}" />
        <div>
          <h4>${c.name}</h4>
          <p>${c.skill}</p>
          <p><strong>${c.price60}</strong>〜</p>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = Number(card.dataset.id);
      const c = coaches.find(x=>x.id===id);
      if(c) openModal(c);
    });
  });
}

// modal
const modal = (()=>{
  const root = document.getElementById('coachModal');
  const closeBtn = document.getElementById('modalClose');
  const close = ()=>{ root.style.display='none'; root.setAttribute('aria-hidden','true'); document.getElementById('mYoutube').src='' };
  closeBtn.addEventListener('click', close);
  root.addEventListener('click', (e)=>{ if(e.target===root) close(); });
  return { open:()=>{ root.style.display='flex'; root.setAttribute('aria-hidden','false'); }, close };
})();

function openModal(c){
  document.getElementById('mPhoto').src = c.img;
  document.getElementById('mName').textContent = c.name;
  document.getElementById('mStar').textContent = c.rating;
  document.getElementById('mSkill').textContent = `得意分野：${c.skill}`;
  document.getElementById('mPrice60').textContent = c.price60;
  document.getElementById('mPrice90').textContent = c.price90;
  document.getElementById('mYoutube').src = c.yt + '?rel=0&modestbranding=1';
  modal.open();
}

document.addEventListener('DOMContentLoaded', ()=>{
  initMap();
  renderCoachList();
});
