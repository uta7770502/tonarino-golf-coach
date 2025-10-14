// script.js
const coaches = JSON.parse(localStorage.getItem("coaches")) || [];
const map = L.map("map").setView([35.68, 139.76], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const list = document.getElementById("coachList");
coaches.forEach(coach => {
  const badge = coach.videoUrl ? "🎥" : "";
  const thumb = coach.videoUrl
    ? `https://img.youtube.com/vi/${new URL(coach.videoUrl).searchParams.get("v")}/hqdefault.jpg`
    : coach.photo;

  const marker = L.marker([35 + Math.random(), 139 + Math.random()]).addTo(map);
  marker.bindPopup(`<b>${coach.name}</b><br>${badge} ${coach.speciality}`);

  const div = document.createElement("div");
  div.className = "coach-card";
  div.innerHTML = `
    <img src="${thumb}" alt="${coach.name}">
    <h3>${coach.name} ${badge}</h3>
    <p>${coach.speciality}</p>
  `;
  div.addEventListener("click", () => {
    location.href = \`coach.html?id=${coach.id}\`;
  });
  list.appendChild(div);
});
