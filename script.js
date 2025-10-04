const map = L.map('map').setView([35.6895, 139.6917], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const coaches = [
  {
    id: 1,
    name: "佐藤 一郎",
    skill: "ドライバー／アプローチ",
    price: "60分 ¥3,000〜",
    coords: [35.6895, 139.6917],
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "高橋 次郎",
    skill: "パター／初心者指導",
    price: "60分 ¥4,000〜",
    coords: [34.6937, 135.5023],
    img: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

const listContainer = document.getElementById('coachList');
coaches.forEach(coach => {
  const card = document.createElement('div');
  card.className = 'coach-card';
  card.innerHTML = `<img src="${coach.img}" alt="${coach.name}"><strong>${coach.name}</strong><p>${coach.skill}</p><p>${coach.price}</p>`;
  listContainer.appendChild(card);
});

function showDetail(id) {
  const coach = coaches.find(c => c.id === id);
  if (coach) {
    alert(`${coach.name}\n${coach.skill}\n${coach.price}`);
  }
}

coaches.forEach((coach) => {
  const marker = L.marker(coach.coords).addTo(map);

  const popupContent = `
    <div class="popup-bubble" onclick="showDetail(${coach.id})">
      <div class="popup-inner">
        <img src="${coach.img}" alt="${coach.name}">
        <div class="popup-text"><strong>${coach.name}</strong></div>
      </div>
      <div class="popup-arrow"></div>
    </div>
  `;

  marker.bindPopup(popupContent, {
    closeButton: false,
    offset: [0, -20],
  });
});
