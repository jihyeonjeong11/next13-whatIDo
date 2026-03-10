# Architectural Blueprint — use-fantasy-map

## 1. Core Objective

Canvas 2D API와 D3-geo를 사용해 실제 세계지도(GeoJSON)를 브라우저 Canvas에 렌더링하는 페이지를 구축한다. 판타지 세계 창작 도구의 첫 번째 스프린트로, 지도 데이터 로드 → 좌표 변환 → Canvas 렌더링의 파이프라인을 확립하는 것이 목표다.

## 2. System Scope and Boundaries

### In Scope
- GeoJSON 데이터를 `public/` 폴더에서 fetch
- D3 `geoNaturalEarth1` projection으로 좌표 변환
- Canvas 2D context로 국가 경계선 렌더링
- 육지(fill)와 바다(background) 색상 구분
- 화면 크기에 맞는 자동 스케일

### Out of Scope
- zoom / pan 인터랙션
- 판타지 스타일 변환 (텍스처, 색상 효과)
- 지역 이름 붙이기
- 지형 편집 브러시
- 저장 / 불러오기

## 3. Core System Components

| Component Name | Single Responsibility |
|---|---|
| **Page** | Canvas 엘리먼트 마운트 + MapClient 생명주기 관리 |
| **MapClient** | GeoJSON fetch + D3 projection 초기화 + Renderer 조율 |
| **MapRenderer** | Canvas 2D context에 GeoJSON features를 경로로 렌더링 |

## 4. High-Level Data Flow

```
User (브라우저)
    ↓ 페이지 진입
Page (React, useEffect)
    ↓ canvas ref 전달
MapClient
    ↓ fetch("/geo/world-110m.geojson")
    ↓ GeoJSON FeatureCollection
    ↓ d3.geoNaturalEarth1() + fitSize(canvas)
MapRenderer
    ↓ ctx.beginPath() + geoPath(feature)
    ↓ ctx.fill() / ctx.stroke()
Canvas (육지 + 바다 렌더링 완료)
```

## 5. Key Integration Points

- **Page ↔ MapClient**: `new MapClient(canvasElement)` → `client.init()`
- **MapClient ↔ MapRenderer**: projection + GeoJSON features 전달
- **MapClient ↔ public/**: `fetch('/geo/world-110m.geojson')` (static asset)
- **MapRenderer ↔ Canvas**: `CanvasRenderingContext2D` 직접 조작
- **D3-geo**: `geoNaturalEarth1`, `geoPath`, `fitSize` 사용
