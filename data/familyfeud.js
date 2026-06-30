/* =========================================================================
 *  Family Feud (가족오락관 / 설문조사) 문제 데이터
 *  - 각 라운드: 설문 질문 + 답변(보통 6~8개), 답변마다 점수
 *  - 점수 합은 100에 가깝게 맞추는 것이 일반적이지만 자유롭게 가능
 *  - answers 는 점수가 높은 순으로 정렬해 두는 것을 추천
 * ========================================================================= */

const FAMILY_FEUD = {
  rounds: [
    {
      question: "‘여름’ 하면 떠오르는 것은?",
      answers: [
        { text: "바다/해수욕장", points: 30 },
        { text: "수박", points: 22 },
        { text: "에어컨/선풍기", points: 16 },
        { text: "휴가/여행", points: 12 },
        { text: "아이스크림/빙수", points: 10 },
        { text: "모기", points: 6 },
        { text: "장마/비", points: 4 },
      ],
    },
    {
      question: "아침에 일어나서 가장 먼저 하는 일은?",
      answers: [
        { text: "휴대폰 확인", points: 34 },
        { text: "화장실 가기", points: 24 },
        { text: "물 마시기", points: 14 },
        { text: "세수/양치", points: 12 },
        { text: "이불 정리", points: 8 },
        { text: "기지개/스트레칭", points: 8 },
      ],
    },
    {
      question: "친구를 부를 때 쓰는 별명/호칭은?",
      answers: [
        { text: "야!", points: 28 },
        { text: "이름 줄임말", points: 22 },
        { text: "친구야", points: 18 },
        { text: "형/누나/언니/오빠", points: 16 },
        { text: "별명", points: 10 },
        { text: "닉네임", points: 6 },
      ],
    },
    {
      question: "교회에서 가장 자주 듣는 단어는?",
      answers: [
        { text: "아멘", points: 30 },
        { text: "할렐루야", points: 22 },
        { text: "기도", points: 16 },
        { text: "사랑", points: 14 },
        { text: "은혜", points: 10 },
        { text: "감사", points: 8 },
      ],
    },
    // 새 라운드 추가 예시:
    // {
    //   question: "여기에 질문",
    //   answers: [
    //     { text: "답변1", points: 40 },
    //     { text: "답변2", points: 30 },
    //   ],
    // },
  ],
};
