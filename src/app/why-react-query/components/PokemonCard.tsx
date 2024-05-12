'use client';

import Image from 'next/image';
import '../styles/index.css';
import { PokeDataType } from '../types';

const PokemonCard = ({ data }: { data: PokeDataType }) => {
  if (!data) return null;
  console.log(JSON.stringify(data));

  return (
    <article className="card">
      <figure className="">
        {data?.sprites?.front_default && (
          <Image
            width={200}
            height={200}
            src={data?.sprites?.front_default}
            alt={data.name}
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
