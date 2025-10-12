let map, openedPopup=null;

function initMap(){
  // 日本の中心に固定
  map = L.map('map').setView([36.2048, 138.2529], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  window.mapInstance = map;

  // ピンとポップアップ
  window.COACHES.forEach(c => {
    const marker = L.marker([c.lat, c.lng]).addTo(map);
    const popupHtml = `
      <div class="popup-card" data-id="${c.id}" style="cursor:pointer">
        <img src="${c.img}" alt="${c.name}" />
        <div>
          <div class="popup-name">${c.name}</div>
          <div class="small">${c.city}</div>
        </div>
      </div>`;

    marker.on('click', () => {
      if (openedPopup) map.closePopup(openedPopup);
      openedPopup = L.popup({ closeButton:false, autoPan:true })
        .setLatLng([c.lat, c.lng])
        .setContent(popupHtml)
        .openOn(map);
    });
  });

  // ポップアップをクリック → モーダル
  map.on('popupopen', (e) => {
    const el = e.popup.getElement();
    const box = el?.querySelector('.popup-card');
    if (!box) return;
    const id = Number(box.dataset.id);
    box.addEventListener('click', () => openModal(id), { once:true });
  });
}

function renderGrid(){
  const grid = document.getElementById('coachGrid');
  grid.innerHTML = window.COACHES.map(c => `
    <div class="card" data-id="${c.id}">
      <div class="row">
        <img src="${c.img}" alt="${c.name}" />
        <div>
          <h4>${c.name}</h4>
          <p>${c.city}｜得意クラブ：${c.club}</p>
          <p class="price">60分 ${c.price}</p>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      openModal(id);
    });
  });
}

// --- モーダル制御（得意クラブ＋金額のみ表示、詳細へ導線） ---
const modalEl = document.getElementById('coachModal');
const closeBtn = document.getElementById('modalClose');
const photoEl = document.getElementById('mPhoto');
const nameEl = document.getElementById('mName');
const clubEl = document.getElementById('mClub');
const priceEl = document.getElementById('mPrice');
const moreBtn = document.getElementById('moreBtn');

function openModal(id){
  const c = window.COACHES.find(x => x.id === id);
  if (!c) return;
  photoEl.src = c.img;
  nameEl.textContent = c.name;
  clubEl.textContent = `得意クラブ：${c.club}`;
  priceEl.textContent = `料金：60分 ${c.price}`;
  moreBtn.onclick = () => { window.location.href = `coach.html?id=${c.id}`; };
  modalEl.style.display = 'flex';
  modalEl.setAttribute('aria-hidden', 'false');
}
function closeModal(){
  modalEl.style.display = 'none';
  modalEl.setAttribute('aria-hidden', 'true');
}
closeBtn.addEventListener('click', closeModal);
modalEl.addEventListener('click', (e) => { if(e.target === modalEl) closeModal(); });

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderGrid();
});
document.addEventListener("DOMContentLoaded", () => {
  const notifyBtn = document.getElementById("notifyBtn");
  const notifyList = document.getElementById("notifyList");

  notifyBtn.addEventListener("click", () => {
    notifyList.style.display =
      notifyList.style.display === "block" ? "none" : "block";
  });

  // 仮のメッセージ（あとでlocalStorage対応可能）
  const messages = [
    "📅 明日のレッスンは9:00開始です！",
    "⭐ 佐藤コーチからレビュー返信があります",
  ];

  if (messages.length > 0) {
    notifyList.innerHTML = messages
      .map((m) => `<p>${m}</p>`)
      .join("<hr style='border:none;border-top:1px solid #ddd;'>");
  }
});
