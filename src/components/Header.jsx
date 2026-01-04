import Button from './UI/Button'
import logo from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
import { useContext } from 'react';

import UserProgressContext from '../store/UserProgressContext';

export default function Header() {

  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
     
  const totalItems = 
  cartContext.items.reduce((total, item)=>total + item.quantity, 0);

  function handleShowCart(){
    userProgressContext.showCard();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Foodies</h1>
      </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart({totalItems})</Button>
        </nav>

    </header>
  )
}
