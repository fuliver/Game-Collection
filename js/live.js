/* =========================================================================
 *  live.js - Firebase 실시간 공용 헬퍼 (호스트/참가자 공통)
 *  - 설정이 없거나 SDK가 없으면 available() 이 false → 실시간 기능 OFF
 * ========================================================================= */
const Live = (function () {
  let db = null;
  let ready = false;
  let tried = false;

  function init() {
    if (ready) return true;
    if (tried) return ready;
    tried = true;
    try {
      if (typeof firebase === "undefined") return false;
      if (typeof FIREBASE_CONFIG === "undefined" || !FIREBASE_CONFIG.databaseURL) return false;
      if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.database();
      ready = true;
    } catch (e) {
      console.error("[Live] Firebase 초기화 실패:", e);
      ready = false;
    }
    return ready;
  }

  function available() { return init(); }
  function ref(path) { return db.ref(path); }

  // 기기 고유 id (중복 투표 방지 & 참여 인원 집계용)
  function deviceId() {
    let id = null;
    try { id = localStorage.getItem("balanceDeviceId"); } catch (e) {}
    if (!id) {
      id = "d" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
      try { localStorage.setItem("balanceDeviceId", id); } catch (e) {}
    }
    return id;
  }

  // 방 코드 4자리 (헷갈리는 글자 제외)
  function newRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  return { available, ref, deviceId, newRoomCode };
})();
