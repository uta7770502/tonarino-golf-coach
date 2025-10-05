// URL の ?id= を取得
function getId() {
  const p = new URLSearchParams(location.search);
  return Number(p.get("id") || "0");
}

// 星UI
function renderStars(container, rating) {
  container.innerHTML = "";
  const r = Math.max(0, Math.min(5, Number(rating) || 4.5));
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  for (let i = 0; i < full; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = "★";
    container.appendChild(s);
  }
  if (half) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = "★";
    s.style.opacity = "0.4";
    container.appendChild(s);
  }
  for (let i = full + (half ? 1 : 0); i < 5; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = "☆";
    s.style.opacity = "0.35";
    container.appendChild(s);
  }
  const num = document.createElement("span");
  num.style.marginLeft = "6px";
  num.style.fontWeight = "700";
  num.style.color = "#0b6657";
  num.textContent = String(r);
  container.appendChild(num);
}

// 価格フォールバック
function derive90(price60Text) {
  // "¥3,000〜" → 90分は雑に 1.6 倍、端数切上げ（ダミー）
  const m = price60Text.replace(/[^\d]/g, "");
  if (!m) return "要相談";
  const v = Math.ceil((Number(m) * 1.6) / 100) * 100;
  return `¥${v.toLocaleString()}〜`;
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getId();
  const c = (window.COACHES || []).find(v => v.id === id) || window.COACHES?.[0];

  // 要素
  const pPhoto = document.getElementById("pPhoto");
  const pName  = document.getElementById("pName");
  const pTag   = document.getElementById("pTagline");
  const pStars = document.getElementById("pStars");
  const p60    = document.getElementById("p60");
  const p90    = document.getElementById("p90");
  const videoSec = document.getElementById("videoSection");
  const pVideo = document.getElementById("pVideo");
  const pBook  = document.getElementById("pBook");
  const pDate  = document.getElementById("pDate");

  // 表示
  pPhoto.src = c?.img || "";
  pName.textContent = c?.name || "コーチ";
  pTag.textContent  = c?.tagline || (c?.club ? `得意クラブ：${c.club}` : "得意：—");
  renderStars(pStars, c?.rating ?? 4.7);
  const price60 = c?.price || "¥3,000〜";
  p60.textContent = price60;
  p90.textContent = c?.price90 || derive90(price60);

  // YouTube
  if (c?.video) {
    pVideo.src = `https://www.youtube.com/embed/${c.video}`;
    videoSec.style.display = "";
  }

  // 予約（ダミー）
  // とりあえず今日の日付を初期値に
  const today = new Date();
  pDate.value = today.toISOString().slice(0,10);
  pBook.addEventListener("click", () => {
    alert(`「${c?.name}」の予約内容を受け付けました（ダミー）`);
  });
});
