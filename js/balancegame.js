/* =========================================================================
 *  balancegame.js - 밸런스 게임 로직
 *  - 두 선택지를 보여주고, 각 칸을 눌러 투표수를 집계 → 비율 막대 표시
 * ========================================================================= */
const BalanceGame = (function () {
  let index = 0;
  let votes = []; // 각 문제의 { a, b } 투표수

  function open() {
    index = 0;
    if (votes.length !== BALANCE_GAME.questions.length) {
      votes = BALANCE_GAME.questions.map(() => ({ a: 0, b: 0 }));
    }
    render();
    showScreen(Screens.BALANCE);
  }

  function render() {
    const q = BALANCE_GAME.questions[index];
    const v = votes[index];

    document.getElementById("balProgress").textContent =
      (index + 1) + " / " + BALANCE_GAME.questions.length;
    document.getElementById("balTextA").textContent = q.a;
    document.getElementById("balTextB").textContent = q.b;
    document.getElementById("balVotesA").textContent = v.a;
    document.getElementById("balVotesB").textContent = v.b;

    const total = v.a + v.b;
    const pctA = total ? Math.round((v.a / total) * 100) : 50;
    const pctB = 100 - pctA;
    document.getElementById("balBarFill").style.width = pctA + "%";
    document.getElementById("balPctA").textContent = total ? pctA + "%" : "–";
    document.getElementById("balPctB").textContent = total ? pctB + "%" : "–";

    // 우세한 쪽 강조
    const sideA = document.getElementById("balSideA");
    const sideB = document.getElementById("balSideB");
    sideA.classList.toggle("winning", total > 0 && v.a > v.b);
    sideB.classList.toggle("winning", total > 0 && v.b > v.a);

    document.getElementById("balPrevBtn").disabled = index === 0;
    document.getElementById("balNextBtn").disabled = index === BALANCE_GAME.questions.length - 1;
  }

  function vote(side) {
    votes[index][side]++;
    render();
  }
  function resetVotes() {
    votes[index] = { a: 0, b: 0 };
    render();
  }
  function go(delta) {
    const next = index + delta;
    if (next < 0 || next >= BALANCE_GAME.questions.length) return;
    index = next;
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("balSideA").addEventListener("click", () => vote("a"));
    document.getElementById("balSideB").addEventListener("click", () => vote("b"));
    document.getElementById("balResetBtn").addEventListener("click", resetVotes);
    document.getElementById("balPrevBtn").addEventListener("click", () => go(-1));
    document.getElementById("balNextBtn").addEventListener("click", () => go(1));
  });

  return { open };
})();
