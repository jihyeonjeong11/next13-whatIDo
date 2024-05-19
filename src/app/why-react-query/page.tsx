'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import './styles/index.css';
import { usePokemon } from './quries';

const ButtonGroup = dynamic(() => import('./components/ButtonGroup'), {
  ssr: false,
});
const PokemonCard = dynamic(() => import('./components/PokemonCard'), {
  ssr: false,
});

export default function UseWhyReactQuery() {
  // But using react query emerges another problem. I need to lift up my loading and error handler to handle data type check.
  // good time to consider using context.
  const [id, setId] = useState<number>(1);
  const { data: pokemon, isLoading, error } = usePokemon(id);

  return (
    <main className="main">
      <section className="card-container absolute-center">
        <PokemonCard error={error} isLoading={isLoading} data={pokemon} />
        <ButtonGroup handleSetId={setId} />
      </section>
    </main>
  );
}
