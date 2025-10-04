// --- コーチ20名データ ---
const coaches = [
  {id:1,  name:"佐藤 一郎", skill:"ドライバー／アプローチ", price:"60分 ¥3,000〜", coords:[35.68,139.76], img:"https://randomuser.me/api/portraits/men/31.jpg"},
  {id:2,  name:"高橋 次郎", skill:"パター／初心者指導",     price:"60分 ¥4,000〜", coords:[34.69,135.50], img:"https://randomuser.me/api/portraits/men/32.jpg"},
  {id:3,  name:"鈴木 太郎", skill:"アイアン精度",           price:"60分 ¥3,500〜", coords:[35.17,136.91], img:"https://randomuser.me/api/portraits/men/33.jpg"},
  {id:4,  name:"田中 花子", skill:"飛距離アップ",           price:"60分 ¥5,000〜", coords:[43.06,141.35], img:"https://randomuser.me/api/portraits/women/44.jpg"},
  {id:5,  name:"伊藤 健",   skill:"バンカー／ラフ対策",     price:"60分 ¥3,800〜", coords:[33.59,130.40], img:"https://randomuser.me/api/portraits/men/34.jpg"},
  {id:6,  name:"渡辺 真",   skill:"スイング基礎",           price:"60分 ¥3,200〜", coords:[34.69,135.20], img:"https://randomuser.me/api/portraits/men/35.jpg"},
  {id:7,  name:"山本 美咲", skill:"アプローチ",             price:"60分 ¥4,200〜", coords:[35.02,135.75], img:"https://randomuser.me/api/portraits/women/45.jpg"},
  {id:8,  name:"中村 亮",   skill:"パット矯正",             price:"60分 ¥3,600〜", coords:[38.26,140.87], img:"https://randomuser.me/api/portraits/men/36.jpg"},
  {id:9,  name:"小林 涼",   skill:"ラウンド戦略",           price:"60分 ¥5,500〜", coords:[34.69,135.18], img:"https://randomuser.me/api/portraits/men/37.jpg"},
  {id:10, name:"加藤 由美", skill:"フォーム解析",           price:"60分 ¥4,800〜", coords:[35.61,140.11], img:"https://randomuser.me/api/portraits/women/46.jpg"},
  {id:11, name:"吉田 剛",   skill:"ドライバー安定",         price:"60分 ¥4,000〜", coords:[34.70,135.50], img:"https://randomuser.me/api/portraits/men/38.jpg"},
  {id:12, name:"山田 彩",   skill:"100切り集中",           price:"60分 ¥3,900〜", coords:[33.59,130.35], img:"https://randomuser.me/api/portraits/women/47.jpg"},
  {id:13, name:"佐々木 海", skill:"飛距離＆方向性",         price:"60分 ¥5,200〜", coords:[34.39,132.46], img:"https://randomuser.me/api/portraits/men/39.jpg"},
  {id:14, name:"松本 翔",   skill:"アイアン距離感",         price:"60分 ¥3,700〜", coords:[35.44,139.36], img:"https://randomuser.me/api/portraits/men/40.jpg"},
  {id:15, name:"井上 直",   skill:"パターライン読み",       price:"60分 ¥4,300〜", coords:[36.34,140.45], img:"https://randomuser.me/api/portraits/men/41.jpg"},
  {id:16, name:"木村 さくら", skill:"女性向けやさしい指導", price:"60分 ¥4,600〜", coords:[35.02,135.76], img:"https://randomuser.me/api/portraits/women/48.jpg"},
  {id:17, name:"林 大輔",   skill:"メンタル強化",           price:"60分 ¥4,000〜", coords:[34.70,135.50], img:"https://randomuser.me/api/portraits/men/42.jpg"},
  {id:18, name:"清水 華",   skill:"スコアメイク術",         price:"60分 ¥4,900〜", coords:[43.77,142.36], img:"https://randomuser.me/api/portraits/women/49.jpg"},
  {id:19, name:"森田 蒼",   skill:"スライス矯正",           price:"60分 ¥3,400〜", coords:[34.68,135.83], img:"https://randomuser.me/api/portraits/men/43.jpg"},
  {id:20, name:"橋本 純",   skill:"効率練習メニュー",       price:"60分 ¥3,300〜", coords:[35.18,136.91], img:"https://randomuser.me/api/portraits/men/44.jpg"},
];

// --- マップ初期化 ---
const map = L.map('map', { zoomControl: true }).setView([36.2, 138.2], 5.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18, attribution: '© OpenStreetMap contributors'
}).addTo(map);

// --- ピン追加（吹き出しは1枚に統一） ---
coaches.forEach(c => {
  const m = L.marker(c.coords).addTo(map);
  const popupHtml = `
    <div class="popup-bubble" onclick="showDetail(${c.id})">
      <div class="popup-inner">
        <img src="${c.img}" alt="${c.name}" />
        <div class="popup-text">${c.name}</div>
      </div>
      <div class="popup-arrow"></div>
    </div>
  `;
  m.bindPopup(popupHtml, { closeButton:false, offset:[0,-16] });
});

// --- グリッド生成 ---
const grid = document.getElementById('coachGrid');
coaches.forEach(c => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="row">
      <img src="${c.img}" alt="${c.name}" />
      <div>
        <h4>${c.name}</h4>
        <p>${c.skill}</p>
      </div>
    </div>
    <p>料金：${c.price}</p>
  `;
  card.addEventListener('click', () => {
    map.setView(c.coords, 11, { animate:true });
    // ピンのポップアップを開くには一旦一時マーカーを生成しないといけないため、
    // ここでは近くに小さなポップアップだけ開く
    L.popup({offset:[0,-8], closeButton:false})
      .setLatLng(c.coords)
      .setContent(`<div class="popup-bubble" onclick="showDetail(${c.id})">
        <div class="popup-inner">
          <img src="${c.img}" alt="${c.name}" />
          <div class="popup-text">${c.name}</div>
        </div>
        <div class="popup-arrow"></div>
      </div>`).openOn(map);
  });
  grid.appendChild(card);
});

// --- 詳細モーダル ---
const modal = document.getElementById('coachDetailModal');
const closeBtn = document.getElementById('closeModal');

window.showDetail = (id) => {
  const c = coaches.find(x => x.id === id);
  if (!c) return;
  document.getElementById('coachImg').src = c.img;
  document.getElementById('coachName').textContent = c.name;
  document.getElementById('coachSkill').textContent = "得意：" + c.skill;
  document.getElementById('coachPrice').textContent = "料金：" + c.price;
  modal.style.display = 'flex';
};

closeBtn.addEventListener('click',()=> modal.style.display='none');
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.style.display='none'; });
