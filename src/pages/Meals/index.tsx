import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

function Meals() {
  return (
    <>
      <Header title="Meals" search profile />
      <Recipes />
    </>
  );
}

export default Meals;
