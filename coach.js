// ==============================
//  coach.js（最新版）
// ==============================

// ページ読み込み後に実行
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id || !window.COACHES) return;

  const c = window.COACHES.find(x => x.id === id);
  if (!c) {
    console.error("該当コーチが見つかりません。");
    return;
  }

  // -----------------------------
  // コーチ情報を反映
  // -----------------------------
  const el = (id) => document.getElementById(id);

  if (el("pPhoto")) el("pPhoto").src = c.img || "https://via.placeholder.com/150";
  if (el("pName")) el("pName").textContent = c.name || "コーチ名";
  if (el("pTagline")) el("pTagline").textContent = c.club ? `得意クラブ：${c.club}` : "";
  if (el("p60")) el("p60").textContent = c.price60 || "¥4,000";
  if (el("p90")) el("p90").textContent = c.price90 || "¥6,000";
  if (el("pStars")) el("pStars").innerHTML = "★".repeat(c.stars || 5);

  if (el("pVideo") && c.video) {
    el("pVideo").src = c.video;
  }

  // 紹介文・プロフィール説明
  if (el("pDesc")) el("pDesc").textContent = c.desc || "このコーチの紹介文が入ります。";

  // -----------------------------
  // 「予約」ボタンイベント
  // -----------------------------
  const reserveBtn = el("reserveBtn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert(`${c.name} のレッスンを予約します！`);
    });
  }

  // -----------------------------
  // 「お気に入り」ボタンイベント
  // -----------------------------
  const favBtn = el("favoriteBtn");
  if (favBtn) {
    favBtn.addEventListener("click", () => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.find(f => f.id === c.id);

      if (exists) {
        favorites = favorites.filter(f => f.id !== c.id);
        alert(`${c.name} をお気に入りから削除しました。`);
      } else {
        favorites.push(c);
        alert(`${c.name} をお気に入りに追加しました！`);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  }

  // -----------------------------
  // 「戻る」ボタン（マイページへ）
  // -----------------------------
  const backBtn = el("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "student-dashboard.html";
    });
  }
});
