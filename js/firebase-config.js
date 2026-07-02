/* =========================================================================
 *  Firebase 설정 (실시간 투표용)
 *  ------------------------------------------------------------------------
 *  ★ 아래 값들을 본인 Firebase 프로젝트 값으로 채워야 실시간 투표가 켜집니다.
 *
 *  [설정 방법]
 *   1) https://console.firebase.google.com 접속 → "프로젝트 만들기"(무료)
 *   2) 왼쪽 메뉴 "빌드 > Realtime Database" → "데이터베이스 만들기"
 *      - 위치는 아무거나, "테스트 모드로 시작" 선택 (또는 아래 규칙 사용)
 *   3) 프로젝트 설정(⚙️) > "내 앱" > 웹앱(</>) 추가 → firebaseConfig 값 복사
 *   4) 아래 빈칸에 붙여넣기 (특히 databaseURL 은 반드시 필요!)
 *
 *  [Realtime Database 규칙] (테스트/게임용 - 누구나 읽고 쓰기 허용)
 *   {
 *     "rules": {
 *       "rooms": { ".read": true, ".write": true }
 *     }
 *   }
 *
 *  값을 비워두면 실시간 기능은 꺼지고, 밸런스 게임은 "화면에서 직접 집계"
 *  모드로 그대로 동작합니다.
 * ========================================================================= */

const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",   // 예: https://내프로젝트-default-rtdb.firebaseio.com
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
