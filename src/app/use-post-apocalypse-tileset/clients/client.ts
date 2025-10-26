//TODO: MOVE IT TO SEPERATE PROJECT.

import { Renderer } from './renderer';

export class GameClient {
  private renderer: Renderer;
  private isMounted = true;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    this.renderer = new Renderer(ctx, canvas);
  }

  public start(): void {
    if (!this.isMounted) {
      return;
    }

    const tick = () => {
      this.renderer.render();
      this.animationFrameId = requestAnimationFrame(tick);
    };

    tick();
  }
}
