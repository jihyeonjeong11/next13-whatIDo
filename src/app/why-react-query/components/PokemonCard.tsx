'use client';

import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import '../styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import PokemonImage from './PokemonImage';
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
  if (isLoading) {
    return (
      <article className="card">
        <figure>
          <Skeleton
            baseColor="gray"
            circle
            enableAnimation
            width={200}
            height={200}
          />
          <figcaption>
            <Skeleton
              baseColor="gray"
              enableAnimation
              height={21}
              width={109}
            />
            <Skeleton
              baseColor="gray"
              enableAnimation
              height={21}
              width={109}
            />
          </figcaption>
        </figure>
      </article>
    );
  }

  if (error) {
    return (
      <article className="card">
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
      </article>
    );
  }
  return (
    <article className="card">
      <figure className="">
        {data?.sprites?.front_default && (
          <PokemonImage
            front_default={data?.sprites?.front_default}
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
