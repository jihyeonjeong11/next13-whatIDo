'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import useQuery from './_hooks/useQuery';

const ButtonGroup = dynamic(() => import('./_components/ButtonGroup'), {
  ssr: false,
});
const PokemonCard = dynamic(() => import('./_components/PokemonCard'), {
  ssr: false,
});

export default function UseWhyReactQuery() {
  const [id, setId] = useState<number>(1);
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery(`https://pokeapi.co/api/v2/pokemon/${id}`);

  return (
    <div className="h-dvh relative text-white">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
        <PokemonCard error={error} isLoading={isLoading} data={pokemon} />
        <ButtonGroup handleSetId={setId} />
      </section>
    </div>
  );
}
