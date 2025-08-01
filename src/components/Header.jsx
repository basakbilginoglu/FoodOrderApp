    import React from 'react';
    import logo from '../assets/logo.jpg';
    import Button from './UI/Button';
    import CartContext from '../store/CartContext';
    import { useContext } from 'react';
    import UserProgressContext from '../store/UserProgressContext';
    
  
    export default function Header() {


      const contextCtx = useContext(CartContext);
      const userProgressCtx = useContext(UserProgressContext);
      
      function handleShowCart(){
        userProgressCtx.showCart();
      }

      const totalCartItems = contextCtx.items.reduce((total, item) => total + item.quantity, 0);
      return (
        <header id="main-header">
        <div id="title">
            <img src={logo} alt="logo"/>
            <h1> Food Order Restaurant</h1>
        </div>
            <nav>
                <Button textOnly onClick={userProgressCtx.showCart} >Cart ({totalCartItems})</Button>
            </nav>
       
        </header>
      )
    }
    