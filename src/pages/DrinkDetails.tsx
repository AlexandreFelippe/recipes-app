import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchDrinksRecipesDetails } from '../utils/SearchApi';

export default function DrinkDetails() {
  const [drinks, setDrinks] = useState<any>();
  const { id } = useParams();
  console.log(drinks);

  useEffect(() => {
    const fechtsApi = async () => {
      const dataDrinks = await fetchDrinksRecipesDetails(id);
      setDrinks(dataDrinks);
    };
    fechtsApi();
  }, []);

  return (
    <>
      <Header title="DrinkDetails" search={ false } profile />
      <h1>aiohadhasldkaslhdlasdlk</h1>
    </>
  );
}
