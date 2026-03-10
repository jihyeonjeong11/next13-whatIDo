# Implementation Plan — use-fantasy-map

## Tasks

- [ ] 1. GeoJSON 데이터 준비
  - [ ] 1.1 Natural Earth 110m GeoJSON 파일 다운로드
  - [ ] 1.2 `public/geo/world-110m.geojson` 경로에 배치
  - _Requirements: AC-2_

- [ ] 2. Projection 유틸 구현
  - [ ] 2.1 `(lon, lat) => {x, y}` 등장방형 도법 함수 구현 (외부 라이브러리 없음)
  - _Requirements: AC-2, AC-3_

- [ ] 3. MapRenderer 구현
  - [ ] 3.1 `src/app/practices/use-fantasy-map/clients/map-renderer.ts` 생성
  - [ ] 3.2 `clearCanvas(color)` 구현 — 바다 배경 채우기
  - [ ] 3.3 `render()` 구현 — GeoJSON features 순회 → fill + stroke
  - _Requirements: AC-4_

- [ ] 4. MapClient 구현
  - [ ] 4.1 `src/app/practices/use-fantasy-map/clients/map-client.ts` 생성
  - [ ] 4.2 `init()` — GeoJSON fetch + projection + path 초기화
  - [ ] 4.3 canvas 크기를 `offsetWidth / offsetHeight` 기준으로 설정
  - [ ] 4.4 `start()` — RAF 루프 시작
  - [ ] 4.5 `destroy()` — RAF 취소
  - _Requirements: AC-2, AC-3_

- [ ] 5. Page 구현
  - [ ] 5.1 `src/app/practices/use-fantasy-map/page.tsx` 생성
  - [ ] 5.2 `useRef` + `useEffect`로 MapClient 생명주기 연결
  - [ ] 5.3 cleanup (`destroy()`) 등록
  - [ ] 5.4 canvas를 화면 전체 크기로 layout 설정
  - _Requirements: AC-1, AC-3_
