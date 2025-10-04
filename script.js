
const coaches = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ["佐藤一郎","高橋次郎","鈴木太郎","田中花子","中村健","山本玲奈","小林修","加藤真由","渡辺拓也","伊藤優","清水和也","松本茜","斎藤翼","林真央","山田涼介","佐々木優奈","原健太","石井未来","岡本翔","森田麻衣"][i],
  skill: ["ドライバー／アプローチ","パター／初心者指導","アイアン精度","飛距離アップ","バンカー脱出","方向安定","スイング矯正","ラウンド戦略","初心者対応","トラブルショット","アプローチ特訓","スコア管理","フォーム分析","リズム改善","メンタル強化","女性向け指導","飛距離アップ","安定スイング","コース攻略","実践ラウンド"][i],
  price60: "¥3,000",
  price90: "¥5,000",
  lat: 33 + Math.random() * 8,
  lng: 130 + Math.random() * 10,
  img: `https://randomuser.me/api/portraits/${i % 2 ? "men" : "women"}/${i + 20}.jpg`,
  rating: (4 + Math.random()).toFixed(1),
  desc: "楽しく分かりやすいレッスンを提供しています。",
  reviews: ["丁寧で分かりやすい！", "的確なアドバイスで上達しました。"],
  location: "近郊のゴルフ練習場で活動中"
}));

function initMap() {
  const map = L.map("map").setView([36.2, 138.3], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  coaches.forEach(coach => {
    const marker = L.marker([coach.lat, coach.lng]).addTo(map);
    const popupContent = `
      <div style='text-align:center;cursor:pointer;' onclick="window.location.href='coach.html?id=${coach.id}'">
        <img src='${coach.img}' style='width:60px;height:60px;border-radius:50%;object-fit:cover;margin-bottom:5px;'>
        <div style='font-weight:bold;color:#036857;'>${coach.name}</div>
      </div>`;
    marker.bindPopup(popupContent);
  });
}

function renderCoachList() {
  const grid = document.getElementById("coachGrid");
  grid.innerHTML = coaches.map(c => `
    <div class="card" onclick="window.location.href='coach.html?id=${c.id}'">
      <img src="${c.img}" alt="${c.name}">
      <h4>${c.name}</h4>
      <p>${c.skill}</p>
      <p>${c.price60}〜</p>
    </div>
  `).join("");
}

function renderCoachDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const c = coaches.find(coach => coach.id === id);
  if (!c) return;

  document.getElementById("coachDetail").innerHTML = `
    <img src="${c.img}" alt="${c.name}">
    <div class="coach-name">${c.name}</div>
    <div class="rating">⭐ ${c.rating}</div>
    <div class="description">${c.desc}</div>

    <div class="plan">
      <p>60分 ${c.price60}</p>
      <p>90分 ${c.price90}</p>
    </div>

    <div class="review">
      <h3>レビュー</h3>
      ${c.reviews.map(r => `<p>${r}</p>`).join("")}
      <img src="https://picsum.photos/400/200?random=${c.id}" alt="lesson">
    </div>

    <p><strong>このコーチは主に${c.location}</strong></p>

    <button class="reserve-btn">このコーチを予約する</button>
    <a href="index.html" class="back-link">← 一覧に戻る</a>
  `;
}
