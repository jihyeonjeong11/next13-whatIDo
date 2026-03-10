import type { GeoJsonFeatureCollection } from '../types';
import { MapRenderer } from './map-renderer';

export class MapClient {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: MapRenderer | null = null;
  private animationFrameId: number | null = null;
  private isMounted = false;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public async init(): Promise<void> {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    const res = await fetch('/geo/world-110m.geojson');
    const geojson = (await res.json()) as GeoJsonFeatureCollection;

    const { width, height } = this.canvas;
    const project = (lon: number, lat: number) => ({
      x: ((lon + 180) / 360) * width,
      y: ((90 - lat) / 180) * height,
    });

    this.renderer = new MapRenderer(this.ctx, geojson, project);
    this.start();
  }

  private start(): void {
    this.isMounted = true;
    const tick = () => {
      if (!this.isMounted) return;
      this.renderer?.render();
      this.animationFrameId = requestAnimationFrame(tick);
    };
    tick();
  }

  public destroy(): void {
    this.isMounted = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
