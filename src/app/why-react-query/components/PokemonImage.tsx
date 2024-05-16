'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
  front_default: string;
  name: string;
};

const PokemonImage: FC<Props> = ({ front_default, name }) => {
  const [src, setSrc] = React.useState(front_default);

  return (
    <Image
      src={src}
      width={200}
      height={200}
      onError={() =>
        setSrc('https://ui.dev/images/courses/pokemon-unknown.png')
      }
      alt={name}
    />
  );
};

export default PokemonImage;
