/* =========================================================================
 *  app.js - 화면 전환(라우팅) & 공통 네비게이션
 * ========================================================================= */

// 화면 이동 히스토리 (뒤로가기용)
const navStack = [];

const Screens = {
  HUB: "screen-hub",
  QUIZ_INTRO: "screen-quiz-intro",
  QUIZ_CATS: "screen-quiz-cats",
  QUIZ_PLAY: "screen-quiz-play",
  QUIZ_RESULT: "screen-quiz-result",
  FEUD_INTRO: "screen-feud-intro",
  FEUD: "screen-feud",
  BALANCE_INTRO: "screen-balance-intro",
  BALANCE: "screen-balance",
};

// 각 화면의 빵부스러기(경로) 라벨
const crumbLabels = {
  "screen-hub": "",
  "screen-quiz-intro": "스피드 퀴즈 ▸ 소개",
  "screen-quiz-cats": "스피드 퀴즈",
  "screen-quiz-play": "스피드 퀴즈 ▸ 진행 중",
  "screen-quiz-result": "스피드 퀴즈 ▸ 결과",
  "screen-feud-intro": "Family Feud ▸ 소개",
  "screen-feud": "Family Feud",
  "screen-balance-intro": "밸런스 게임 ▸ 소개",
  "screen-balance": "밸런스 게임",
};

function showScreen(id, pushHistory = true) {
  const current = document.querySelector(".screen.active");
  if (current) {
    if (pushHistory && current.id !== id) navStack.push(current.id);
    current.classList.remove("active");
  }
  document.getElementById(id).classList.add("active");

  // 상단 바: 허브에서는 숨김
  const topbar = document.getElementById("topbar");
  topbar.style.visibility = id === Screens.HUB ? "hidden" : "visible";
  document.getElementById("crumb").innerHTML =
    crumbLabels[id] ? "<b>●</b> " + crumbLabels[id] : "";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  const prev = navStack.pop();
  showScreen(prev || Screens.HUB, false);
}

function goHome() {
  navStack.length = 0;
  showScreen(Screens.HUB, false);
}

// ---- 공통 버튼 연결 ----
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backBtn").addEventListener("click", goBack);
  document.getElementById("homeBtn").addEventListener("click", goHome);

  // 허브에서 게임 선택 → 먼저 소개 화면
  document.getElementById("goQuiz").addEventListener("click", () => {
    showScreen(Screens.QUIZ_INTRO);
  });
  document.getElementById("goFeud").addEventListener("click", () => {
    showScreen(Screens.FEUD_INTRO);
  });
  document.getElementById("goBalance").addEventListener("click", () => {
    showScreen(Screens.BALANCE_INTRO);
  });

  // 소개 화면의 "시작하기"
  document.getElementById("quizStartBtn").addEventListener("click", () => {
    SpeedQuiz.openCategories();
  });
  document.getElementById("feudStartBtn").addEventListener("click", () => {
    FamilyFeud.open();
  });
  document.getElementById("balanceStartBtn").addEventListener("click", () => {
    BalanceGame.open();
  });

  // 소개 화면의 "뒤로" 버튼들
  document.querySelectorAll("[data-intro-back]").forEach((btn) => {
    btn.addEventListener("click", goBack);
  });
});
