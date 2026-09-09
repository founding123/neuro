/* ============================================================
   사이트 설정 — 강의 정보의 단일 출처

   ▣ 구조 요약 (정보는 한 곳에만 적는다)
       TOC_ENC        번호 → [강의 제목, 교수 이름]   ← 강의 목록의 전부
       PROF_NOTE_ENC  교수 이름 → 한 줄 평
       SITE_ENC       사이트 문구 (제목·강조어·라벨·태그라인·과목명)

     예전의 PAGE_NUMBERS 배열은 없어졌다. 페이지 번호 목록은
     TOC_ENC의 키에서 자동으로 나온다. PROF_ENC도 필요 없다 —
     교수 이름이 TOC_ENC 안에 함께 있기 때문이다.

   ▣ 새 페이지 추가하는 법 (이제 두 단계뿐)
     1) 파일을 neuroNNNN.html 이름으로 올린다.
        예) neuro0100.html, neuro3050.html
     2) 아래 TOC_ENC에 한 줄을 추가한다.
        예) "3050": ["새 강의 제목", "홍길동"],
     끝. 목차·이전/다음 페이저·문항 페이지 h1·교수별 묶기가
     전부 이 한 줄을 읽는다.

   ▣ TOC_ENC 항목 형식
       "번호": ["강의 제목", "교수 이름"]

     · 교수 칸("")을 비워 두면: 예전 방식대로 그 페이지의
       pageMetaPayload subtitle("22: 이름;")을 내려받아 읽는다.
       (기존에 배포한 파일들은 그대로 동작한다는 뜻)
     · 교수 칸을 채우면: 파일을 하나도 내려받지 않고 즉시
       교수별 묶기가 된다. 채우는 쪽을 권장.
     · 옛 형식 "번호": "강의 제목" (문자열만)도 계속 읽힌다.
     · 교수 이름 뒤에 부가 정보를 붙이려면 구분자를 하나 둔다.
       구분자부터 뒤는 이름에서 잘려 나간다.
         쓸 수 있는 구분자 :  (   [   ·   ,   /   |   그리고 전각 형태
         "홍길동 (신규 강의)"  → 홍길동
       ('-'와 '.'은 구분자가 아니다. 'Kim Sung-ho', 'Prof. Kim'이 잘리므로.)

   ▣ 암호화하는 법 (모든 *_ENC 공통)
     평문 JSON을 파일로 저장한 뒤 동일한 비밀번호로 암호화해
     아래 해당 자리에 붙여 넣는다.
          python tools/encrypt_fragment.py toc.json --password <비밀번호>
     아직 암호화하지 않은 평문 JSON도 그대로 읽히므로(개발용),
     로컬에서 먼저 확인하고 배포 전에 암호화하면 된다.
   ============================================================ */

/* ▣ 사이트 문구
     title/highlight/eyebrow/tagline : 목차(index) 화면의 문구
     subject : 문항 페이지 상단의 작은 라벨(eyebrow) 기본값.
               예전엔 모든 neuro 파일마다 "근골격학"을 반복해 적었지만,
               이제 여기 한 곳만 적으면 된다.
               (특정 페이지만 다르게 하려면 그 페이지 pageMetaPayload에
                "eyebrow"를 적으면 그 값이 우선한다) */

window.SITE_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "1BsIJcyEDll2nEYMkXLWRg==",
  "iv": "Mpg7t7bn0+ZNbQyM",
  "data": "eN2Y4rYGSTaHECwvdXv6M/9YYY1Zumqpo+IQBWvgr1+Ddl1bQJi9DaIL6DxgsVsK+8QDjr6jZJeWYH+zjnYjiYWz/gT6vFnzA5DNFXdnkSoE/Tql5hBeTFIPk+dyXCm+Jw83AxPfyFwz2aInQ7POAvFHeELaT1j/mqPJX8uU2ODSUJtqDo3QsCWTdamGQ1mBJUPjBl1O0K94YefN+9+nbvUl5nGthO8S8/NAgjP2YBd7kC5GTZHvijTUN2yQHEvUvreKUwGPEw=="
}
;

/* ▣ 강의 목록 — 번호 → [제목, 교수]  (단일 출처)
     교수 칸은 지금 비워 두었다. 채워 넣는 즉시 '교수별' 묶기가
     파일 스캔 없이 바로 동작한다. */

window.TOC_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "1BsIJcyEDll2nEYMkXLWRg==",
  "iv": "QMjbV1LdGuy+EIjG",
  "data": "WfnClTExWd7oPziBvZWG3NEx1ognhgXGsmSg/zJzJlkCYg9btu0I0oSDFyFm8gN2LiTQ+L5hP2/jZKARRUDQHepejsX4+1XEMJAO3Lep9u8+zYNKyDhNIAEUeCq2x0+Ehb5mQMl4M9Vmm1rHieveBVyiHwk/1AHdpSFHGtTsknqEoqiH/qz8ukSnHe1g6x+bEPXVGr+dqSYkEasfmx2k+0DyC9om9b+B56k6yqaQUE+J9Po+h8XREXFcZNjdP6AsC/YGXLuGvJYb3K7ihNFnzpccd7M0GKDYgLvaFSSdhHQxSHO94gAiWubySpr2VolnAy6i+sbXXrQB1Xm19sQotZguKoFqxcz6lAeDRJDn4dPGMZIbXxNck1b4Pc9C3C5jvID718n/SaTd4n/QVV9pXZABmOKheQCRfA2/IauUh6P+tetEhnWVhpYbtAG8NdnFkhy5WIrO"
}
;

/* ▣ 교수 한 줄 평 — 교수 이름 → 한 줄
     목차를 교수별로 묶으면 머리글에 이름과 함께 이 한 줄이 뜬다.

     · 한 줄 평은 '강의'가 아니라 '교수'에 붙는다. 강의가 5개여도 한 번만.
     · 키 = TOC_ENC에 적은 교수 이름(또는 subtitle에서 뽑힌 이름).
       '홍길동.'처럼 마침표가 붙어도 같은 규칙으로 맞춰 준다.
     · 안 적은 교수는 이름만 뜬다. 통째로 지워도 동작한다. */

window.PROF_NOTE_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "1BsIJcyEDll2nEYMkXLWRg==",
  "iv": "OzQ6NzeN5yyDZL2i",
  "data": "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"
}
;

// 파일명 접두어 — index.html과 assets/question_set.js가 이 값을 읽는다.
// 파일명 규칙이 바뀌면 여기 한 곳만 고친다.

window.FILE_PREFIX = 'neuro';
