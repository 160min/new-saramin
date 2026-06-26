🚀 New-Saramin (뉴 사람인)

맞춤형 기술 스택 기반 개발자 채용 정보 수집 및 통계 대시보드 서비스
본 프로젝트는 프론트엔드, 백엔드, 데이터 수집 파트가 하나의 저장소에서 관리되는 모노레포(Monorepo) 구조로 개발됩니다.

👥 팀원 소개 및 역할 분담

김민수 (팀장)

PM / Infra / Data / Crawler

프로젝트 총괄, GitHub Flow 운영 관리, CI/CD 배포 파이프라인 구축

Python 기반 채용 사이트 크롤링, DB 스키마 설계 및 데이터 적재

김진리

Frontend

Next.js 기반 대시보드 UI/UX 구현, 대시보드 시각화 차트 연동

황승환

Backend

Spring Boot 기반 API 서버 개발, 데이터 정제 및 비즈니스 로직 구현

🛠️ 기술 스택 (Tech Stack)

💻 Frontend

Next.js 16.1.4

☕ Backend

Java 21 / Spring Boot 4.1.0

Build Tool: Gradle

🗄️ Database & Infra

MySQL 8.4 LTS (Encoding: utf8mb4)

Docker / Docker Compose

GitHub Actions (CI/CD)

🐍 Data / Crawler

Python 3.12

requests / BeautifulSoup

📂 프로젝트 구조 (Monorepo Architecture)

📦 new-saramin
┣ 📂 frontend # Next.js 프론트엔드 소스 코드
┣ 📂 backend # Spring Boot 백엔드 소스 코드
┣ 📂 crawler # Python 기반 채용 정보 스크립트
┗ 📜 README.md # 프로젝트 메인 가이드 문서

🌿 Git 협업 규칙 및 개발 프로세스

우리 팀은 효율적인 애자일 스프린트와 안정적인 배포를 위해 아래 규칙을 엄격히 준수합니다.

브랜치 전략: develop 없이 오직 main과 feature/ 브랜치만 사용하는 GitHub Flow를 채택합니다.

이슈 키 사용: 모든 일감은 파트별 이슈 키([FRONT-N], [BACK-N], [DATA-N], [INFRA-N])를 부여하여 관리합니다.

커밋 컨벤션: [이슈키] type: 메시지 형태로 커밋을 작성합니다. (예: [BACK-1] feat: 유저 엔티티 구현)

코드 리뷰 필수: main 브랜치로의 머지(Merge)는 반드시 다른 팀원의 Approve를 거쳐야 가능합니다.

💡 자세한 Git 컨벤션 지침은 팀 내 [Git 협업 규칙 문서]를 참고하세요.
