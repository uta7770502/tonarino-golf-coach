// ==================================================
//  coach.js（完全対応版）
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  if (!id || !window.COA CHES) return; // ← スペース入らないよう注意（COACHES）

  const c = window.COACHES.find(x => x.id === id);
  if (!c) {
    console.error("該当コーチが見つかりません");
    return;
  }

  // 要素取得ヘルパー
  const el = (id) => document.getElementById(id);

  // ==============================
  //  コーチ情報を反映
  // ==============================
  if (el("pPhoto"))  el("pPhoto").src = c.img;
  if (el("pName"))   el("pName").textContent = c.name;

  // 得意クラブ（HTML側に「得意クラブ：」ラベルがあるので中身だけ）
  if (el("pTagline")) {
    el("pTagline").textContent = c.club || "";
  }

  // 貸出しクラブ（HTML側に「貸出し可能クラブ：」ラベルがあるので中身だけ）
  if (el("pRentals")) {
    el("pRentals").textContent =
      Array.isArray(c.rentals) && c.rentals.length
        ? c.rentals.join("、")
        : "";
  }

  // 料金など（ある場合だけ反映）
  if (el("p60"))   el("p60").textContent = c.p60 ?? "";
  if (el("p90"))   el("p90").textContent = c.p90 ?? "";
  if (el("pStars")) {
    const stars = Math.max(1, Math.min(5, c.stars ?? 4));
    el("pStars").innerHTML = "⭐".repeat(stars);
  }
  if (el("pDesc")) el("pDesc").textContent = c.desc || "";

  // YouTube（未設定ならデモ）
  if (el("pVideo")) el("pVideo").src = c.video || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // ==============================
  //  「予約する」ボタン（仮）
  // ==============================
  const reserveBtn = el("reserveBtn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert(`${c.name} のレッスンを予約します（仮）`);
    });
  }

  // ==============================
  //  「お気に入り」ボタン
  // ==============================
  const favBtn = el("favoriteBtn");
  if (favBtn) {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorited = favorites.some(x => x.id === c.id);
    favBtn.textContent = isFavorited ? "🤍 お気に入り解除" : "❤️ お気に入り追加";

    favBtn.addEventListener("click", () => {
      favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const exists = favorites.find(x => x.id === c.id);
      if (exists) {
        favorites = favorites.filter(x => x.id !== c.id);
        favBtn.textContent = "❤️ お気に入り追加";
        alert(`${c.name} をお気に入りから外しました`);
      } else {
        favorites.push(c);
        favBtn.textContent = "🤍 お気に入り解除";
        alert(`${c.name} をお気に入りに追加しました`);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  }

  // ==============================
  //  「戻る」（マイページへ）
  // ==============================
  const backBtn = el("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "student.html";
    });
  }

  // ==============================
  //  レビュー投稿機能（ローカル保存）
  // ==============================
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");

  function loadReviews() {
    const allReviews = JSON.parse(localStorage.getItem("coachReviews") || "{}");
    const coachReviews = allReviews[c.id] || [];
    if (!reviewList) return;

    if (coachReviews.length === 0) {
      reviewList.innerHTML = "<p>まだレビューはありません。</p>";
      return;
    }

    reviewList.innerHTML = coachReviews
      .map(r => `
        <div class="review-card">
          <div class="review-header"><strong>${r.name}</strong></div>
          <p>${r.comment}</p>
          <div class="review-date">${r.date}</div>
        </div>
      `)
      .join("");
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reviewName").value.trim();
      const rating = parseInt(document.getElementById("reviewRating").value, 10);
      const comment = document.getElementById("reviewComment").value.trim();

      const newReview = {
        name,
        rating,
        comment,
        date: new Date().toLocaleDateString(),
      };

      const allReviews = JSON.parse(localStorage.getItem("coachReviews") || "{}");
      if (!allReviews[c.id]) allReviews[c.id] = [];
      allReviews[c.id].unshift(newReview);
      localStorage.setItem("coachReviews", JSON.stringify(allReviews));

      reviewForm.reset();
      loadReviews();
      alert("レビューを投稿しました！");
    });
  }

  loadReviews();
});
