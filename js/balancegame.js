/* =========================================================================
 *  balancegame.js - 밸런스 게임 로직
 *  - 기본: 화면에서 양쪽 칸을 눌러 집계
 *  - 실시간 모드(Firebase): QR 스캔 → 참가자 폰에서 투표 → 실시간 집계
 * ========================================================================= */
const BalanceGame = (function () {
  let index = 0;
  let votes = [];          // 로컬(화면 집계) 모드용 { a, b }
  let live = false;        // 실시간 모드 여부
  let room = null;         // 방 코드
  let liveVotes = { a: 0, b: 0 };
  let votesRef = null;     // 현재 질문 투표 구독
  let membersRef = null;   // 참여 인원 구독

  function open() {
    index = 0;
    if (votes.length !== BALANCE_GAME.questions.length) {
      votes = BALANCE_GAME.questions.map(() => ({ a: 0, b: 0 }));
    }
    render();
    showScreen(Screens.BALANCE);
  }

  // 현재 질문의 투표수 { a, b } 반환 (모드에 따라)
  function currentCounts() {
    return live ? liveVotes : votes[index];
  }

  function render() {
    const q = BALANCE_GAME.questions[index];
    const v = currentCounts();

    document.getElementById("balProgress").textContent =
      (index + 1) + " / " + BALANCE_GAME.questions.length;
    document.getElementById("balTextA").textContent = q.a;
    document.getElementById("balTextB").textContent = q.b;
    document.getElementById("balVotesA").textContent = v.a;
    document.getElementById("balVotesB").textContent = v.b;
    document.getElementById("balVoteCount").textContent = v.a + v.b;

    const total = v.a + v.b;
    const pctA = total ? Math.round((v.a / total) * 100) : 50;
    const pctB = 100 - pctA;
    document.getElementById("balBarFill").style.width = pctA + "%";
    document.getElementById("balPctA").textContent = total ? pctA + "%" : "–";
    document.getElementById("balPctB").textContent = total ? pctB + "%" : "–";

    const sideA = document.getElementById("balSideA");
    const sideB = document.getElementById("balSideB");
    sideA.classList.toggle("winning", total > 0 && v.a > v.b);
    sideB.classList.toggle("winning", total > 0 && v.b > v.a);

    document.getElementById("balPrevBtn").disabled = index === 0;
    document.getElementById("balNextBtn").disabled = index === BALANCE_GAME.questions.length - 1;

    // 실시간 모드에서는 화면 탭 안내를 숨김
    document.querySelectorAll("#screen-balance .bal-tap").forEach((el) => {
      el.style.display = live ? "none" : "";
    });
  }

  // ---- 로컬(화면) 투표 ----
  function vote(side) {
    if (live) return; // 실시간 모드에서는 폰으로만 투표
    if (typeof SFX !== "undefined") SFX.pop();
    votes[index][side]++;
    render();
  }
  function resetVotes() {
    if (live && room) {
      Live.ref("rooms/" + room + "/votes/" + index).remove();
    } else {
      votes[index] = { a: 0, b: 0 };
      render();
    }
  }
  function go(delta) {
    const next = index + delta;
    if (next < 0 || next >= BALANCE_GAME.questions.length) return;
    index = next;
    if (live && room) {
      Live.ref("rooms/" + room + "/current").set(index);
      attachVotesListener();
    }
    render();
  }

  // ---- 실시간 모드 ----
  function enableLive() {
    if (!Live.available()) {
      alert(
        "실시간 투표를 켜려면 Firebase 설정이 필요해요.\n\n" +
        "js/firebase-config.js 파일을 열어 본인 프로젝트 값을 채워주세요.\n" +
        "(자세한 방법은 파일 안 설명과 README를 참고하세요)"
      );
      return;
    }
    room = Live.newRoomCode();
    live = true;
    liveVotes = { a: 0, b: 0 };

    // 방 초기화: 현재 질문 인덱스 기록
    Live.ref("rooms/" + room + "/current").set(index);

    // 참여 인원 구독
    membersRef = Live.ref("rooms/" + room + "/members");
    membersRef.on("value", (snap) => {
      const n = snap.exists() ? Object.keys(snap.val()).length : 0;
      document.getElementById("balJoinCount").textContent = n;
    });

    attachVotesListener();
    renderQR();

    document.getElementById("balRoomCode").textContent = room;
    document.getElementById("balMode").textContent = "📱 실시간 투표";
    document.getElementById("balLiveBtn").hidden = true;
    document.getElementById("balLivePanel").hidden = false;
    render();
  }

  function disableLive() {
    detachVotesListener();
    if (membersRef) { membersRef.off(); membersRef = null; }
    if (room) Live.ref("rooms/" + room).remove();
    live = false; room = null; liveVotes = { a: 0, b: 0 };
    document.getElementById("balMode").textContent = "🖐️ 화면 집계";
    document.getElementById("balLiveBtn").hidden = false;
    document.getElementById("balLivePanel").hidden = true;
    render();
  }

  function attachVotesListener() {
    detachVotesListener();
    votesRef = Live.ref("rooms/" + room + "/votes/" + index);
    votesRef.on("value", (snap) => {
      const data = snap.val() || {};
      let a = 0, b = 0;
      Object.keys(data).forEach((k) => { if (data[k] === "a") a++; else if (data[k] === "b") b++; });
      liveVotes = { a: a, b: b };
      render();
    });
  }
  function detachVotesListener() {
    if (votesRef) { votesRef.off(); votesRef = null; }
  }

  function renderQR() {
    const dir = location.pathname.replace(/[^/]*$/, "");
    const url = location.origin + dir + "vote.html?room=" + room;
    document.getElementById("balVoteUrl").textContent = url;
    const box = document.getElementById("balQr");
    box.innerHTML = "";
    if (typeof QRCode !== "undefined") {
      new QRCode(box, { text: url, width: 168, height: 168, colorDark: "#2c2350", colorLight: "#ffffff" });
    } else {
      box.textContent = "QR 로드 실패";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("balSideA").addEventListener("click", () => vote("a"));
    document.getElementById("balSideB").addEventListener("click", () => vote("b"));
    document.getElementById("balResetBtn").addEventListener("click", resetVotes);
    document.getElementById("balPrevBtn").addEventListener("click", () => go(-1));
    document.getElementById("balNextBtn").addEventListener("click", () => go(1));
    document.getElementById("balLiveBtn").addEventListener("click", enableLive);
    document.getElementById("balLiveOffBtn").addEventListener("click", disableLive);
  });

  return { open };
})();
