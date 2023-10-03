import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

function Meals() {
  return (
    <>
      <Header title="Meals" search profile />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
