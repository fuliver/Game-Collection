/* =========================================================================
 *  familyfeud.js - Family Feud 로직
 *  - 답변 슬롯 클릭 → 공개 + 현재 라운드 합계(pot)에 점수 적립
 *  - "+ 라운드 점수" 버튼으로 pot을 팀 점수로 전달
 *  - 마지막 칸 정답을 맞힌 팀에게 +45 보너스
 * ========================================================================= */
const FamilyFeud = (function () {
  const LAST_BONUS = 45; // 리스트의 마지막 답을 맞춘 팀에게 주는 보너스 점수

  let roundIndex = 0;
  let pot = 0;
  let opened = []; // 각 답변 공개 여부
  let bonusGiven = false; // 이번 라운드에서 마지막정답 보너스를 이미 줬는지
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
    bonusGiven = false;
    const round = rounds[i];
    opened = round.answers.map(() => false);

    document.getElementById("feudQuestion").textContent = round.question;
    document.getElementById("feudRoundInfo").textContent =
      "라운드 " + (i + 1) + " / " + rounds.length +
      "  ·  ⭐ 마지막 정답을 맞춘 팀 +" + LAST_BONUS + "점";

    renderBoard();
    updatePot();
    updateBonusButtons();

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
      if (typeof SFX !== "undefined") SFX.reveal();
    } else {
      // 잘못 눌렀을 때 되돌리기
      opened[idx] = false;
      pot -= ans.points;
    }
    renderBoard();
    updatePot();
    updateBonusButtons();
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
    updateBonusButtons();
  }

  // ---- 마지막 정답 보너스 ----
  // 리스트의 마지막(가장 어려운) 답이 공개되면 +50 버튼이 활성화됩니다.
  function lastAnswerOpen() {
    return opened.length > 0 && opened[opened.length - 1];
  }
  function updateBonusButtons() {
    const enabled = lastAnswerOpen() && !bonusGiven;
    document.querySelectorAll('[data-add="bonus"]').forEach((btn) => {
      btn.disabled = !enabled;
    });
  }
  function giveBonus(team) {
    if (bonusGiven || !lastAnswerOpen()) return;
    teams[team] += LAST_BONUS;
    bonusGiven = true;
    if (typeof SFX !== "undefined") SFX.bonus();
    updateTeamScores();
    updateBonusButtons();
  }

  function updatePot() {
    document.getElementById("feudPot").textContent = pot;
  }

  // ---- 팀 점수 ----
  function givePotTo(team) {
    if (pot > 0 && typeof SFX !== "undefined") SFX.coin();
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
    document.getElementById("feudRevealAllBtn").addEventListener("click", revealAll);
    document.getElementById("feudPrevBtn").addEventListener("click", () => loadRound(roundIndex - 1));
    document.getElementById("feudNextBtn").addEventListener("click", () => loadRound(roundIndex + 1));

    document.querySelectorAll('[data-add="pot"]').forEach((btn) => {
      btn.addEventListener("click", () => givePotTo(btn.dataset.team));
    });
    document.querySelectorAll('[data-add="bonus"]').forEach((btn) => {
      btn.addEventListener("click", () => giveBonus(btn.dataset.team));
    });
  });

  return { open };
})();
