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

  function handleSubmit(event){
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData= Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            order:{
            customer:customerData,
            items:cartContext.items
            }
        })
    })

  }
  return (
    <Modal open={ userProgressContext.progress === 'checkout'}>
        <form onSubmit={handleSubmit} >
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" name="name" />
            <Input label="E-mail Addresss" type="email" id="email" name="email" />
            <Input label="Street" type="text" id="street" name="street" />
             <div className='control-row'>
                <Input label="Postal Code" type="text" id="postal-code" name="postal-code"/>
                <Input label="City" type="text" id="city" name="city"/>
             </div>
           
           <p className="modal-actions">
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit</Button> 
           </p>
        </form>
      
    </Modal>
  )
}
