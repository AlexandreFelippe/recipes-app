import cowFace from '../../images/🦆 emoji _cow face_.svg';
import chicken from '../../images/🦆 emoji _chicken_.svg';
import shortcake from '../../images/🦆 emoji _shortcake_.svg';
import goat from '../../images/goat-svgrepo-com 1.svg';
import breakfest from '../../images/Group 7.svg';
import ordinaryDrink from '../../images/🦆 icon _Drink Wine_.svg';
import coctail from '../../images/🦆 icon _cocktail_.svg';
import shake from '../../images/🦆 icon _drink_.svg';
import other from '../../images/🦆 icon _beer solid_.svg';
import cocoa from '../../images/Group 4.svg';
import styles from './imagestocategory.module.css';

export default function imagestocategory(image: string) {
  switch (image) {
    case 'Beef':
      return (<img
        src={ cowFace }
        alt="cow"
        className={ `${styles.cow} ${styles.all}` }
      />);
    case 'Chicken':
      return (<img
        src={ chicken }
        alt="chicken"
        className={ `${styles.chicken} ${styles.all}` }
      />);
    case 'Dessert':
      return (<img
        src={ shortcake }
        alt="shortcake"
        className={ `${styles.shortcake} ${styles.all}` }
      />);
    case 'Goat':
      return (<img
        src={ goat }
        alt="goat"
        className={ `${styles.goat} ${styles.all}` }
      />);
    case 'Breakfast':
      return (<img
        src={ breakfest }
        alt="breakfast"
        className={ `${styles.breakfast} ${styles.all}` }
      />);
    case 'Ordinary Drink':
      return (<img
        src={ ordinaryDrink }
        alt="ordinaryDrink"
        className={ `${styles.ordinaryDrink} ${styles.all}` }
      />);
    case 'Cocktail':
      return (<img
        src={ coctail }
        alt="coctail"
        className={ `${styles.coctail} ${styles.all}` }
      />);
    case 'Shake':
      return (<img
        src={ shake }
        alt="shake"
        className={ `${styles.shake} ${styles.all}` }
      />);
    case 'Other / Unknown':
      return (<img
        src={ other }
        alt="other"
        className={ `${styles.other} ${styles.all}` }
      />);
    case 'Cocoa':
      return (<img
        src={ cocoa }
        alt="cocoa"
        className={ `${styles.cocoa}` }
      />);
    default:
      return '';
  }
}
