// /**
//  * useInfiniteCanvas - Custom hook for infinite canvas navigation
//  *
//  * This hook handles all the math and logic for:
//  * - Camera state management (x, y, scale)
//  * - Zoom at mouse cursor (not center zoom)
//  * - Pan via spacebar + click-drag or middle-mouse drag
//  * - Dynamic grid rendering that scales and fades
//  * - 60fps rendering with requestAnimationFrame
//  * - Viewport culling for performance
//  */

// import { useRef, useEffect, useCallback, useState } from 'react';
// import {
//   type CameraState,
//   type Point,
//   screenToWorld,
//   worldToScreen,
//   getVisibleWorldBounds,
//   isRectVisible,
//   clamp,
// } from '../_utils/coordinates';
// import useShapes from './useShapes';

// // Constants
// const MIN_SCALE = 0.05; // 5% minimum zoom
// const MAX_SCALE = 20; // 2000% maximum zoom
// const ZOOM_SENSITIVITY = 0.001;
// const GRID_BASE_SIZE = 50; // Base grid cell size in world units

// export interface UseInfiniteCanvasOptions {
//   initialCamera?: Partial<CameraState>;
//   onCameraChange?: (camera: CameraState) => void;
//   /** Nodes to render on the canvas */
// }

// export interface UseInfiniteCanvasReturn {
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
//   camera: CameraState;
//   setCamera: (camera: CameraState) => void;
//   resetCamera: () => void;
//   screenToWorld: (screenPoint: Point) => Point;
//   worldToScreen: (worldPoint: Point) => Point;
//   isPanning: boolean;
//   isSpacePressed: boolean;
// }

// export function useInfiniteCanvas(options: UseInfiniteCanvasOptions = {}): UseInfiniteCanvasReturn {
//   const { initialCamera = {}, onCameraChange } = options;
//   const { drawBlocks } = useShapes();

//   // Canvas reference
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   // Camera state
//   const [camera, setCameraState] = useState<CameraState>({
//     x: initialCamera.x ?? 0,
//     y: initialCamera.y ?? 0,
//     scale: initialCamera.scale ?? 1,
//   });

//   // Interaction state (refs for performance - avoid re-renders during drag)
//   const isPanningRef = useRef(false);
//   const isSpacePressedRef = useRef(false);
//   const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
//   const animationFrameRef = useRef<number | null>(null);

//   // State for exposing to component
//   const [isPanning, setIsPanning] = useState(false);
//   const [isSpacePressed, setIsSpacePressed] = useState(false);

//   // Get canvas dimensions
//   const getCanvasDimensions = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return { width: 0, height: 0 };
//     return { width: canvas.width, height: canvas.height };
//   }, []);

//   // Set camera with callback
//   const setCamera = useCallback(
//     (newCamera: CameraState) => {
//       setCameraState(newCamera);
//       onCameraChange?.(newCamera);
//     },
//     [onCameraChange],
//   );

//   // Reset camera to initial position
//   const resetCamera = useCallback(() => {
//     setCamera({
//       x: initialCamera.x ?? 0,
//       y: initialCamera.y ?? 0,
//       scale: initialCamera.scale ?? 1,
//     });
//   }, [initialCamera, setCamera]);

//   // Coordinate conversion helpers bound to current state
//   const screenToWorldBound = useCallback(
//     (screenPoint: Point): Point => {
//       const { width, height } = getCanvasDimensions();
//       return screenToWorld(screenPoint, camera, width, height);
//     },
//     [camera, getCanvasDimensions],
//   );

//   const worldToScreenBound = useCallback(
//     (worldPoint: Point): Point => {
//       const { width, height } = getCanvasDimensions();
//       return worldToScreen(worldPoint, camera, width, height);
//     },
//     [camera, getCanvasDimensions],
//   );

//   // ============ GRID RENDERING ============

//   /**
//    * Calculate the appropriate grid size based on zoom level
//    * Grid sizes follow a 1-5-10 pattern for nice human-readable values
//    */
//   const calculateGridSize = useCallback((scale: number): number => {
//     // Find the order of magnitude
//     const baseSize = GRID_BASE_SIZE / scale;
//     const magnitude = 10 ** Math.floor(Math.log10(baseSize));

//     // Normalize to find which step we're at (1, 2, 5, or 10)
//     const normalized = baseSize / magnitude;

//     if (normalized < 2) return magnitude;
//     if (normalized < 5) return magnitude * 2;
//     if (normalized < 10) return magnitude * 5;
//     return magnitude * 10;
//   }, []);

//   /**
//    * Calculate grid opacity based on zoom level
//    * Grid fades as it becomes too dense or too sparse
//    */
//   const calculateGridOpacity = useCallback((scale: number, gridSize: number): number => {
//     const screenGridSize = gridSize * scale;

//     // Fade when grid cells are too small (< 20px) or too large (> 200px)
//     if (screenGridSize < 20) {
//       return clamp(screenGridSize / 20, 0, 1);
//     }
//     if (screenGridSize > 200) {
//       return clamp((300 - screenGridSize) / 100, 0, 1);
//     }
//     return 1;
//   }, []);

//   /**
//    * Draw the infinite grid
//    */
//   const drawGrid = useCallback(
//     (ctx: CanvasRenderingContext2D, currentCamera: CameraState, width: number, height: number) => {
//       const { scale } = currentCamera;
//       const bounds = getVisibleWorldBounds(currentCamera, width, height);

//       // Calculate grid sizes (primary and secondary)
//       const primaryGridSize = calculateGridSize(scale);
//       const secondaryGridSize = primaryGridSize * 5;

//       // Draw secondary (larger) grid first
//       const secondaryOpacity = calculateGridOpacity(scale, secondaryGridSize) * 0.3;
//       if (secondaryOpacity > 0.01) {
//         ctx.strokeStyle = `rgba(255, 255, 255, ${secondaryOpacity})`;
//         ctx.lineWidth = 1;

//         // Calculate first grid line position (snap to grid)
//         const startX = Math.floor(bounds.minX / secondaryGridSize) * secondaryGridSize;
//         const startY = Math.floor(bounds.minY / secondaryGridSize) * secondaryGridSize;

//         ctx.beginPath();

//         // Vertical lines
//         for (let x = startX; x <= bounds.maxX; x += secondaryGridSize) {
//           const screenX = (x - currentCamera.x) * scale + width / 2;
//           ctx.moveTo(screenX, 0);
//           ctx.lineTo(screenX, height);
//         }

//         // Horizontal lines
//         for (let y = startY; y <= bounds.maxY; y += secondaryGridSize) {
//           const screenY = (y - currentCamera.y) * scale + height / 2;
//           ctx.moveTo(0, screenY);
//           ctx.lineTo(width, screenY);
//         }

//         ctx.stroke();
//       }

//       // Draw primary (smaller) grid
//       const primaryOpacity = calculateGridOpacity(scale, primaryGridSize) * 0.15;
//       if (primaryOpacity > 0.01) {
//         ctx.strokeStyle = `rgba(255, 255, 255, ${primaryOpacity})`;
//         ctx.lineWidth = 0.5;

//         const startX = Math.floor(bounds.minX / primaryGridSize) * primaryGridSize;
//         const startY = Math.floor(bounds.minY / primaryGridSize) * primaryGridSize;

//         ctx.beginPath();

//         // Vertical lines
//         for (let x = startX; x <= bounds.maxX; x += primaryGridSize) {
//           const screenX = (x - currentCamera.x) * scale + width / 2;
//           ctx.moveTo(screenX, 0);
//           ctx.lineTo(screenX, height);
//         }

//         // Horizontal lines
//         for (let y = startY; y <= bounds.maxY; y += primaryGridSize) {
//           const screenY = (y - currentCamera.y) * scale + height / 2;
//           ctx.moveTo(0, screenY);
//           ctx.lineTo(width, screenY);
//         }

//         ctx.stroke();
//       }

//       // Draw origin crosshair
//       const originScreen = worldToScreen({ x: 0, y: 0 }, currentCamera, width, height);
//       if (
//         originScreen.x >= -10 &&
//         originScreen.x <= width + 10 &&
//         originScreen.y >= -10 &&
//         originScreen.y <= height + 10
//       ) {
//         ctx.strokeStyle = 'rgba(233, 69, 96, 0.6)'; // Accent color
//         ctx.lineWidth = 2;
//         ctx.beginPath();

//         // Horizontal line
//         ctx.moveTo(originScreen.x - 20, originScreen.y);
//         ctx.lineTo(originScreen.x + 20, originScreen.y);

//         // Vertical line
//         ctx.moveTo(originScreen.x, originScreen.y - 20);
//         ctx.lineTo(originScreen.x, originScreen.y + 20);

//         ctx.stroke();
//       }
//     },
//     [calculateGridSize, calculateGridOpacity],
//   );

//   /**
//    * Draw debug info overlay
//    */
//   const drawDebugInfo = useCallback((ctx: CanvasRenderingContext2D, currentCamera: CameraState) => {
//     ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//     ctx.font = '12px monospace';

//     const info = [
//       `Camera: (${currentCamera.x.toFixed(1)}, ${currentCamera.y.toFixed(1)})`,
//       `Scale: ${(currentCamera.scale * 100).toFixed(1)}%`,
//       `Zoom: ${currentCamera.scale.toFixed(3)}x`,
//     ];

//     info.forEach((text, index) => {
//       ctx.fillText(text, 10, 20 + index * 18);
//     });

//     // Instructions
//     ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//     const instructions = [
//       'Mouse wheel: Zoom at cursor',
//       'Space + Drag: Pan',
//       'Middle mouse drag: Pan',
//     ];

//     const canvas = canvasRef.current;
//     if (canvas) {
//       instructions.forEach((text, index) => {
//         ctx.fillText(text, canvas.width - 180, 20 + index * 18);
//       });
//     }
//   }, []);

//   // Node rendering constants
//   const NODE_WIDTH = 160;
//   const NODE_HEIGHT = 80;
//   const NODE_BORDER_RADIUS = 12;
//   const NODE_PADDING = 12;

//   /**
//    * Main render function
//    */
//   const render = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const { width, height } = canvas;

//     // Clear canvas with background color
//     ctx.fillStyle = '#1a1a2e'; // --color-bg-primary
//     ctx.fillRect(0, 0, width, height);

//     // Draw grid
//     drawGrid(ctx, camera, width, height);

//     //drawBlocks(ctx);

//     // Draw debug info
//     drawDebugInfo(ctx, camera);

//     // Schedule next frame
//     animationFrameRef.current = requestAnimationFrame(render);
//   }, [camera, drawGrid, drawDebugInfo]);

//   // ============ EVENT HANDLERS ============

//   /**
//    * Handle mouse wheel for zoom at cursor
//    */
//   const handleWheel = useCallback(
//     (e: WheelEvent) => {
//       e.preventDefault();

//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const rect = canvas.getBoundingClientRect();
//       const mouseX = e.clientX - rect.left;
//       const mouseY = e.clientY - rect.top;

//       // Get world position under mouse before zoom
//       const worldBefore = screenToWorld(
//         { x: mouseX, y: mouseY },
//         camera,
//         canvas.width,
//         canvas.height,
//       );

//       // Calculate new scale
//       const delta = -e.deltaY * ZOOM_SENSITIVITY;
//       const newScale = clamp(camera.scale * (1 + delta), MIN_SCALE, MAX_SCALE);

//       // Get world position under mouse after zoom (with new scale, same camera position)
//       const tempCamera = { ...camera, scale: newScale };
//       const worldAfter = screenToWorld(
//         { x: mouseX, y: mouseY },
//         tempCamera,
//         canvas.width,
//         canvas.height,
//       );

//       // Adjust camera position to keep the mouse over the same world point
//       const newCamera: CameraState = {
//         x: camera.x + (worldBefore.x - worldAfter.x),
//         y: camera.y + (worldBefore.y - worldAfter.y),
//         scale: newScale,
//       };

//       setCamera(newCamera);
//     },
//     [camera, setCamera],
//   );

//   /**
//    * Handle mouse down for panning
//    */
//   const handleMouseDown = useCallback((e: MouseEvent) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // Start panning if spacebar is pressed or middle mouse button
//     if (isSpacePressedRef.current || e.button === 1) {
//       e.preventDefault();
//       isPanningRef.current = true;
//       setIsPanning(true);

//       const rect = canvas.getBoundingClientRect();
//       lastMousePosRef.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       };

//       canvas.style.cursor = 'grabbing';
//     }
//   }, []);

//   /**
//    * Handle mouse move for panning
//    */
//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const rect = canvas.getBoundingClientRect();
//       const currentPos = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       };

//       // Update cursor based on space key
//       if (isSpacePressedRef.current && !isPanningRef.current) {
//         canvas.style.cursor = 'grab';
//       }

//       if (isPanningRef.current) {
//         // Calculate delta in screen space
//         const deltaX = currentPos.x - lastMousePosRef.current.x;
//         const deltaY = currentPos.y - lastMousePosRef.current.y;

//         // Convert delta to world space and update camera
//         setCamera({
//           ...camera,
//           x: camera.x - deltaX / camera.scale,
//           y: camera.y - deltaY / camera.scale,
//         });

//         lastMousePosRef.current = currentPos;
//       }
//     },
//     [camera, setCamera],
//   );

//   /**
//    * Handle mouse up to stop panning
//    */
//   const handleMouseUp = useCallback(() => {
//     const canvas = canvasRef.current;

//     isPanningRef.current = false;
//     setIsPanning(false);

//     if (canvas) {
//       canvas.style.cursor = isSpacePressedRef.current ? 'grab' : 'default';
//     }
//   }, []);

//   /**
//    * Handle key down for spacebar panning mode
//    */
//   const handleKeyDown = useCallback((e: KeyboardEvent) => {
//     if (e.code === 'Space' && !e.repeat) {
//       e.preventDefault();
//       isSpacePressedRef.current = true;
//       setIsSpacePressed(true);

//       const canvas = canvasRef.current;
//       if (canvas && !isPanningRef.current) {
//         canvas.style.cursor = 'grab';
//       }
//     }
//   }, []);

//   /**
//    * Handle key up to exit spacebar panning mode
//    */
//   const handleKeyUp = useCallback((e: KeyboardEvent) => {
//     if (e.code === 'Space') {
//       isSpacePressedRef.current = false;
//       setIsSpacePressed(false);

//       const canvas = canvasRef.current;
//       if (canvas && !isPanningRef.current) {
//         canvas.style.cursor = 'default';
//       }
//     }
//   }, []);

//   /**
//    * Handle canvas resize
//    */
//   const handleResize = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const container = canvas.parentElement;
//     if (!container) return;

//     // Set canvas size to match container
//     const rect = container.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;
//     canvas.style.width = `${rect.width}px`;
//     canvas.style.height = `${rect.height}px`;

//     // Scale context for retina displays
//     const ctx = canvas.getContext('2d');
//     if (ctx) {
//       ctx.scale(dpr, dpr);
//     }
//   }, []);

//   // ============ EFFECTS ============

//   // Setup event listeners
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // Add event listeners
//     canvas.addEventListener('wheel', handleWheel, { passive: false });
//     canvas.addEventListener('mousedown', handleMouseDown);
//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('mouseup', handleMouseUp);
//     canvas.addEventListener('mouseleave', handleMouseUp);

//     // Keyboard events need to be on window
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     // Resize observer
//     const resizeObserver = new ResizeObserver(handleResize);
//     const container = canvas.parentElement;
//     if (container) {
//       resizeObserver.observe(container);
//     }

//     // Initial resize
//     handleResize();

//     // Cleanup
//     return () => {
//       canvas.removeEventListener('wheel', handleWheel);
//       canvas.removeEventListener('mousedown', handleMouseDown);
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       canvas.removeEventListener('mouseup', handleMouseUp);
//       canvas.removeEventListener('mouseleave', handleMouseUp);
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//       resizeObserver.disconnect();
//     };
//   }, [
//     handleWheel,
//     handleMouseDown,
//     handleMouseMove,
//     handleMouseUp,
//     handleKeyDown,
//     handleKeyUp,
//     handleResize,
//   ]);

//   // Start render loop
//   useEffect(() => {
//     animationFrameRef.current = requestAnimationFrame(render);

//     return () => {
//       if (animationFrameRef.current !== null) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [render]);

//   return {
//     canvasRef,
//     camera,
//     setCamera,
//     resetCamera,
//     screenToWorld: screenToWorldBound,
//     worldToScreen: worldToScreenBound,
//     isPanning,
//     isSpacePressed,
//   };
// }

// export default useInfiniteCanvas;
