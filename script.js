
const coaches = {
  1: { id: 1, name: "佐藤 一郎", skill: "ドライバー／アプローチ", price: "60分 ¥3,000〜",
       intro: "ゴルフ歴20年。飛距離アップや安定したショットが得意。初心者から中級者まで丁寧に指導します。",
       img: "https://randomuser.me/api/portraits/men/33.jpg", lat: 35.6895, lng: 139.6917 },
  2: { id: 2, name: "高橋 次郎", skill: "パター／初心者指導", price: "60分 ¥4,000〜",
       intro: "ゴルフはメンタル！をモットーに、リラックスして楽しむスタイルを教えます。",
       img: "https://randomuser.me/api/portraits/men/45.jpg", lat: 34.6937, lng: 135.5023 }
};

const map = L.map('map', { zoomControl: true }).setView([35.68, 139.76], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

Object.values(coaches).forEach(c => {
  const marker = L.marker([c.lat, c.lng]).addTo(map).bindTooltip(c.name);
  marker.on('click', () => openDetail(c.id, true));
});

document.querySelectorAll('.coach-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = Number(card.getAttribute('data-id'));
    openDetail(id, true);
  });
});

const panel = document.getElementById('detailPanel');
const closeBtn = document.getElementById('closeDetail');

function openDetail(id, panTo = false) {
  const c = coaches[id];
  if (!c) return;
  document.getElementById('detailImg').src = c.img;
  document.getElementById('detailName').textContent = c.name;
  document.getElementById('detailSkill').textContent = "得意分野：" + c.skill;
  document.getElementById('detailPrice').textContent = "料金：" + c.price;
  document.getElementById('detailIntro').textContent = c.intro;
  panel.classList.add('active');
  if (panTo) map.setView([c.lat, c.lng], 11, { animate: true });
}

closeBtn.addEventListener('click', () => panel.classList.remove('active'));
