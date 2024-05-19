import { useQuery } from '@tanstack/react-query';
import { PokeDataType } from '../types';

const fetchPokemonById = async (
  id: number,
  signal: AbortSignal,
): Promise<PokeDataType> => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    signal,
  });

  if (!result.ok) {
    throw new Error('Network response was not ok');
  }
  return result.json();
};

// I can see how many codes I saved using React query! Compared with useQuery hook. And this data can be used by anywhere from my app.
export const usePokemon = (id: number) =>
  useQuery<PokeDataType>({
    queryKey: ['pokemon', id],
    queryFn: ({ signal }) => fetchPokemonById(id, signal),
    enabled: true,
  });
