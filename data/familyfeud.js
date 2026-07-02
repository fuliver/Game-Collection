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
      question: "성경(영어 KJV)에 가장 많이 나오는 단어 TOP10은? (the/and 등 제외)",
      // 출처: Flerlage Twins 'Word Analysis: The Bible' (영어 KJV, 불용어 제외). 번호 = 순위.
      answers: [
        { text: "주님 (Lord)", points: 10 },
        { text: "하나님 (God)", points: 9 },
        { text: "아들 (son)", points: 8 },
        { text: "왕 (king)", points: 7 },
        { text: "민족 (people)", points: 6 },
        { text: "사람 (man)", points: 5 },
        { text: "이스라엘 (Israel)", points: 4 },
        { text: "남자들 (men)", points: 3 },
        { text: "땅 (land)", points: 2 },
        { text: "예수님 (Jesus)", points: 1 },
      ],
    },
    {
      question: "2025 멜론 연간차트(국내) TOP10은?",
      // 출처: 멜론 2025 국내 연간차트. 곡 목록은 확실, 4~9위 순서는 근사. 번호 = 순위.
      answers: [
        { text: "Drowning - 우즈(WOODZ)", points: 10 },
        { text: "HOME SWEET HOME - 지드래곤", points: 9 },
        { text: "Whiplash - 에스파", points: 8 },
        { text: "Die With A Smile - 레이디가가&브루노마스", points: 7 },
        { text: "APT. - 로제&브루노마스", points: 6 },
        { text: "like JENNIE - 제니", points: 5 },
        { text: "오늘만 I LOVE YOU - 보이넥스트도어", points: 4 },
        { text: "HAPPY - 데이식스", points: 3 },
        { text: "IRIS OUT", points: 2 },
        { text: "너에게 닿기를 - 10CM", points: 1 },
      ],
    },
    {
      question: "외국인이 좋아하는 한식 TOP10은?",
      // 출처: 2024 해외 18개 도시 한식 소비자 조사(치킨~고기구이). 9~10위는 최근 조사 참고. 번호 = 순위.
      answers: [
        { text: "K-치킨", points: 10 },
        { text: "라면", points: 9 },
        { text: "김치", points: 8 },
        { text: "비빔밥", points: 7 },
        { text: "불고기", points: 6 },
        { text: "김밥", points: 5 },
        { text: "떡볶이", points: 4 },
        { text: "삼겹살", points: 3 },
        { text: "김치볶음밥", points: 2 },
        { text: "잡채", points: 1 },
      ],
    },
    {
      question: "넷플릭스 한국 오리지널 드라마 인기작 TOP10은?",
      // 출처: 넷플릭스 조회수 기준(오리지널 한국 시리즈). 1위는 확실, 이하 순서는 근사. 번호 = 순위.
      answers: [
        { text: "오징어 게임", points: 10 },
        { text: "지금 우리 학교는", points: 9 },
        { text: "더 글로리", points: 8 },
        { text: "폭싹 속았수다", points: 7 },
        { text: "스위트홈", points: 6 },
        { text: "킹덤", points: 5 },
        { text: "지옥", points: 4 },
        { text: "트라우마 코드", points: 3 },
        { text: "마스크걸", points: 2 },
        { text: "정신병동에도 아침이 와요", points: 1 },
      ],
    },
  ],
};
