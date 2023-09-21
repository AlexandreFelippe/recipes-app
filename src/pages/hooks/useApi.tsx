import { useCallback, useState } from 'react';
import { fetchFirstLetter, fetchIngredients, fetchName } from '../../utils/SearchApi';

export function useApi() {
  const [searchType, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const searchIngredient = useCallback(async (ingrediente: string) => {
    setSearch('ingrediente');
    if (ingrediente.trim() !== '') {
      const results = await fetchIngredients(ingrediente);
      setSearchResult(results);
    }
  }, []);

  const searchName = useCallback(async (name: string) => {
    setSearch('name');
    if (name.trim() !== '') {
      return fetchName(name);
    }
  }, []);

  const searchFirstLetter = useCallback(async (letter: string) => {
    return fetchFirstLetter(letter);
  }, []);

  return { searchIngredient, searchName, searchFirstLetter };
}
