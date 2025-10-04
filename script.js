(function(){
  const coaches = window.COACHES || [];
  document.getElementById('coachCount').textContent = coaches.length;

  // 地図初期化
  const map = L.map('map', {scrollWheelZoom: true}).setView([35.6812, 139.7671], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Leaflet | © OpenStreetMap contributors'
  }).addTo(map);

  // 吹き出しを一つだけ表示するための参照
  let openedPopup = null;

  // ピン追加
  coaches.forEach((c) => {
    const marker = L.marker([c.lat, c.lng]).addTo(map);
    const popupHtml = `
      <a class="popup-card" href="coach.html?id=${c.id}" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:10px;">
        <img src="${c.img}" alt="${c.name}" />
        <div>
          <div class="popup-name">${c.name}</div>
          <div class="small">${c.skill}</div>
        </div>
      </a>`;
    marker.on('click', () => {
      if (openedPopup) { map.closePopup(openedPopup); openedPopup = null; }
      openedPopup = L.popup({ closeButton: false, autoPan:true })
        .setLatLng([c.lat, c.lng])
        .setContent(popupHtml)
        .openOn(map);
    });
  });

  // 一覧描画
  const grid = document.getElementById('coachGrid');
  grid.innerHTML = coaches.map(c => `
    <article class="coach-card" data-id="${c.id}">
      <div class="row">
        <img class="avatar" src="${c.img}" alt="${c.name}"/>
        <div class="info">
          <div class="name">${c.name}</div>
          <div class="skill">${c.skill}</div>
          <div class="price">60分 ¥${c.price.toLocaleString()}〜</div>
        </div>
      </div>
    </article>
  `).join('');

  // カードクリックでモーダル表示
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.coach-card');
    if(!card) return;
    const id = Number(card.dataset.id);
    openModal(id);
  });

  // モーダル関連
  const modal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  function openModal(id){
    const c = coaches.find(x => x.id === id);
    if(!c) return;
    modalBody.innerHTML = `
      <div class="modal__media">
        <img src="${c.img}" alt="${c.name}" />
        <iframe width="100%" height="260" src="${c.yt}" title="YouTube video player"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
      <div class="modal__info">
        <h3 class="modal__title" id="modalTitle">${c.name}</h3>
        <div style="margin-bottom:8px;">
          <span class="badge">⭐ ${c.rating.toFixed(1)}</span>
          <span class="badge">${c.skill}</span>
        </div>
        <p>得意分野：${c.skill}</p>
        <p>料金：<b>60分 ¥${c.price.toLocaleString()}</b> ／ <b>90分 ¥${(c.price*1.6|0).toLocaleString()}</b></p>
        <button class="btn-primary" onclick="location.href='coach.html?id=${c.id}'">このコーチを予約する</button>
        <p class="small">※練習場利用料は別途現地払いとなります</p>
      </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });
  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
})();