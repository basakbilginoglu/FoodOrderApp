import Button from './UI/Button'
import logo from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
import { useContext } from 'react';

export default function Header() {

  const cartContext = useContext(CartContext);
  const totalItems = 
  cartContext.items.reduce((total, item)=>total + item.quantity, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Foodies</h1>
      </div>
        <nav>
            <Button textOnly>Cart({totalItems})</Button>
        </nav>

    </header>
  )
}
