let map, openedPopup=null;

function initMap(){
  // 日本の中心に固定
  map = L.map('map').setView([36.2048, 138.2529], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  // グローバルにマップを登録（検索処理から参照できるようにする）
window.mapInstance = map;
window.markers = []; // 全マーカーを格納
  window.mapInstance = map;

  // ピンとポップアップ
window.markers = []; // ← 念のため初期化

window.COACHES.forEach(c => {
  const marker = L.marker([c.lat, c.lng]).addTo(map);
  const popupHtml = `
    <div class="popup-card" data-id="${c.id}">
      <img src="${c.img}" alt="${c.name}">
      <div>
        <div class="popup-name">${c.name}</div>
        <div class="small">${c.city}｜${c.club}</div>
      </div>
    </div>
  `;
  marker.bindPopup(popupHtml);
  window.markers.push({ marker, coach: c });
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
// ===== 地図絞り込み検索機能 =====
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const nameInput = document.getElementById("searchName");
  const areaSelect = document.getElementById("searchArea");
  const clubSelect = document.getElementById("searchClub");
  const ratingSelect = document.getElementById("searchRating");

  if (!searchBtn || !clearBtn) {
    console.warn("❗検索ボタンまたはクリアボタンが見つかりません");
    return;
  }

  // ✅ 検索ボタン処理
  searchBtn.addEventListener("click", () => {
    console.log("✅ 検索ボタンが押されました");

    const nameVal = nameInput.value.trim();
    const areaVal = areaSelect.value;
    const clubVal = clubSelect.value;
    const ratingVal = ratingSelect ? ratingSelect.value : "";

    console.log("🔍 入力値:", { nameVal, areaVal, clubVal, ratingVal });

    // 🔽 コーチデータ絞り込み
    let filtered = window.COACHES.filter(c => {
      return (
        (!nameVal || c.name.includes(nameVal)) &&
        (!areaVal || c.city === areaVal) &&
        (!clubVal || c.club.includes(clubVal))
      );
    });

    // 🔽 仮のソート（例：ID昇降）
    if (ratingVal === "high") filtered.sort((a, b) => b.id - a.id);
    if (ratingVal === "low") filtered.sort((a, b) => a.id - b.id);

    // ✅ 一覧を更新
    const grid = document.getElementById("coachGrid");
    grid.innerHTML = filtered
      .map(
        c => `
        <div class="coach-card">
          <img src="${c.img}" alt="${c.name}">
          <h3>${c.name}</h3>
          <p>${c.city}｜${c.club}</p>
        </div>`
      )
      .join("");

    // ✅ 地図マーカー更新
    if (window.mapInstance) {
      // 既存マーカー削除
      window.markers.forEach(obj => {
        if (obj.marker) window.mapInstance.removeLayer(obj.marker);
      });
      window.markers = [];

      // 新しいマーカー追加
      filtered.forEach(c => {
        const marker = L.marker([c.lat, c.lng]).addTo(window.mapInstance);
        marker.bindPopup(`<b>${c.name}</b><br>${c.city}｜${c.club}`);
        window.markers.push({ marker, coach: c });
      });
    }

    console.log("✅ 一覧と地図を更新しました");
  });

  // ✅ クリアボタン処理
  clearBtn.addEventListener("click", () => {
    console.log("🧹 クリアボタンが押されました");

    // 入力をリセット
    nameInput.value = "";
    areaSelect.value = "";
    clubSelect.value = "";
    if (ratingSelect) ratingSelect.value = "";

    // 一覧を全件に戻す
    if (typeof renderCoaches === "function") {
      renderCoaches(window.COACHES);
    } else {
      const grid = document.getElementById("coachGrid");
      grid.innerHTML = window.COACHES
        .map(
          c => `
          <div class="coach-card">
            <img src="${c.img}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p>${c.city}｜${c.club}</p>
          </div>`
        )
        .join("");
    }

   // ✅ 地図ピンを全件に戻す
if (window.mapInstance) {
  // 既存マーカー削除
  window.markers.forEach(obj => {
    if (obj.marker) window.mapInstance.removeLayer(obj.marker);
  });
  window.markers = [];

  // 全コーチのマーカーを再追加
  window.COACHES.forEach(c => {
    const marker = L.marker([c.lat, c.lng]).addTo(window.mapInstance);
    marker.bindPopup(`<b>${c.name}</b><br>${c.city}｜${c.club}`);
    window.markers.push({ marker, coach: c });
  });
}

console.log("✅ 全件リセット完了（一覧＋地図）");
});
});
