// coaches.js
const coaches = [
  {
    id: 1,
    name: "佐藤 太郎",
    prefecture: "東京都",
    speciality: "ドライバー・飛距離アップ",
    rentals: "ドライバー, フェアウェイウッド, パター",
    price30: 2000,
    price60: 3000,
    price90: 5000,
    photo: "https://i.pravatar.cc/150?img=1",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 2,
    name: "田中 次郎",
    prefecture: "神奈川県",
    speciality: "アプローチ・バンカー",
    rentals: "ウェッジ, パター",
    price30: 1800,
    price60: 2800,
    price90: 4500,
    photo: "https://i.pravatar.cc/150?img=2",
    videoUrl: ""
  },
  {
    id: 3,
    name: "中村 花子",
    prefecture: "大阪府",
    speciality: "パター・メンタル強化",
    rentals: "パター",
    price30: 2000,
    price60: 3200,
    price90: 4800,
    photo: "https://i.pravatar.cc/150?img=3",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
  },
  {
    id: 4,
    name: "伊藤 健",
    prefecture: "愛知県",
    speciality: "バンカー",
    rentals: "サンドウェッジ, ピッチングウェッジ",
    price30: 2000,
    price60: 4000,
    price90: 5000,
    photo: "https://i.pravatar.cc/150?img=4",
    videoUrl: ""
  }
];

localStorage.setItem("coaches", JSON.stringify(coaches));
