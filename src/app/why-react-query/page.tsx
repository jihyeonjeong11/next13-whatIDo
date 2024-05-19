'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import './styles/index.css';
import { PokemonContextProvider } from './context/UsePokemonContext';

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

  return (
    <main className="main">
      <section className="card-container absolute-center">
        <PokemonContextProvider id={id}>
          <PokemonCard />
        </PokemonContextProvider>
        <ButtonGroup setId={setId} />
      </section>
    </main>
  );
}
