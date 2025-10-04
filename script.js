// ---- コーチ20名（日本各地に配置） ----
const coaches = [
  {id:1, name:'佐藤 一郎', skill:'ドライバー／アプローチ', price:'60分 ¥3,000〜', coords:[35.68,139.76], img:'https://randomuser.me/api/portraits/men/11.jpg'},
  {id:2, name:'高橋 次郎', skill:'パター／初心者指導', price:'60分 ¥4,000〜', coords:[34.69,135.50], img:'https://randomuser.me/api/portraits/men/12.jpg'},
  {id:3, name:'鈴木 太郎', skill:'アイアン精度', price:'60分 ¥3,500〜', coords:[35.17,136.91], img:'https://randomuser.me/api/portraits/men/13.jpg'},
  {id:4, name:'田中 花子', skill:'飛距離アップ', price:'60分 ¥5,000〜', coords:[43.06,141.35], img:'https://randomuser.me/api/portraits/women/14.jpg'},
  {id:5, name:'伊藤 健', skill:'バンカー／ラフ対策', price:'60分 ¥3,800〜', coords:[33.59,130.40], img:'https://randomuser.me/api/portraits/men/15.jpg'},
  {id:6, name:'渡辺 真', skill:'方向安定', price:'60分 ¥3,600〜', coords:[35.02,135.75], img:'https://randomuser.me/api/portraits/men/16.jpg'},
  {id:7, name:'山本 玲奈', skill:'スイング矯正', price:'60分 ¥3,700〜', coords:[34.70,135.50], img:'https://randomuser.me/api/portraits/women/17.jpg'},
  {id:8, name:'中村 大輔', skill:'ラウンド戦略', price:'60分 ¥3,900〜', coords:[35.45,139.63], img:'https://randomuser.me/api/portraits/men/18.jpg'},
  {id:9, name:'小林 修', skill:'初心者対応', price:'60分 ¥3,300〜', coords:[35.61,140.12], img:'https://randomuser.me/api/portraits/men/19.jpg'},
  {id:10, name:'加藤 真由', skill:'トラブルショット', price:'60分 ¥3,400〜', coords:[35.39,139.44], img:'https://randomuser.me/api/portraits/women/20.jpg'},
  {id:11, name:'岡田 翼', skill:'アプローチ特訓', price:'60分 ¥3,800〜', coords:[34.69,135.18], img:'https://randomuser.me/api/portraits/men/21.jpg'},
  {id:12, name:'清水 和也', skill:'スコア管理', price:'60分 ¥3,900〜', coords:[34.69,135.60], img:'https://randomuser.me/api/portraits/men/22.jpg'},
  {id:13, name:'松本 茜', skill:'フォーム分析', price:'60分 ¥3,600〜', coords:[38.27,140.87], img:'https://randomuser.me/api/portraits/women/23.jpg'},
  {id:14, name:'斎藤 翔', skill:'リズム改善', price:'60分 ¥3,700〜', coords:[34.69,135.19], img:'https://randomuser.me/api/portraits/men/24.jpg'},
  {id:15, name:'山田 涼介', skill:'メンタル強化', price:'60分 ¥4,100〜', coords:[35.68,139.76], img:'https://randomuser.me/api/portraits/men/25.jpg'},
  {id:16, name:'佐々木 優奈', skill:'女性向け指導', price:'60分 ¥3,800〜', coords:[35.02,135.76], img:'https://randomuser.me/api/portraits/women/26.jpg'},
  {id:17, name:'原 健太', skill:'飛距離アップ', price:'60分 ¥3,500〜', coords:[34.70,135.50], img:'https://randomuser.me/api/portraits/men/27.jpg'},
  {id:18, name:'石井 未来', skill:'安定スイング', price:'60分 ¥3,900〜', coords:[35.31,139.55], img:'https://randomuser.me/api/portraits/women/28.jpg'},
  {id:19, name:'岡本 翔', skill:'コース攻略', price:'60分 ¥3,700〜', coords:[34.39,132.46], img:'https://randomuser.me/api/portraits/men/29.jpg'},
  {id:20, name:'森田 麻衣', skill:'実践ラウンド', price:'60分 ¥3,600〜', coords:[26.21,127.68], img:'https://randomuser.me/api/portraits/women/30.jpg'},
];

// ---- Leaflet 初期化 ----
const map = L.map('map').setView([36.2, 138.3], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 吹き出し（カスタム）：Leafletの枠を透明化し、内側に白カードを描く
function openCleanPopup(coach, latlng){
  const html = `
    <div class="popup-card" data-id="${coach.id}">
      <img src="${coach.img}" alt="${coach.name}">
      <p class="name">${coach.name}</p>
    </div>`;
  L.popup({ className:'clean-popup', closeButton:false, autoClose:true })
    .setLatLng(latlng)
    .setContent(html)
    .openOn(map);
}

// ピン・カード生成
const grid = document.getElementById('coachGrid');
coaches.forEach(c => {
  // グリッドカード
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="row">
      <img src="${c.img}" alt="${c.name}">
      <div>
        <h4>${c.name}</h4>
        <p>${c.skill}</p>
        <p class="price">${c.price}</p>
      </div>
    </div>`;
  grid.appendChild(card);

  card.addEventListener('click', ()=>showDetail(c));

  // マーカー
  const marker = L.marker(c.coords).addTo(map);
  marker.on('click', ()=>openCleanPopup(c, marker.getLatLng()));
});

// ポップアップ内クリックで詳細表示
map.on('popupopen', (e)=>{
  const el = e.popup.getElement();
  if(!el) return;
  el.querySelector('.popup-card')?.addEventListener('click', ()=>{
    const id = Number(el.querySelector('.popup-card').dataset.id);
    const c = coaches.find(cc=>cc.id===id);
    if(c) showDetail(c);
  });
});

// ---- モーダル ----
const modal = document.getElementById('coachDetailModal');
const closeBtn = document.getElementById('closeModal');
function showDetail(c){
  document.getElementById('coachImg').src = c.img;
  document.getElementById('coachName').textContent = c.name;
  document.getElementById('coachSkill').textContent = c.skill;
  document.getElementById('coachPrice').textContent = c.price;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
}
closeBtn.addEventListener('click', ()=>{
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
});
modal.addEventListener('click', (e)=>{
  if(e.target === modal){ closeBtn.click(); }
});
