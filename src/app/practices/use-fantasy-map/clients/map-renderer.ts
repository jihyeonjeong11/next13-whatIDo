import type { GeoJsonFeatureCollection } from '../types';

type ProjectFn = (lon: number, lat: number) => { x: number; y: number };

const OCEAN_COLOR = '#1a3a5c';
const LAND_COLOR = '#8B7355';
const BORDER_COLOR = '#5a4a3a';

export class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private geojson: GeoJsonFeatureCollection;
  private project: ProjectFn;

  constructor(
    ctx: CanvasRenderingContext2D,
    geojson: GeoJsonFeatureCollection,
    project: ProjectFn,
  ) {
    this.ctx = ctx;
    this.geojson = geojson;
    this.project = project;
  }

  private clearCanvas(): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.fillStyle = OCEAN_COLOR;
    this.ctx.fillRect(0, 0, width, height);
  }

  private drawFeature(coords: number[][][]): void {
    // outer ring only
    const ring = coords[0];
    this.ctx.beginPath();
    for (let i = 0; i < ring.length; i++) {
      const [lon, lat] = ring[i];
      const { x, y } = this.project(lon, lat);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fillStyle = LAND_COLOR;
    this.ctx.fill();
    this.ctx.strokeStyle = BORDER_COLOR;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
  }

  public render(): void {
    this.clearCanvas();

    for (const feature of this.geojson.features) {
      const { type, coordinates } = feature.geometry;

      if (type === 'Polygon') {
        this.drawFeature(coordinates);
      } else if (type === 'MultiPolygon') {
        for (const polygon of coordinates) {
          this.drawFeature(polygon);
        }
      }
    }
  }
}
