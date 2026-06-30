/* =========================================================================
 *  familyfeud.js - Family Feud 로직
 *  - 답변 슬롯 클릭 → 공개 + 현재 라운드 합계(pot)에 점수 적립
 *  - 스트라이크 ✕ 3개
 *  - "+ 라운드 점수" 버튼으로 pot을 팀 점수로 전달
 * ========================================================================= */
const FamilyFeud = (function () {
  let roundIndex = 0;
  let pot = 0;
  let strikes = 0;
  let opened = []; // 각 답변 공개 여부
  const teams = { a: 0, b: 0 };

  function open() {
    roundIndex = 0;
    teams.a = 0;
    teams.b = 0;
    updateTeamScores();
    loadRound(0);
    showScreen(Screens.FEUD);
  }

  function loadRound(i) {
    const rounds = FAMILY_FEUD.rounds;
    if (i < 0 || i >= rounds.length) return;
    roundIndex = i;
    pot = 0;
    strikes = 0;
    const round = rounds[i];
    opened = round.answers.map(() => false);

    document.getElementById("feudQuestion").textContent = round.question;
    document.getElementById("feudRoundInfo").textContent =
      "라운드 " + (i + 1) + " / " + rounds.length;

    renderBoard();
    updatePot();
    renderStrikes();

    document.getElementById("feudPrevBtn").disabled = i === 0;
    document.getElementById("feudNextBtn").disabled = i === rounds.length - 1;
  }

  function renderBoard() {
    const round = FAMILY_FEUD.rounds[roundIndex];
    const board = document.getElementById("feudBoard");
    board.innerHTML = "";
    round.answers.forEach((ans, idx) => {
      const slot = document.createElement("div");
      slot.className = "feud-slot " + (opened[idx] ? "open" : "closed");
      slot.innerHTML =
        '<div class="num">' + (idx + 1) + "</div>" +
        '<div class="label">' + ans.text + "</div>" +
        '<div class="pts">' + ans.points + "</div>";
      slot.addEventListener("click", () => toggleAnswer(idx));
      board.appendChild(slot);
    });
  }

  function toggleAnswer(idx) {
    const ans = FAMILY_FEUD.rounds[roundIndex].answers[idx];
    if (!opened[idx]) {
      opened[idx] = true;
      pot += ans.points;
    } else {
      // 잘못 눌렀을 때 되돌리기
      opened[idx] = false;
      pot -= ans.points;
    }
    renderBoard();
    updatePot();
  }

  function revealAll() {
    const round = FAMILY_FEUD.rounds[roundIndex];
    round.answers.forEach((ans, idx) => {
      if (!opened[idx]) {
        opened[idx] = true;
        pot += ans.points;
      }
    });
    renderBoard();
    updatePot();
  }

  function updatePot() {
    document.getElementById("feudPot").textContent = pot;
  }

  // ---- 스트라이크 ----
  function addStrike() {
    if (strikes < 3) strikes++;
    renderStrikes();
  }
  function clearStrikes() {
    strikes = 0;
    renderStrikes();
  }
  function renderStrikes() {
    const els = document.querySelectorAll("#feudStrikes .strike");
    els.forEach((el, i) => el.classList.toggle("on", i < strikes));
  }

  // ---- 팀 점수 ----
  function givePotTo(team) {
    teams[team] += pot;
    pot = 0;
    updatePot();
    updateTeamScores();
  }
  function updateTeamScores() {
    document.getElementById("teamAScore").textContent = teams.a;
    document.getElementById("teamBScore").textContent = teams.b;
  }

  // ---- 버튼 연결 ----
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("feudStrikeBtn").addEventListener("click", addStrike);
    document.getElementById("feudClearStrikeBtn").addEventListener("click", clearStrikes);
    document.getElementById("feudRevealAllBtn").addEventListener("click", revealAll);
    document.getElementById("feudPrevBtn").addEventListener("click", () => loadRound(roundIndex - 1));
    document.getElementById("feudNextBtn").addEventListener("click", () => loadRound(roundIndex + 1));

    document.querySelectorAll('[data-add="pot"]').forEach((btn) => {
      btn.addEventListener("click", () => givePotTo(btn.dataset.team));
    });
  });

  return { open };
})();
