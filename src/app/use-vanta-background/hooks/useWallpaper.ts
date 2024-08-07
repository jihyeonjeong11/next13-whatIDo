import { MutableRefObject, useState } from 'react';

//export const DEFAULT_WALLPAPER_FIT: WallpaperFit = "fill";

export const useWallpaper = (
  vantaRef: MutableRefObject<HTMLElement | null>,
) => {
  const [wallpaperFit, setWallpaperFit] = useState('fill');

  console.log(vantaRef, wallpaperFit);

  return {};
};
