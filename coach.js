// ==============================
// coach.js（完全対応版）
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id || !window.COACHES) return;

  const c = window.COACHES.find(x => x.id === id);
  if (!c) {
    console.error("該当コーチが見つかりません。");
    return;
  }

  // 要素取得ヘルパー
  const el = (id) => document.getElementById(id);

  // =============================
  // コーチ情報を反映
  // =============================
  if (el("pPhoto")) el("pPhoto").src = c.img || "https://via.placeholder.com/150";
  if (el("pName")) el("pName").textContent = c.name || "コーチ名";
  if (el("pTagline")) el("pTagline").textContent = c.club ? `得意クラブ：${c.club}` : "";
  if (el("p60")) el("p60").textContent = c.price60 || "30分 ¥2,000";
  if (el("p90")) el("p90").textContent = c.price90 || "60分 ¥4,000";
  if (el("pStars")) el("pStars").innerHTML = "★".repeat(c.stars || 5);
  if (el("pDesc")) el("pDesc").textContent = c.desc || "このコーチの紹介文が入ります。";

  // YouTube動画
  if (el("pVideo")) {
    el("pVideo").src = c.video || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  }

  // =============================
  // 「予約する」ボタン
  // =============================
  const reserveBtn = el("reserveBtn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert(`${c.name} のレッスンを予約します！（仮機能）`);
    });
  }

  // =============================
  // 「お気に入り」ボタン
  // =============================
  const favBtn = el("favoriteBtn");
  if (favBtn) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorited = favorites.some(f => f.id === c.id);

    // 初期表示状態
    favBtn.textContent = isFavorited ? "❤️ お気に入り中" : "🤍 お気に入りに追加";

    favBtn.addEventListener("click", () => {
      favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.find(f => f.id === c.id);

      if (exists) {
        favorites = favorites.filter(f => f.id !== c.id);
        favBtn.textContent = "🤍 お気に入りに追加";
        alert(`${c.name} をお気に入りから削除しました。`);
      } else {
        favorites.push(c);
        favBtn.textContent = "❤️ お気に入り中";
        alert(`${c.name} をお気に入りに追加しました！`);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  }

  // =============================
  // 「戻る」ボタン（マイページへ）
  // =============================
  const backBtn = el("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "student-dashboard.html";
    });
  }
    // =============================
  // 📝 レビュー投稿機能
  // =============================
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");

  function loadReviews() {
    const allReviews = JSON.parse(localStorage.getItem("coachReviews")) || {};
    const coachReviews = allReviews[c.id] || [];
    if (coachReviews.length === 0) {
      reviewList.innerHTML = "<p>まだレビューはありません。</p>";
      return;
    }
    reviewList.innerHTML = coachReviews
      .map(r => `
        <div class="review-card">
          <div class="review-header">
            <strong>${r.name}</strong> <span>${"★".repeat(r.rating)}</span>
          </div>
          <p>${r.comment}</p>
          <div class="review-date">${r.date}</div>
        </div>
      `).join("");
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reviewName").value;
      const rating = parseInt(document.getElementById("reviewRating").value);
      const comment = document.getElementById("reviewComment").value;
      const newReview = {
        name,
        rating,
        comment,
        date: new Date().toLocaleDateString("ja-JP")
      };

      const allReviews = JSON.parse(localStorage.getItem("coachReviews")) || {};
      if (!allReviews[c.id]) allReviews[c.id] = [];
      allReviews[c.id].unshift(newReview); // 最新を上に
      localStorage.setItem("coachReviews", JSON.stringify(allReviews));

      reviewForm.reset();
      loadReviews();
      alert("レビューを投稿しました！");
    });
  }

  loadReviews();
});
