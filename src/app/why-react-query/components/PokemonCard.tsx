'use client';

import Image from 'next/image';
import '../styles/index.css';
import { PokeDataType } from '../types';

const PokemonCard = ({
  isLoading,
  error,
  data,
}: {
  isLoading: boolean;
  error: any;
  data: PokeDataType;
}) => {
  if (isLoading === true) {
    return <article className="card" />;
  }

  if (error) {
    return (
      <div className="card">
        <figure>
          <Image
            width={200}
            height={200}
            src="https://ui.dev/images/courses/pokemon-unknown.png"
            alt="pokemon error"
          />
          <figcaption>
            <h4>Oops.</h4>
            <h6>{error}</h6>
          </figcaption>
        </figure>
      </div>
    );
  }
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
