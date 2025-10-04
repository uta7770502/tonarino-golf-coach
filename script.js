const map = L.map('map').setView([35.6895, 139.6917], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const coaches = [
  {
    name: "佐藤 一郎",
    lat: 35.6895,
    lng: 139.6917,
    image: "https://i.imgur.com/avzj5aE.jpg",
    skill: "ドライバー／アプローチ",
    price: "60分 ¥3,000〜",
  },
  {
    name: "高橋 次郎",
    lat: 34.6937,
    lng: 135.5023,
    image: "https://i.imgur.com/yv3Jr8V.jpg",
    skill: "パター／初心者指導",
    price: "60分 ¥4,000〜",
  }
];

coaches.forEach(coach => {
  const marker = L.marker([coach.lat, coach.lng]).addTo(map);
  let popupShown = false;

  marker.on('click', () => {
    if (!popupShown) {
      marker.bindPopup(`<div class='popup-coach'><img src='${coach.image}' alt='${coach.name}' class='popup-img'></div>`).openPopup();
      popupShown = true;
    } else {
      showCoachDetail(coach);
      popupShown = false;
    }
  });
});

function showCoachDetail(coach) {
  document.getElementById("coachImg").src = coach.image;
  document.getElementById("coachName").textContent = coach.name;
  document.getElementById("coachSkill").textContent = coach.skill;
  document.getElementById("coachPrice").textContent = coach.price;
  document.getElementById("coachDetailModal").style.display = "flex";
}

function closeCoachDetail() {
  document.getElementById("coachDetailModal").style.display = "none";
}
