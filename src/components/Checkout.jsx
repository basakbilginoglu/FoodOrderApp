import React from 'react'
import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting.js'  
import Input from './UI/input.jsx'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'

export default function Checkout() {

  const cartContext= useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartTotal= cartContext.items.reduce((total ,item)=>total +item.quantity * item.price,0)

  function handleCloseCheckout(){
    userProgressContext.hideCheckout();
  }
  return (
    <Modal open={ userProgressContext.progress === 'checkout'}>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="full-name" />
            <Input label="E-mail Addresss" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
             <div className='control-row'>
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
             </div>
           
           <p className="modal-actions">
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit</Button> 
           </p>
        </form>
      
    </Modal>
  )
}
