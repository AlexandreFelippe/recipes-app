import { useNavigate } from 'react-router-dom';
import './styles.css';
import iconeBebidas from '../../images/icone-bebida.svg';
import iconePrato from '../../images/icone-prato.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer" className="footer">
      <button
        onClick={ () => navigate('/drinks') }
        className="button-footer"
      >
        <img
          src={ iconeBebidas }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        onClick={ () => navigate('/meals') }
        className="button-footer"
      >
        <img
          src={ iconePrato }
          alt="mealIcon"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
