import React from 'react'
import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting.js'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem.jsx'





export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

    const cartTotal= cartCtx.items.reduce((total ,item)=>total +item.quantity * item.price,0)
    
    function handleCloseCart(){
        userProgressContext.hideCard();
    }

    function handleGoToCheckout(){
        userProgressContext.hideCard();
        userProgressContext.showCheckout();
    }

    
    return (
        
        <Modal className='cart' open={ userProgressContext.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) =>

                   <CartItem key={item.id}
                    {...item}
                    onIncrease={()=>cartCtx.addItem({...item, quantity:1})}
                    onDecrease={()=>cartCtx.removeItem(item.id)}
                   />
                )}
            </ul>

            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}
