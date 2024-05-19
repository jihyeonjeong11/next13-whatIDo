'use client';

import '../styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import PokemonImage from './PokemonImage';
import { usePokemonContext } from '../context/UsePokemonContext';

const PokemonCard = () => {
  const data = usePokemonContext();
  return (
    <article className="card">
      <figure>
        {data?.sprites?.front_default && (
          <PokemonImage
            front_default={data.sprites.front_default}
            name={data.name}
          />
        )}
        <figcaption>
          <h4>{data.name}</h4>
          <h6>No. {data.id}</h6>
        </figcaption>
      </figure>
    </article>
  );
};

export default PokemonCard;
