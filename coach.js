// ================================================
// coach.js（完全対応版）
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  // coaches.jsがまだ読み込まれていない場合、待機
  const waitForCoaches = setInterval(() => {
    if (window.COACHES && Array.isArray(window.COACHES)) {
      clearInterval(waitForCoaches);
      initCoachDetail();
    }
  }, 100);

  function initCoachDetail() {
    // URLからコーチIDを取得
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    if (!id) return console.error("❌ コーチIDが無効です");

    // コーチデータを検索
    const c = window.COACHES.find(x => x.id === id);
    if (!c) return console.error("❌ 指定されたコーチが存在しません:", id);

    // 要素取得ヘルパー
    const el = (id) => document.getElementById(id);

    // 画像
    if (el("pPhoto")) el("pPhoto").src = c.img || "";

    // 名前
    if (el("pName")) el("pName").textContent = c.name || "不明";

    // 得意クラブ
    if (el("pTagline")) el("pTagline").textContent = c.club || "未設定";

    // 貸出可能クラブ
    if (el("pRentals"))
      el("pRentals").textContent = (c.rentals && c.rentals.length)
        ? c.rentals.join("、")
        : "なし";

    console.log("✅ コーチ詳細読み込み完了:", c);

    // 「コーチ一覧に戻る」リンク設定
    const backLink = document.querySelector(".back-link");
    if (backLink) {
      backLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./student.html";
      });
    }

    // レビュー読み込み
    if (typeof loadReviews === "function") loadReviews();
  }
});
