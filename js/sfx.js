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

  const T = 0.12;
  return {
    // 버튼 눌림 (아주 짧고 부드러운 틱)
    click() { play([{ f: 480, dur: 0.035, type: "sine", vol: 0.05 }]); },
    // 정답 - "딩~동" (초인종처럼 높은음 → 낮은음)
    correct() { play([
      { f: 988, dur: 0.2, type: "sine", vol: 0.28 },   // 딩
      { f: 740, start: 0.17, dur: 0.4, type: "sine", vol: 0.28 }, // 동
    ]); },
    // 오답 - "삐!!!" (길고 강한 부저)
    wrong() { play([
      { f: 300, dur: 0.5, type: "square", vol: 0.22 },
      { f: 150, dur: 0.5, type: "sawtooth", vol: 0.12 },
    ]); },
    // 정답판 공개 - 위로 올라가듯 밝은 딩 (낮은음 → 높은음)
    reveal() { play([
      { f: 660, dur: 0.09, type: "sine", vol: 0.22 },
      { f: 990, start: 0.07, dur: 0.22, type: "sine", vol: 0.2 },
    ]); },
    // 보너스 - 밝은 팡파레
    bonus() { play([
      { f: 659, dur: T, type: "triangle", vol: 0.22 },
      { f: 880, start: T, dur: T, type: "triangle", vol: 0.22 },
      { f: 1047, start: T * 2, dur: T, type: "triangle", vol: 0.22 },
      { f: 1319, start: T * 3, dur: 0.3, type: "triangle", vol: 0.24 },
    ]); },
    // 점수 획득 - 코인
    coin() { play([
      { f: 988, dur: 0.06, type: "square", vol: 0.15 },
      { f: 1319, start: 0.05, dur: 0.14, type: "square", vol: 0.15 },
    ]); },
    // 투표 탭 - 부드러운 팝
    pop() { play([{ f: 520, dur: 0.05, type: "sine", vol: 0.16 }, { f: 780, start: 0.04, dur: 0.08, type: "sine", vol: 0.13 }]); },
    // 타이머 틱 (은은하게)
    tick() { play([{ f: 900, dur: 0.035, type: "sine", vol: 0.07 }]); },
    // 라운드 종료 - 승리 팡파레
    win() { play([
      { f: 523, dur: T, type: "triangle", vol: 0.2 },
      { f: 659, start: T, dur: T, type: "triangle", vol: 0.2 },
      { f: 784, start: T * 2, dur: T, type: "triangle", vol: 0.2 },
      { f: 1047, start: T * 3, dur: T, type: "triangle", vol: 0.22 },
      { f: 1319, start: T * 4, dur: 0.36, type: "triangle", vol: 0.24 },
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
