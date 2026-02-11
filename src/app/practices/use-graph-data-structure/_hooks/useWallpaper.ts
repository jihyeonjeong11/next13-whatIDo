'use client';
// import bubbles from '../../../../../../public/Bubbles.webp';
// import stone from '../../../../../../public/stone.webp';
import { useState } from 'react';

//const wallpaperArr = [bubbles, stone];
const size = ['cover', 'contain', 'auto'];

function useWallpaper() {
  const [wallpaper, setWallpaper] = useState([]);
  const [sizeStrategy, setSizeStrategy] = useState('');

  const getRandomWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * wallpaper.length + 1);
    setWallpaper(wallpaper[randomIndex]);
    const randomStrategy = Math.floor(Math.random() * size.length + 1);
    setSizeStrategy(size[randomStrategy]);
  };
  return {
    style: {
      backgroundSize: sizeStrategy,
      //backgroundImage: `url(${wallpaper.src})`,
    },
    getRandomWallpaper,
  };
}

export default useWallpaper;
