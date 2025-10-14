// ==================================================
//  coach.js（完全対応版）
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
  // URLからコーチIDを取得
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id || !window.COACHES) {
    console.error("❌ コーチデータが見つかりません。");
    return;
  }

  const c = window.COACHES.find(x => x.id === id);
  if (!c) {
    console.error("❌ 指定されたコーチが存在しません。");
    return;
  }

  // 要素取得
  const el = id => document.getElementById(id);

  // 画像
  if (el("pPhoto")) el("pPhoto").src = c.img;

  // 名前
  if (el("pName")) el("pName").textContent = c.name;

  // 得意クラブ
  if (el("pTagline")) {
    el("pTagline").textContent = c.club ? c.club : "未登録";
  }

  // 貸出可能クラブ
  if (el("pRentals")) {
    el("pRentals").textContent =
      c.rentals && c.rentals.length > 0
        ? c.rentals.join("、")
        : "なし";
  }

  console.log("✅ コーチ詳細読み込み完了:", c.name);
});
  }

  loadReviews();
});
