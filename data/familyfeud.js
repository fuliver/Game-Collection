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
      question: "세계에서 가장 부자 순위 TOP10은?",
      // 출처: Forbes 실시간 부자 순위 (2026.07.01 기준). 번호 = 순위.
      answers: [
        { text: "일론 머스크 (테슬라/스페이스X)", points: 10 },
        { text: "래리 페이지 (구글)", points: 9 },
        { text: "세르게이 브린 (구글)", points: 8 },
        { text: "제프 베이조스 (아마존)", points: 7 },
        { text: "마이클 델 (델)", points: 6 },
        { text: "마크 저커버그 (메타)", points: 5 },
        { text: "래리 엘리슨 (오라클)", points: 4 },
        { text: "젠슨 황 (엔비디아)", points: 3 },
        { text: "베르나르 아르노 (루이비통)", points: 2 },
        { text: "워런 버핏 (버크셔 해서웨이)", points: 1 },
      ],
    },
    {
      question: "역대 한국영화 관객수 TOP10은?",
      // 출처: 위키백과 '대한민국의 영화 흥행 기록'(한국영화, 2026.07 기준). 번호 = 순위.
      answers: [
        { text: "명량 (2014)", points: 10 },
        { text: "왕과 사는 남자 (2026)", points: 9 },
        { text: "극한직업 (2019)", points: 8 },
        { text: "신과함께: 죄와 벌 (2017)", points: 7 },
        { text: "국제시장 (2014)", points: 6 },
        { text: "베테랑 (2015)", points: 5 },
        { text: "서울의 봄 (2023)", points: 4 },
        { text: "괴물 (2006)", points: 3 },
        { text: "도둑들 (2012)", points: 2 },
        { text: "7번방의 선물 (2013)", points: 1 },
      ],
    },
    {
      question: "세계에서 인구가 가장 많은 나라 TOP10은?",
      // 출처: Worldometer 2026 인구 순위. 번호 = 순위.
      answers: [
        { text: "인도", points: 10 },
        { text: "중국", points: 9 },
        { text: "미국", points: 8 },
        { text: "인도네시아", points: 7 },
        { text: "파키스탄", points: 6 },
        { text: "나이지리아", points: 5 },
        { text: "브라질", points: 4 },
        { text: "방글라데시", points: 3 },
        { text: "러시아", points: 2 },
        { text: "멕시코", points: 1 },
      ],
    },
    {
      question: "성경에 가장 많이 나오는 단어 TOP10은? (조사·접속사 제외)",
      // 출처: 개역 성경 단어 빈도. 상위 3~4개는 확실, 이하 순서는 대략치. 번호 = 순위.
      answers: [
        { text: "여호와 (약 7,000회)", points: 10 },
        { text: "하나님 (약 4,000회)", points: 9 },
        { text: "이스라엘 (약 2,500회)", points: 8 },
        { text: "왕", points: 7 },
        { text: "사람", points: 6 },
        { text: "백성", points: 5 },
        { text: "아들", points: 4 },
        { text: "예수 (약 1,300회)", points: 3 },
        { text: "다윗", points: 2 },
        { text: "땅", points: 1 },
      ],
    },
  ],
};
