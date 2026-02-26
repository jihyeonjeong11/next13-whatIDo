/**
 * Coordinate System Utilities for Infinite Canvas
 *
 * 1. Client Space
     - 브라우저/스크린/다큐먼트의 왼쪽 최상단 origin
     - 이벤트 리스너를 통해 받아오는 위치값 `clientX, screenX` 등이 해당 됨
  * 2. Screen Space
      - Dom에 존재하는 Canvas의 왼쪽 최상단을 origin으로 하는 좌표.
      - Client Space에서 `e.clientX - rect.left` 캔버스의 `getBoundingClientRect()`를 빼서 계산함.
      - **컴퓨터  그래픽스 업계의 Screen과 동일한 개념! 이해 안되면 여기서 레퍼런스를 구해야 함**
  * 3. World Space
      - 카메라가 바라보는 무한한 평면 캔버스의 좌표
      - 오브젝트의 위치는 이 좌표계 기준으로 저장되며 pan/zoom이 일어나도 변하지 않음
      - pan/zoom 액션이 일어날 경우 Camera(x, y, z)가 변경되고 Screen Space와의 변환 시 새롭게 계산됨
      - `z`값은 카메라의 높이 `zoom 레벨 (1 = 100%, 2 = 200%, 0.5 = 50%)`
 *
 * The camera state contains:
 * - x, y: The world coordinates at the center of the viewport
 * - scale: Zoom level (1 = 100%, 2 = 200%, 0.5 = 50%)
 */

export interface Point {
  x: number;
  y: number;
}

export interface CameraState {
  x: number; // World X position (center of viewport)
  y: number; // World Y position (center of viewport)
  z: number; // Zoom level
}

/**
 * Convert screen coordinates (canvas pixels) to world coordinates
 * Formula: world = (screen - center) / scale + camera
 */
export function screenToWorld(
  screenPoint: Point,
  camera: CameraState,
  canvasWidth: number,
  canvasHeight: number,
): Point {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  return {
    x: (screenPoint.x - centerX) / camera.z + camera.x,
    y: (screenPoint.y - centerY) / camera.z + camera.y,
  };
}

/**
 * Convert world coordinates to screen coordinates (canvas pixels)
 * Formula: screen = (world - camera) * scale + center
 */
export function worldToScreen(
  worldPoint: Point,
  camera: CameraState,
  canvasWidth: number,
  canvasHeight: number,
): Point {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  return {
    x: (worldPoint.x - camera.x) * camera.z + centerX,
    y: (worldPoint.y - camera.y) * camera.z + centerY,
  };
}

/**
 * Calculate the visible world bounds (viewport in world space)
 */
export function getVisibleWorldBounds(
  camera: CameraState,
  canvasWidth: number,
  canvasHeight: number,
): { minX: number; maxX: number; minY: number; maxY: number } {
  const halfWidth = canvasWidth / 2 / camera.z;
  const halfHeight = canvasHeight / 2 / camera.z;

  return {
    minX: camera.x - halfWidth,
    maxX: camera.x + halfWidth,
    minY: camera.y - halfHeight,
    maxY: camera.y + halfHeight,
  };
}

/**
 * Check if a point in world space is within the visible viewport
 */
export function isPointVisible(
  worldPoint: Point,
  camera: CameraState,
  canvasWidth: number,
  canvasHeight: number,
  margin: number = 0,
): boolean {
  const bounds = getVisibleWorldBounds(camera, canvasWidth, canvasHeight);
  return (
    worldPoint.x >= bounds.minX - margin &&
    worldPoint.x <= bounds.maxX + margin &&
    worldPoint.y >= bounds.minY - margin &&
    worldPoint.y <= bounds.maxY + margin
  );
}

/**
 * Check if a rectangle in world space intersects with the visible viewport
 * Used for viewport culling
 */
export function isRectVisible(
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number,
  camera: CameraState,
  canvasWidth: number,
  canvasHeight: number,
): boolean {
  const bounds = getVisibleWorldBounds(camera, canvasWidth, canvasHeight);

  return !(
    rectX + rectWidth < bounds.minX ||
    rectX > bounds.maxX ||
    rectY + rectHeight < bounds.minY ||
    rectY > bounds.maxY
  );
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
