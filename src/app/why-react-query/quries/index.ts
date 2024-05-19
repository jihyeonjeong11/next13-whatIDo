import { useQuery } from '@tanstack/react-query';
import { PokeDataType } from '../types';

const fetchPokemonById = async (id: number, signal: AbortSignal) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    signal,
  });
  const json = await result.json();
  return json;
};

// I can see how many codes I saved using React query! Compared with useQuery hook. And this data can be used by anywhere from my app.
export const usePokemon = (id: number) =>
  useQuery<PokeDataType, Error>({
    queryKey: ['pokemon', id],
    queryFn: ({ signal }) => fetchPokemonById(id, signal),
  });
