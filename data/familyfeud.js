/* =========================================================================
 *  Family Feud (가족오락관 / 설문조사) 문제 데이터
 *  - 각 라운드: 설문 질문 + 답변 10개, 답변마다 점수
 *  - answers 는 점수가 높은 순으로 정렬 (마지막 10번째가 가장 어려운 답)
 *  - ⭐ 리스트의 "마지막(10번째)" 답을 맞춘 팀에게 +50점 보너스가 주어집니다.
 * ========================================================================= */

const FAMILY_FEUD = {
  rounds: [
    {
      question: "‘여름’ 하면 떠오르는 것은?",
      answers: [
        { text: "바다/해수욕장", points: 25 },
        { text: "수박", points: 18 },
        { text: "에어컨/선풍기", points: 14 },
        { text: "휴가/여행", points: 11 },
        { text: "아이스크림/빙수", points: 9 },
        { text: "모기", points: 7 },
        { text: "장마/비", points: 5 },
        { text: "더위/땀", points: 4 },
        { text: "물놀이/계곡", points: 3 },
        { text: "매미", points: 2 },
      ],
    },
    {
      question: "아침에 일어나서 가장 먼저 하는 일은?",
      answers: [
        { text: "휴대폰 확인", points: 26 },
        { text: "화장실 가기", points: 20 },
        { text: "물 마시기", points: 12 },
        { text: "세수/양치", points: 11 },
        { text: "이불 정리", points: 8 },
        { text: "기지개/스트레칭", points: 7 },
        { text: "알람 끄기", points: 6 },
        { text: "커피/차 마시기", points: 4 },
        { text: "창문 열기", points: 3 },
        { text: "다시 잠들기", points: 3 },
      ],
    },
    {
      question: "친구를 부를 때 쓰는 별명/호칭은?",
      answers: [
        { text: "야!", points: 22 },
        { text: "이름 줄임말", points: 18 },
        { text: "친구야", points: 14 },
        { text: "형/누나/언니/오빠", points: 13 },
        { text: "별명", points: 10 },
        { text: "닉네임", points: 8 },
        { text: "짜식/임마", points: 6 },
        { text: "자기야", points: 4 },
        { text: "얘/쟤", points: 3 },
        { text: "풀네임", points: 2 },
      ],
    },
    {
      question: "교회에서 가장 자주 듣는 단어는?",
      answers: [
        { text: "아멘", points: 24 },
        { text: "할렐루야", points: 18 },
        { text: "기도", points: 14 },
        { text: "사랑", points: 12 },
        { text: "은혜", points: 10 },
        { text: "감사", points: 8 },
        { text: "축복", points: 6 },
        { text: "믿음", points: 4 },
        { text: "천국", points: 2 },
        { text: "평안", points: 2 },
      ],
    },
    // 새 라운드 추가 예시 (답변 10개 권장):
    // {
    //   question: "여기에 질문",
    //   answers: [
    //     { text: "답변1", points: 25 },
    //     { text: "답변2", points: 18 },
    //     // ... 10개
    //   ],
    // },
  ],
};
