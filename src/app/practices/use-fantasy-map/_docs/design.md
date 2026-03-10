# Design Document — use-fantasy-map

## Overview

`use-post-apocalypse-tileset`의 `GameClient` / `Renderer` 패턴을 재사용한다.
이후 zoom/pan 인터랙션 확장을 고려해 `requestAnimationFrame` 루프를 사용한다. MVP에서는 루프 안에서 매 프레임 동일한 지도를 렌더링한다.

**d3-geo 미사용** — 등장방형 도법(Equirectangular projection)을 직접 구현:
```
x = (longitude + 180) / 360 * canvasWidth
y = (90 - latitude) / 180 * canvasHeight
```

## Component Specifications

---

### Component: Page

**Purpose**: Canvas 엘리먼트 마운트 + MapClient 생명주기 관리
**Location**: `src/app/practices/use-fantasy-map/page.tsx`

**Interface** (pseudocode):
```
'use client'

canvasRef = useRef<HTMLCanvasElement>()
clientRef = useRef<MapClient>()

useEffect:
  if (!canvasRef.current) return
  clientRef.current = new MapClient(canvasRef.current)
  clientRef.current.init()           // Implements AC-1, AC-2
  return () => clientRef.current?.destroy()  // RAF cleanup

render:
  <div fullscreen bg-ocean-color>
    <canvas ref={canvasRef} />        // Implements AC-1, AC-3
  </div>
```

---

### Component: MapClient

**Purpose**: GeoJSON fetch + D3 projection 초기화 + MapRenderer 조율
**Location**: `src/app/practices/use-fantasy-map/clients/map-client.ts`

**Interface** (pseudocode):
```
class MapClient:
  canvas: HTMLCanvasElement
  renderer: MapRenderer

  constructor(canvas):
    this.canvas = canvas

  async init():                        // Implements AC-2
    geojson = await fetch('/geo/world-110m.geojson').json()
    project = (lon, lat) => ({
      x: (lon + 180) / 360 * canvas.width,
      y: (90 - lat) / 180 * canvas.height,
    })
    this.renderer = new MapRenderer(ctx, geojson, project)
    this.start()

  start():
    isMounted = true
    tick = () =>
      if (!isMounted) return
      this.renderer.render()           // Implements AC-4
      animationFrameId = requestAnimationFrame(tick)
    tick()

  destroy():
    isMounted = false
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
```

**주의**: canvas width/height는 CSS가 아닌 실제 픽셀 크기 기준 (`canvas.offsetWidth`)

---

### Component: MapRenderer

**Purpose**: Canvas 2D context에 GeoJSON features를 경로로 렌더링
**Location**: `src/app/practices/use-fantasy-map/clients/map-renderer.ts`

**Interface** (pseudocode):
```
type ProjectFn = (lon: number, lat: number) => { x: number, y: number }

class MapRenderer:
  ctx: CanvasRenderingContext2D
  geojson: FeatureCollection
  project: ProjectFn

  constructor(ctx, geojson, project)

  render():                            // Implements AC-4
    clearCanvas(OCEAN_COLOR)           // 바다: 배경 색상
    for feature in geojson.features:
      drawFeature(feature)

  drawFeature(feature):
    // Polygon, MultiPolygon 모두 처리
    rings = feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates
    for ring in rings:
      ctx.beginPath()
      for [lon, lat] in ring[0]:       // outer ring만 (holes 생략)
        {x, y} = project(lon, lat)
        ctx.lineTo(x, y)
      ctx.closePath()
      ctx.fillStyle = LAND_COLOR
      ctx.fill()
      ctx.strokeStyle = BORDER_COLOR
      ctx.stroke()

  clearCanvas(color):
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
```

---

## Static Asset

**Location**: `public/geo/world-110m.geojson`
**Source**: Natural Earth 110m cultural vectors (국가 경계 포함, ~500KB)
**Format**: GeoJSON FeatureCollection (국가별 Polygon/MultiPolygon)

## Color Palette (MVP)

| 요소 | 색상 |
|------|------|
| 바다 (배경) | `#1a3a5c` (딥 블루) |
| 육지 | `#8B7355` (브라운 베이지) |
| 국경선 | `#5a4a3a` (다크 브라운) |

> 판타지 느낌의 기본 팔레트. 이후 스프린트에서 커스터마이징 가능.
