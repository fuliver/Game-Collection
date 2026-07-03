/* =========================================================================
 *  sfx.js - 효과음 (Web Audio로 즉석 생성, 오디오 파일 불필요)
 *  - 사용: SFX.correct(), SFX.wrong(), SFX.reveal(), SFX.bonus(), SFX.coin(),
 *          SFX.pop(), SFX.tick(), SFX.win(), SFX.click(), SFX.toggle()
 * ========================================================================= */
const SFX = (function () {
  let ctx = null;
  let enabled = true;
  try { enabled = localStorage.getItem("sfxOff") !== "1"; } catch (e) {}

  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // seq: [{ f, start, dur, type, vol }]
  function play(seq) {
    if (!enabled) return;
    const c = ac();
    if (!c) return;
    const now = c.currentTime;
    seq.forEach((n) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = n.type || "sine";
      o.frequency.value = n.f;
      const t0 = now + (n.start || 0);
      const dur = n.dur || 0.12;
      const vol = n.vol == null ? 0.2 : n.vol;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(vol, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g).connect(c.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.03);
    });
  }

  const T = 0.11;
  return {
    // 버튼 눌림 (짧은 틱)
    click() { play([{ f: 620, dur: 0.05, type: "square", vol: 0.06 }]); },
    // 정답 - 밝게 올라가는 3음
    correct() { play([
      { f: 523, dur: 0.1, type: "triangle", vol: 0.18 },
      { f: 659, start: 0.08, dur: 0.1, type: "triangle", vol: 0.18 },
      { f: 784, start: 0.16, dur: 0.16, type: "triangle", vol: 0.2 },
    ]); },
    // 오답/패스 - 내려가는 부저
    wrong() { play([
      { f: 220, dur: 0.16, type: "sawtooth", vol: 0.16 },
      { f: 160, start: 0.12, dur: 0.22, type: "sawtooth", vol: 0.16 },
    ]); },
    // 정답판 공개 - 반짝 딩!
    reveal() { play([
      { f: 880, dur: 0.1, type: "sine", vol: 0.2 },
      { f: 1320, start: 0.05, dur: 0.2, type: "sine", vol: 0.18 },
    ]); },
    // 보너스 - 팡파레
    bonus() { play([
      { f: 523, dur: T, type: "triangle", vol: 0.2 },
      { f: 659, start: T, dur: T, type: "triangle", vol: 0.2 },
      { f: 784, start: T * 2, dur: T, type: "triangle", vol: 0.2 },
      { f: 1046, start: T * 3, dur: 0.28, type: "triangle", vol: 0.22 },
    ]); },
    // 점수 획득 - 코인
    coin() { play([
      { f: 988, dur: 0.06, type: "square", vol: 0.16 },
      { f: 1319, start: 0.05, dur: 0.14, type: "square", vol: 0.16 },
    ]); },
    // 투표 탭 - 팝
    pop() { play([{ f: 440, dur: 0.05, type: "triangle", vol: 0.16 }, { f: 660, start: 0.04, dur: 0.08, type: "triangle", vol: 0.14 }]); },
    // 타이머 틱
    tick() { play([{ f: 1000, dur: 0.04, type: "square", vol: 0.08 }]); },
    // 라운드 종료 - 승리 팡파레
    win() { play([
      { f: 523, dur: T, type: "triangle", vol: 0.2 },
      { f: 659, start: T, dur: T, type: "triangle", vol: 0.2 },
      { f: 784, start: T * 2, dur: T, type: "triangle", vol: 0.2 },
      { f: 1046, start: T * 3, dur: T, type: "triangle", vol: 0.22 },
      { f: 1319, start: T * 4, dur: 0.34, type: "triangle", vol: 0.24 },
    ]); },

    isOn() { return enabled; },
    toggle() {
      enabled = !enabled;
      try { localStorage.setItem("sfxOff", enabled ? "0" : "1"); } catch (e) {}
      if (enabled) ac(); // 켤 때 오디오 컨텍스트 준비
      return enabled;
    },
  };
})();
