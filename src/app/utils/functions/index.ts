export type Size = {
  height: number;
  width: number;
};

export const createOffscreenCanvas = (
  containerElement: HTMLElement,
  devicePixelRatio = 1,
  customSize: Size = Object.create(null) as Size,
): OffscreenCanvas => {
  const canvas = document.createElement('canvas');
  const height = Number(customSize?.height) || containerElement.offsetHeight;
  const width = Number(customSize?.width) || containerElement.offsetWidth;

  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;

  canvas.height = Math.floor(height * devicePixelRatio);
  canvas.width = Math.floor(width * devicePixelRatio);

  containerElement.append(canvas);

  return canvas.transferControlToOffscreen();
};

export const label = (value: string): React.HTMLAttributes<HTMLElement> => ({
  'aria-label': value,
  title: value,
});

export const viewHeight = (): number => window.innerHeight;

export const viewWidth = (): number => window.innerWidth;
// Useful funcs pirated from here and there

export const makeAnArray = (n: number) => [...Array(n)].map((x, i) => i);

export const delay = (ms = 1000, rejectChange = 0.4) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random();
      if (randomValue < rejectChange) {
        reject(new Error('Random Rejection'));
      } else {
        resolve();
      }
    }, ms);
  });
