/**
 * Coordinate System Utilities for Infinite Canvas
 *
 * This module handles conversion between two coordinate systems:
 * - Screen Space: Pixel coordinates on the viewport (where 0,0 is top-left of canvas)
 * - World Space: Coordinates on the infinite plane (can be any value)
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
