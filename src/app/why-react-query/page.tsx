'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import './styles/index.css';
import useQuery from './hooks/useQuery';

const ButtonGroup = dynamic(() => import('./components/ButtonGroup'), {
  ssr: false,
});
const PokemonCard = dynamic(() => import('./components/PokemonCard'), {
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
    <main className="main">
      <section className="card-container absolute-center">
        <PokemonCard error={error} isLoading={isLoading} data={pokemon} />
        <ButtonGroup handleSetId={setId} />
      </section>
    </main>
  );
}
