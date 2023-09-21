import { useCallback, useState } from 'react';
import { fetchFirstLetter, fetchIngredients, fetchName } from '../../utils/SearchApi';

export function useApi() {
  const [searchType, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const searchIngredient = useCallback(async (ingrediente: string) => {
    setSearch('ingrediente');
    if (ingrediente.trim() !== '') {
      const result = await fetchIngredients(ingrediente);
      setSearchResult(result);
    }
  }, []);

  const searchName = useCallback(async (name: string) => {
    setSearch('name');
    if (name.trim() !== '') {
      const resultName = await fetchName(name);
      setSearchResult(resultName);
    }
  }, []);

  const searchFirstLetter = useCallback(async (letter: string) => {
    setSearch('letter');
    if (letter.trim() !== '') {
      const resultLeter = await fetchFirstLetter(letter);
      setSearchResult(resultLeter);
    }
    return fetchFirstLetter(letter);
  }, []);

  return { searchType, searchResult, searchIngredient, searchName, searchFirstLetter };
}
