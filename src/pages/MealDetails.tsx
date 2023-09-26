import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMealsRecipesDetails } from '../utils/SearchApi';

export default function MealDetails() {
  const [meals, setMeals] = useState<any>();
  const { id } = useParams();
  console.log(meals);

  useEffect(() => {
    const fechtsApi = async () => {
      const dataMeals = await fetchMealsRecipesDetails(id);
      setMeals(dataMeals);
    };
    fechtsApi();
  }, []);

  return (
    <>
      <Header title="DrinkDetails" search={ false } profile />
      <div>MealDetails</div>
    </>
  );
}
