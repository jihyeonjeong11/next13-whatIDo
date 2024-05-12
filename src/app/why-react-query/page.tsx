'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import './styles/index.css';
import { PokeDataType } from './types';

const ButtonGroup = dynamic(() => import('./components/ButtonGroup'), {
  ssr: false,
});
const PokemonCard = dynamic(() => import('./components/PokemonCard'), {
  ssr: false,
});

export default function UseWhyReactQuery() {
  const [id, setId] = useState<number>(1);
  const [pokemon, setPokemon] = useState<PokeDataType>(
    Object.create(null) as PokeDataType,
  );

  useEffect(() => {
    const handleFetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const json = await res.json();
      setPokemon(json);
    };

    handleFetchPokemon();
  }, [id]);

  return (
    <main className="main">
      <section className="card-container absolute-center">
        <PokemonCard data={pokemon} />
        <ButtonGroup handleSetId={setId} />
      </section>
    </main>
  );
}
