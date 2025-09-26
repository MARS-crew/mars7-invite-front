# mars7-invite-front
마스외전 7기 모집사이트 프론트 엔드

# 📂 프로젝트 폴더 구조

이 프로젝트는 React 기반으로 구성되어 있으며, 각 폴더의 역할은 아래와 같습니다.


## 📦 주요 버전

- **react**: ^19.1.1  
- **react-dom**: ^19.1.1  
- **tailwindcss**: ^4.1.13  
- **vite**: ^7.1.7  

---

## 📁 폴더 트리 구조

src
├── assets # 이미지, 폰트 등 정적 리소스
├── components # 재사용 가능한 UI 컴포넌트
├── hooks # 커스텀 훅(Hooks) / HOC
├── page # 페이지 단위 컴포넌트 (라우팅 대상)
├── routes # 라우터 설정 및 페이지 경로 정의
├── services # API 통신 및 인증 관련 로직
├── types # TypeScript 타입 정의
└── utils # 공통 함수 및 유틸리티


## 📖 폴더 설명

- **assets/**
  - 이미지, 폰트 등 정적 리소스를 관리합니다.

- **components/**
  - 재사용 가능한 UI 컴포넌트들이 위치합니다.

- **hooks/**
  - 커스텀 훅(Custom Hooks) 또는 HOC 관련 로직이 위치합니다.

- **page/**
  - 라우팅을 통해 보여지는 페이지 단위 컴포넌트가 위치합니다.
  - (예: `/login`, `/dashboard` 등)

- **routes/**
  - 페이지 이동 경로(Route)를 정의합니다.

- **services/**
  - API 통신 및 인증(auth) 등 서비스 로직이 위치합니다.

- **utils/**
  - 정규표현식, 공통 함수 등 유틸리티 함수들이 위치합니다.

- **types/**
  - TypeScript 인터페이스 및 타입 정의 파일들이 위치합니다.

---

📌 각 폴더는 역할별로 나누어져 있어 유지보수와 확장이 용이하도록 구성되어 있습니다.

## 🚀 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

#로컬 접속 URL
Local:   http://localhost:5173/