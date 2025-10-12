// 20名のコーチ（日本国内座標）
window.COACHES = [
  {id:1,  name:"佐藤 一郎", city:"東京",     lat:35.6812, lng:139.7671, price:"¥3,000〜", club:"ドライバー", img:"https://randomuser.me/api/portraits/men/31.jpg"},
  {id:2,  name:"高橋 次郎", city:"新宿",     lat:35.6938, lng:139.7034, price:"¥4,000〜", club:"パター",     img:"https://randomuser.me/api/portraits/men/32.jpg"},
  {id:3,  name:"鈴木 太郎", city:"大阪",     lat:34.6937, lng:135.5023, price:"¥3,500〜", club:"アイアン",   img:"https://randomuser.me/api/portraits/men/33.jpg"},
  {id:4,  name:"田中 花子", city:"札幌",     lat:43.0618, lng:141.3545, price:"¥5,000〜", club:"飛距離",     img:"https://randomuser.me/api/portraits/women/44.jpg"},
  {id:5,  name:"伊藤 健",   city:"福岡",     lat:33.5902, lng:130.4017, price:"¥3,800〜", club:"バンカー",   img:"https://randomuser.me/api/portraits/men/34.jpg"},
  {id:6,  name:"渡辺 真",   city:"京都",     lat:35.0116, lng:135.7681, price:"¥3,600〜", club:"方向性",     img:"https://randomuser.me/api/portraits/men/35.jpg"},
  {id:7,  name:"山本 美咲", city:"神戸",     lat:34.6901, lng:135.1955, price:"¥3,700〜", club:"スイング",   img:"https://randomuser.me/api/portraits/women/45.jpg"},
  {id:8,  name:"中村 亮",   city:"横浜",     lat:35.4437, lng:139.6380, price:"¥3,900〜", club:"戦略",       img:"https://randomuser.me/api/portraits/men/36.jpg"},
  {id:9,  name:"小林 涼",   city:"千葉",     lat:35.6074, lng:140.1065, price:"¥3,300〜", club:"初心者",     img:"https://randomuser.me/api/portraits/men/37.jpg"},
  {id:10, name:"加藤 由美", city:"川崎",     lat:35.5308, lng:139.7036, price:"¥3,900〜", club:"トラブル",   img:"https://randomuser.me/api/portraits/women/46.jpg"},
  {id:11, name:"岡田 剛",   city:"名古屋",   lat:35.1815, lng:136.9066, price:"¥3,800〜", club:"アプローチ", img:"https://randomuser.me/api/portraits/men/38.jpg"},
  {id:12, name:"清水 彩",   city:"仙台",     lat:38.2682, lng:140.8694, price:"¥3,900〜", club:"スコア",     img:"https://randomuser.me/api/portraits/women/47.jpg"},
  {id:13, name:"松本 茜",   city:"金沢",     lat:36.5613, lng:136.6562, price:"¥3,600〜", club:"フォーム",   img:"https://randomuser.me/api/portraits/women/23.jpg"},
  {id:14, name:"斎藤 翔",   city:"広島",     lat:34.3853, lng:132.4553, price:"¥3,700〜", club:"リズム",     img:"https://randomuser.me/api/portraits/men/24.jpg"},
  {id:15, name:"山田 涼介", city:"さいたま", lat:35.8617, lng:139.6455, price:"¥4,100〜", club:"メンタル",   img:"https://randomuser.me/api/portraits/men/25.jpg"},
  {id:16, name:"佐々木 優奈", city:"奈良",   lat:34.6851, lng:135.8048, price:"¥3,800〜", club:"女性向け",   img:"https://randomuser.me/api/portraits/women/26.jpg"},
  {id:17, name:"原 健太",   city:"静岡",     lat:34.9756, lng:138.3828, price:"¥3,500〜", club:"飛距離",     img:"https://randomuser.me/api/portraits/men/27.jpg"},
  {id:18, name:"石井 未来", city:"新潟",     lat:37.9026, lng:139.0232, price:"¥3,900〜", club:"安定性",     img:"https://randomuser.me/api/portraits/women/28.jpg"},
  {id:19, name:"岡本 翔",   city:"松山",     lat:33.8392, lng:132.7657, price:"¥3,700〜", club:"攻略",       img:"https://randomuser.me/api/portraits/men/29.jpg"},
  {id:20, name:"森田 麻衣", city:"那覇",     lat:26.2124, lng:127.6809, price:"¥3,600〜", club:"実践",       img:"https://randomuser.me/api/portraits/women/30.jpg"}
];
// ==============================
// 🔍 検索条件を localStorage から適用
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const searchConditions = JSON.parse(localStorage.getItem("searchConditions"));
  if (!searchConditions) return;

  const { name, area, club } = searchConditions;
  let filtered = window.COACHES;

  if (name) filtered = filtered.filter(c => c.name.includes(name));
  if (area) filtered = filtered.filter(c => c.city.includes(area));
  if (club) filtered = filtered.filter(c => c.club.includes(club));

  // コーチ一覧を再描画
  renderCoaches(filtered);

  // 使い終わったら削除
  localStorage.removeItem("searchConditions");
});
document.getElementById("searchBtn").addEventListener("click", () => {
  const name = document.getElementById("searchName").value;
  const area = document.getElementById("searchArea").value;
  const club = document.getElementById("searchClub").value;

  localStorage.setItem("searchConditions", JSON.stringify({ name, area, club }));
  window.location.href = "coaches.html";
});
