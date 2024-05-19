import React, { createContext, useContext } from 'react';
import { PokeDataType } from '../types';
import { usePokemon } from '../queries';
import PokeCardLoading from '../components/PokeCardLoading';
import PokeCardError from '../components/PokeCardError';

type PokemonContextValue = PokeDataType;

const PokeContext = createContext<PokemonContextValue | null>(null);

export const usePokemonContext = () => {
  const context = useContext(PokeContext);
  if (!context) {
    throw new Error(
      'usePokemonContext must be used within a PokemonContextProvider',
    );
  }
  return context;
};

export const PokemonContextProvider = ({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) => {
  const usePokemonQuery = usePokemon(id);

  if (usePokemonQuery.isLoading) {
    return <PokeCardLoading />;
  }

  if (usePokemonQuery.isError) {
    return <PokeCardError error={usePokemonQuery.error} />;
  }

  return (
    <PokeContext.Provider value={usePokemonQuery.data as PokeDataType}>
      {children}
    </PokeContext.Provider>
  );
};
