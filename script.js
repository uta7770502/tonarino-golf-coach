const coaches = {
  1: {
    name: "佐藤 一郎",
    skill: "ドライバー／アプローチ",
    price: "60分 ¥3,000〜",
    intro: "ゴルフ歴20年。飛距離アップや安定したショットが得意。初心者から中級者まで丁寧に指導します。",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  2: {
    name: "高橋 次郎",
    skill: "パター／初心者指導",
    price: "60分 ¥4,000〜",
    intro: "ゴルフはメンタル！をモットーに、リラックスして楽しむスタイルを教えます。",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
};

const panel = document.getElementById("detailPanel");
const pins = document.querySelectorAll(".pin");
const cards = document.querySelectorAll(".coach-card");
const closeBtn = document.getElementById("closeDetail");

function showDetail(id) {
  const c = coaches[id];
  if (!c) return;
  document.getElementById("detailImg").src = c.img;
  document.getElementById("detailName").textContent = c.name;
  document.getElementById("detailSkill").textContent = "得意分野：" + c.skill;
  document.getElementById("detailPrice").textContent = "料金：" + c.price;
  document.getElementById("detailIntro").textContent = c.intro;
  panel.classList.add("active");
}

cards.forEach((card) => {
  card.addEventListener("click", () => showDetail(card.dataset.id));
});

pins.forEach((pin) => {
  pin.addEventListener("click", () => showDetail(pin.dataset.id));
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });
}

document.getElementById("closeDetail").addEventListener("click", () => {
  panel.classList.remove("active");
});
