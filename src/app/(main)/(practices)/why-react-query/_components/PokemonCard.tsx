'use client';

import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PokemonImage from './PokemonImage';
import type { PokeDataType } from '../_types';

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
      <article className="bg-[#03446a] rounded-2xl w-75 h-100 text-center">
        <figure className="grid grid-rows-[320px_auto] place-items-center">
          <Skeleton baseColor="gray" circle enableAnimation width={200} height={200} />
          <figcaption className="grid gap-2 p-2">
            <Skeleton baseColor="gray" enableAnimation height={21} width={109} />
            <Skeleton baseColor="gray" enableAnimation height={21} width={109} />
          </figcaption>
        </figure>
      </article>
    );
  }

  if (error) {
    return (
      <article className="bg-[#03446a] rounded-[16px] w-[300px] h-[400px] text-center">
        <figure className="grid grid-rows-[320px_auto] place-items-center">
          <Image
            width={200}
            height={200}
            src="https://ui.dev/images/courses/pokemon-unknown.png"
            alt="pokemon error"
          />
          <figcaption className="grid gap-2 p-2">
            <h4 className="text-[22px] uppercase font-bold">Oops.</h4>
            <h6 className="text-[14px] text-[#fcba28]">{error}</h6>
          </figcaption>
        </figure>
      </article>
    );
  }
  return (
    <article className="bg-[#03446a] rounded-[16px] w-[300px] h-[400px] text-center">
      <figure className="grid grid-rows-[320px_auto] place-items-center">
        {data?.sprites?.front_default && (
          <PokemonImage front_default={data?.sprites?.front_default} name={data.name} />
        )}
        <figcaption className="grid gap-2 p-2">
          <h4 className="text-[22px] uppercase font-bold">{data.name}</h4>
          <h6 className="text-[14px] text-[#fcba28]">No. {data.id}</h6>
        </figcaption>
      </figure>
    </article>
  );
};

export default PokemonCard;
