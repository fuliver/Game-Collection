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
      question: "인스타그램 팔로워가 가장 많은 인물 TOP10은?",
      // 출처: 위키백과 '최다 팔로워 인스타그램 계정'(2026.06 기준, 개인만). 번호 = 순위.
      answers: [
        { text: "크리스티아누 호날두", points: 10 },
        { text: "리오넬 메시", points: 9 },
        { text: "셀레나 고메즈", points: 8 },
        { text: "드웨인 존슨 (더 락)", points: 7 },
        { text: "카일리 제너", points: 6 },
        { text: "아리아나 그란데", points: 5 },
        { text: "킴 카다시안", points: 4 },
        { text: "비욘세", points: 3 },
        { text: "클로이 카다시안", points: 2 },
        { text: "저스틴 비버", points: 1 },
      ],
    },
    {
      question: "넷플릭스 역대 최고 인기 시리즈 TOP10은?",
      // 출처: 넷플릭스 공식 조회수(91일) 기준. 상위권은 확실, 6~10위는 수시 변동 가능. 번호 = 순위.
      answers: [
        { text: "오징어 게임 시즌1", points: 10 },
        { text: "웬즈데이 시즌1", points: 9 },
        { text: "아뒬레센스", points: 8 },
        { text: "기묘한 이야기 시즌4", points: 7 },
        { text: "몬스터: 다머 이야기", points: 6 },
        { text: "브리저튼 시즌3", points: 5 },
        { text: "오징어 게임 시즌2", points: 4 },
        { text: "브리저튼 시즌2", points: 3 },
        { text: "종이의 집 파트5", points: 2 },
        { text: "기묘한 이야기 시즌5", points: 1 },
      ],
    },
    {
      question: "예수님의 12제자를 모두 대보세요! (순위 없음)",
      // 순위가 아니라 12명 전부 맞히는 라운드. 점수는 익숙한 순으로 임의 배정.
      answers: [
        { text: "베드로", points: 12 },
        { text: "요한", points: 11 },
        { text: "가룟 유다", points: 10 },
        { text: "안드레", points: 9 },
        { text: "야고보 (세베대의 아들)", points: 8 },
        { text: "도마", points: 7 },
        { text: "마태", points: 6 },
        { text: "빌립", points: 5 },
        { text: "바돌로매 (나다나엘)", points: 4 },
        { text: "야고보 (알패오의 아들)", points: 3 },
        { text: "다대오 (유다)", points: 2 },
        { text: "시몬 (셀롯인)", points: 1 },
      ],
    },
  ],
};
