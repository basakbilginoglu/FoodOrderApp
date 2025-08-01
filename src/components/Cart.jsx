    import React, { useContext } from 'react'
    import CartContext from '../store/CartContext';
    import Modal from './UI/Modal';
    import { currencyFormatter } from './util/formatting';
    import Button from './UI/Button';
    import UserProgressContext from '../store/UserProgressContext';
    import CartItem from './CartItem';
  
    export default function Cart() {

        const cartCtx = useContext(CartContext);
        const userProgressCtx = useContext(UserProgressContext);

        console.log("cartCtx.items", cartCtx.items);

        function handleCloseCart(){
            userProgressCtx.hideCart();
        }

        function handleGoToCheckout(){
            userProgressCtx.showCheckout();
        }


        const totalPrice = cartCtx.items.reduce((totalPrice, item) => totalPrice  + item.price * item.quantity, 0);
        return (
            <Modal open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress==="cart"? {handleCloseCart}:null}
           >
                <h2>Your Cart</h2>
                <ul>
                    {cartCtx.items.map((item) => {
                        console.log("CartItem props:", item);
                        return (
                            <CartItem 
                                key={item.id} 
                                name={item.name} 
                                quantity={item.quantity} 
                                price={item.price}
                                onAdd={() => cartCtx.addItem(item)}
                                onRemove={() => cartCtx.removeItem(item.id)}
                            />
                        );
                    })}
                </ul>

                <p className='cart-total'>Total Amount: {currencyFormatter.format(totalPrice)}</p>
                <p className='modal-actions'>
                    <Button textOnly onClick={handleCloseCart} >Close</Button>
                    {cartCtx.items.length > 0 && ( <Button onClick={handleGoToCheckout}>Go To Checkout</Button> )}
                </p>
            </Modal>
        )
    }