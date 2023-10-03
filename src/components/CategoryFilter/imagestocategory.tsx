import cowFace from '../../images/🦆 emoji _cow face_.svg';
import chicken from '../../images/🦆 emoji _chicken_.svg';
import shortcake from '../../images/🦆 emoji _shortcake_.svg';
import goat from '../../images/goat-svgrepo-com 1.svg';
import breakfest from '../../images/Group 7.svg';
import styles from './imagestocategory.module.css';

export default function imagestocategory(image: string) {
  switch (image) {
    case 'Beef':
      return <img src={ cowFace } alt="cow" className={ styles.cow } />;
    case 'Chicken':
      return <img src={ chicken } alt="chicken" className={ styles.chicken } />;
    case 'Dessert':
      return <img src={ shortcake } alt="shortcake" className={ styles.shortcake } />;
    case 'Goat':
      return <img src={ goat } alt="goat" className={ styles.goat } />;
    case 'Breakfast':
      return <img src={ breakfest } alt="breakfast" className={ styles.breakfast } />;
    default:
      return '';
  }
}
