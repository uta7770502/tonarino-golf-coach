const map = L.map('map').setView([35.68, 139.76], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const coaches = Array.from({ length: 20 }, (_, i) => ({
  name: ['佐藤一郎','高橋次郎','鈴木太郎','田中花子','中村健','山本玲奈','小林修','加藤真由','渡辺拓也','伊藤優','清水和也','松本茜','斎藤翼','林真央','山田涼介','佐々木優奈','原健太','石井未来','岡本翔','森田麻衣'][i],
  specialty: ['ドライバー／アプローチ','パター／初心者指導','アイアン精度','飛距離アップ','バンカー脱出','方向安定','スイング矯正','ラウンド戦略','初心者対応','トラブルショット','アプローチ特訓','スコア管理','フォーム分析','リズム改善','メンタル強化','女性向け指導','飛距離アップ','安定スイング','コース攻略','実践ラウンド'][i],
  price: ['¥3,000','¥4,000','¥3,500','¥4,200','¥3,800','¥3,600','¥3,700','¥3,900','¥3,300','¥3,400','¥3,800','¥3,900','¥3,600','¥3,700','¥4,100','¥3,800','¥3,500','¥3,900','¥3,700','¥3,600'][i],
  lat: 33 + Math.random() * 8,
  lng: 130 + Math.random() * 10,
  img: `https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 20}.jpg`
}));

const coachList = document.getElementById('coach-list');
coaches.forEach(coach => {
  const card = document.createElement('div');
  card.className = 'coach-card';
  card.innerHTML = `
    <img src="${coach.img}" alt="${coach.name}">
    <h3>${coach.name}</h3>
    <p>${coach.specialty}</p>
    <p>60分 ${coach.price}〜</p>`;
  coachList.appendChild(card);

  const marker = L.marker([coach.lat, coach.lng]).addTo(map);
  const popupContent = `
    <div class='popup-card'>
      <img src="${coach.img}" alt="${coach.name}">
      <h4>${coach.name}</h4>
    </div>`;

  marker.bindPopup(popupContent);
});
