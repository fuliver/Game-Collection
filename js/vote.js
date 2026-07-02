/* =========================================================================
 *  vote.js - 참가자(휴대폰) 투표 페이지 로직
 *  - URL ?room=코드 로 접속 → 현재 질문 표시 → A/B 탭 → 투표 기록
 * ========================================================================= */
(function () {
  const params = new URLSearchParams(location.search);
  const room = (params.get("room") || "").toUpperCase();

  const qEl = document.getElementById("vQ");
  const aEl = document.getElementById("vOptA");
  const bEl = document.getElementById("vOptB");
  const statusEl = document.getElementById("vStatus");
  const roomEl = document.getElementById("vRoom");
  roomEl.textContent = room ? "(" + room + ")" : "";

  let currentIndex = -1;
  let myChoice = null;

  function fail(msg) {
    qEl.textContent = "😥 " + msg;
    statusEl.textContent = "";
  }

  if (!room) return fail("잘못된 접속이에요. QR을 다시 스캔해 주세요.");
  if (!Live.available()) return fail("실시간 서버 설정이 필요해요. (관리자에게 문의)");

  const deviceId = Live.deviceId();

  // 참여 인원 등록
  Live.ref("rooms/" + room + "/members/" + deviceId).set(true);

  // 현재 질문 인덱스 구독
  Live.ref("rooms/" + room + "/current").on("value", (snap) => {
    if (!snap.exists()) { fail("게임이 아직 시작되지 않았어요."); return; }
    const idx = snap.val();
    if (idx === currentIndex) return;
    currentIndex = idx;
    myChoice = null;
    renderQuestion();
    watchMyVote();
  });

  function renderQuestion() {
    const q = BALANCE_GAME.questions[currentIndex];
    if (!q) { fail("질문을 찾을 수 없어요."); return; }
    qEl.textContent = "Q" + (currentIndex + 1) + ". 당신의 선택은?";
    aEl.textContent = q.a;
    bEl.textContent = q.b;
    aEl.disabled = false;
    bEl.disabled = false;
    aEl.classList.remove("chosen");
    bEl.classList.remove("chosen");
    statusEl.textContent = "마음에 드는 쪽을 눌러주세요!";
  }

  // 내 이전 투표 반영 (질문 바뀌면 새로 확인)
  function watchMyVote() {
    Live.ref("rooms/" + room + "/votes/" + currentIndex + "/" + deviceId)
      .once("value", (snap) => {
        if (snap.exists()) applyChoice(snap.val(), false);
      });
  }

  function applyChoice(choice, write) {
    myChoice = choice;
    aEl.classList.toggle("chosen", choice === "a");
    bEl.classList.toggle("chosen", choice === "b");
    statusEl.textContent = "✅ 투표 완료! (다시 눌러 변경 가능)";
    if (write) {
      Live.ref("rooms/" + room + "/votes/" + currentIndex + "/" + deviceId).set(choice);
    }
  }

  aEl.addEventListener("click", () => applyChoice("a", true));
  bEl.addEventListener("click", () => applyChoice("b", true));
})();
