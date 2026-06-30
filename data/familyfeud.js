/* =========================================================================
 *  Family Feud (가족오락관 / 설문조사) 문제 데이터
 *  - 각 라운드: 설문 질문 + 답변 10개, 답변마다 점수
 *  - 점수는 순위순: 1위 10점 → 10위 1점
 *  - ⭐ 리스트의 "마지막(10번째)" 답을 맞춘 팀에게 +50점 보너스가 주어집니다.
 * ========================================================================= */

const FAMILY_FEUD = {
  rounds: [
    {
      question: "2026 산리오 캐릭터 종합 인기순위 TOP10은?",
      // 출처: 2026 산리오 캐릭터 대상 최종 결과(2026.06.28 발표). 번호 = 순위.
      answers: [
        { text: "폼폼푸린", points: 10 },
        { text: "시나모롤", points: 9 },
        { text: "포차코", points: 8 },
        { text: "쿠로미", points: 7 },
        { text: "헬로키티", points: 6 },
        { text: "아히루노페클", points: 5 },
        { text: "마이멜로디", points: 4 },
        { text: "턱시도샘", points: 3 },
        { text: "한교동", points: 2 },
        { text: "리틀트윈스타", points: 1 },
      ],
    },
    {
      question: "아침에 일어나서 가장 먼저 하는 일은?",
      answers: [
        { text: "휴대폰 확인", points: 10 },
        { text: "화장실 가기", points: 9 },
        { text: "물 마시기", points: 8 },
        { text: "세수/양치", points: 7 },
        { text: "이불 정리", points: 6 },
        { text: "기지개/스트레칭", points: 5 },
        { text: "알람 끄기", points: 4 },
        { text: "커피/차 마시기", points: 3 },
        { text: "창문 열기", points: 2 },
        { text: "다시 잠들기", points: 1 },
      ],
    },
    {
      question: "친구를 부를 때 쓰는 별명/호칭은?",
      answers: [
        { text: "야!", points: 10 },
        { text: "이름 줄임말", points: 9 },
        { text: "친구야", points: 8 },
        { text: "형/누나/언니/오빠", points: 7 },
        { text: "별명", points: 6 },
        { text: "닉네임", points: 5 },
        { text: "짜식/임마", points: 4 },
        { text: "자기야", points: 3 },
        { text: "얘/쟤", points: 2 },
        { text: "풀네임", points: 1 },
      ],
    },
    {
      question: "교회에서 가장 자주 듣는 단어는?",
      answers: [
        { text: "아멘", points: 10 },
        { text: "할렐루야", points: 9 },
        { text: "기도", points: 8 },
        { text: "사랑", points: 7 },
        { text: "은혜", points: 6 },
        { text: "감사", points: 5 },
        { text: "축복", points: 4 },
        { text: "믿음", points: 3 },
        { text: "천국", points: 2 },
        { text: "평안", points: 1 },
      ],
    },
    // 새 라운드 추가 예시 (답변 10개, 점수 10→1 권장):
    // {
    //   question: "여기에 질문",
    //   answers: [
    //     { text: "답변1", points: 10 },
    //     { text: "답변2", points: 9 },
    //     // ... 10개 (마지막 1점)
    //   ],
    // },
  ],
};
