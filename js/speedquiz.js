/* =========================================================================
 *  speedquiz.js - 스피드 퀴즈 로직 (타이머 + 점수 자동)
 * ========================================================================= */
const SpeedQuiz = (function () {
  const ROUND_SECONDS = 60; // 한 카테고리 제한 시간(초) — 바꿔도 됩니다

  let state = {
    category: null,
    questions: [],
    index: 0,
    score: 0,
    timeLeft: ROUND_SECONDS,
    timerId: null,
    revealed: false,
  };

  // ---- 카테고리 선택 화면 ----
  function openCategories() {
    const grid = document.getElementById("catGrid");
    grid.innerHTML = "";
    SPEED_QUIZ.order.forEach((name) => {
      const count = (SPEED_QUIZ.categories[name] || []).length;
      const el = document.createElement("div");
      el.className = "cat-btn";
      el.innerHTML = name + "<small>" + count + "문제</small>";
      el.addEventListener("click", () => start(name));
      grid.appendChild(el);
    });
    showScreen(Screens.QUIZ_CATS);
  }

  // ---- 라운드 시작 ----
  function start(name) {
    state.category = name;
    state.questions = (SPEED_QUIZ.categories[name] || []).slice();
    state.index = 0;
    state.score = 0;
    state.timeLeft = ROUND_SECONDS;
    state.revealed = false;

    showScreen(Screens.QUIZ_PLAY);
    renderQuestion();
    startTimer();
  }

  function startTimer() {
    stopTimer();
    updateTimer();
    state.timerId = setInterval(() => {
      state.timeLeft--;
      updateTimer();
      if (state.timeLeft <= 0) finish();
    }, 1000);
  }
  function stopTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
  }

  function updateTimer() {
    const t = document.getElementById("qTimer");
    t.textContent = Math.max(0, state.timeLeft);
    t.classList.toggle("warn", state.timeLeft <= 10);
  }

  // ---- 문제 렌더링 ----
  function renderQuestion() {
    const q = state.questions[state.index];
    state.revealed = false;

    document.getElementById("qProgress").textContent =
      (state.index + 1) + " / " + state.questions.length;
    document.getElementById("qScore").textContent = "점수 " + state.score;
    document.getElementById("qNum").textContent = "문제 " + (state.index + 1);
    document.getElementById("qText").textContent = q.q;

    const ans = document.getElementById("qAnswer");
    ans.textContent = q.a;
    ans.classList.add("hidden");
    document.getElementById("qRevealBtn").disabled = false;
  }

  function reveal() {
    document.getElementById("qAnswer").classList.remove("hidden");
    document.getElementById("qRevealBtn").disabled = true;
    state.revealed = true;
  }

  // 정답 처리(+1) 또는 패스 후 다음 문제로
  function next(correct) {
    if (correct) state.score++;
    state.index++;
    if (state.index >= state.questions.length) {
      finish();
    } else {
      renderQuestion();
    }
  }

  // ---- 종료 / 결과 ----
  function finish() {
    stopTimer();
    document.getElementById("rCat").textContent = state.category;
    document.getElementById("rScore").textContent = state.score;

    const pct = state.score / state.questions.length;
    let comment = "좋아요! 다음엔 더 잘할 수 있어요 💪";
    if (pct === 1) comment = "🏆 퍼펙트! 전부 다 맞혔어요!";
    else if (pct >= 0.8) comment = "🔥 대단해요! 거의 다 맞혔어요!";
    else if (pct >= 0.5) comment = "👍 절반 이상 성공!";
    document.getElementById("rComment").textContent = comment;

    showScreen(Screens.QUIZ_RESULT);
  }

  // ---- 버튼 연결 ----
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("qRevealBtn").addEventListener("click", reveal);
    document.getElementById("qCorrectBtn").addEventListener("click", () => next(true));
    document.getElementById("qPassBtn").addEventListener("click", () => next(false));

    document.getElementById("rAgainBtn").addEventListener("click", () => start(state.category));
    document.getElementById("rCatsBtn").addEventListener("click", openCategories);

    // 키보드 단축키: → 정답, ← 패스, 스페이스 정답보기
    document.addEventListener("keydown", (e) => {
      const playing = document.getElementById("screen-quiz-play").classList.contains("active");
      if (!playing) return;
      if (e.code === "ArrowRight" || e.key === "o") next(true);
      else if (e.code === "ArrowLeft" || e.key === "x") next(false);
      else if (e.code === "Space") { e.preventDefault(); reveal(); }
    });
  });

  return { openCategories, start };
})();
