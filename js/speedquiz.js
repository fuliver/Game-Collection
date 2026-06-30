/* =========================================================================
 *  speedquiz.js - 스피드 퀴즈 (설명하기 방식, 타이머 + 점수 자동)
 *  - 카드에 단어 하나를 크게 표시 → 한 사람이 설명 → 나머지가 맞히기
 *  - 정답 1개당 점수는 카테고리별 points (기본 10점, '2' 카테고리 20점)
 * ========================================================================= */
const SpeedQuiz = (function () {
  const ROUND_SECONDS = 60; // 한 카테고리 제한 시간(초) — 바꿔도 됩니다

  let state = {
    category: null,
    words: [],
    points: 10,
    index: 0,
    correctCount: 0,
    score: 0,
    timeLeft: ROUND_SECONDS,
    timerId: null,
  };

  // ---- 카테고리 선택 화면 ----
  function openCategories() {
    const grid = document.getElementById("catGrid");
    grid.innerHTML = "";
    SPEED_QUIZ.order.forEach((name) => {
      const cat = SPEED_QUIZ.categories[name] || { points: 10, words: [] };
      const el = document.createElement("div");
      el.className = "cat-btn";
      el.innerHTML = name +
        "<small>" + cat.words.length + "단어 · 정답당 " + cat.points + "점</small>";
      el.addEventListener("click", () => start(name));
      grid.appendChild(el);
    });
    showScreen(Screens.QUIZ_CATS);
  }

  // ---- 라운드 시작 ----
  function start(name) {
    const cat = SPEED_QUIZ.categories[name] || { points: 10, words: [] };
    state.category = name;
    state.words = cat.words.slice();
    state.points = cat.points;
    state.index = 0;
    state.correctCount = 0;
    state.score = 0;
    state.timeLeft = ROUND_SECONDS;

    // 정답 버튼에 점수 표시
    document.getElementById("qCorrectBtn").textContent = "정답! ✓ (+" + state.points + ")";

    showScreen(Screens.QUIZ_PLAY);
    renderWord();
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

  // ---- 단어 렌더링 ----
  function renderWord() {
    const word = state.words[state.index];
    document.getElementById("qProgress").textContent =
      (state.index + 1) + " / " + state.words.length;
    document.getElementById("qScore").textContent = "점수 " + state.score;
    document.getElementById("qNum").textContent = "단어 " + (state.index + 1);
    document.getElementById("qText").textContent = word;
  }

  // 정답(+points) 또는 패스 후 다음 단어로
  function next(correct) {
    if (correct) {
      state.correctCount++;
      state.score += state.points;
    }
    state.index++;
    if (state.index >= state.words.length) {
      finish();
    } else {
      renderWord();
    }
  }

  // ---- 종료 / 결과 ----
  function finish() {
    stopTimer();
    const total = state.words.length;
    const maxScore = total * state.points;

    document.getElementById("rCat").textContent = state.category;
    document.getElementById("rScore").textContent = state.score;
    document.getElementById("rMax").textContent = maxScore;
    document.getElementById("rDetail").textContent =
      total + "개 중 " + state.correctCount + "개 정답 (정답당 " + state.points + "점)";

    const pct = total ? state.correctCount / total : 0;
    let comment = "좋아요! 다음엔 더 잘할 수 있어요 💪";
    if (pct === 1) comment = "🏆 퍼펙트! 전부 다 맞혔어요!";
    else if (pct >= 0.8) comment = "🔥 대단해요! 거의 다 맞혔어요!";
    else if (pct >= 0.5) comment = "👍 절반 이상 성공!";
    document.getElementById("rComment").textContent = comment;

    showScreen(Screens.QUIZ_RESULT);
  }

  // ---- 버튼 연결 ----
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("qCorrectBtn").addEventListener("click", () => next(true));
    document.getElementById("qPassBtn").addEventListener("click", () => next(false));

    document.getElementById("rAgainBtn").addEventListener("click", () => start(state.category));
    document.getElementById("rCatsBtn").addEventListener("click", openCategories);

    // 키보드 단축키: → 또는 O = 정답, ← 또는 X = 패스
    document.addEventListener("keydown", (e) => {
      const playing = document.getElementById("screen-quiz-play").classList.contains("active");
      if (!playing) return;
      if (e.code === "ArrowRight" || e.key === "o" || e.key === "O") next(true);
      else if (e.code === "ArrowLeft" || e.key === "x" || e.key === "X") next(false);
    });
  });

  return { openCategories, start };
})();
