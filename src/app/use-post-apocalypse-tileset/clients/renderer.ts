// todo: assetmanager -> load img -> render

const tileMap = {
  hero: '/zombie/player.png',
};

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private assets: { [key: string]: HTMLImageElement } = {};

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.loadAssets();
  }

  private async loadAssets(): Promise<void> {
    const entities = ['hero'];
    for (const entity of entities) {
      try {
        const img = new Image();
        img.src = tileMap[entity as keyof typeof tileMap];
        await img.decode();
        this.assets[entity] = img;
      } catch (e) {
        console.error(e);
      }
    }
  }

  private renderCharacter(): void {
    const entities = ['hero'];
    entities.forEach((entity: string) => {
      const img = this.assets[entity];
      if (img) {
        this.ctx.drawImage(img, 0, 0);
      }
    });
  }

  private clearCanvas(): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
  }

  public render(): void {
    this.clearCanvas();
    this.renderCharacter();
  }
}
