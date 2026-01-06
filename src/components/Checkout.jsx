import React from 'react'
import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting.js'
import Input from './UI/input.jsx'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import useHttp from '../hooks/useHttp.jsx'
import Error from './Error.jsx'

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
}

export default function Checkout() {

  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig, null);

  const cartTotal = cartContext.items.reduce((total, item) => total + item.quantity * item.price, 0)

  function handleCloseCheckout() {
    userProgressContext.hideCheckout();
  }

  function handleFinish() {
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          customer: customerData,
          items: cartContext.items,
        },
      })
    );
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button>Submit</Button>
    </>
  )

  if (isLoading) {
    action = <span>Sending order data...</span>
  }
   
  if (data && !error) {
    return (
      <Modal open={userProgressContext.progress === 'checkout'} onClose={handleFinish}>
        <h2>Order Submitted Successfully!</h2>
        <p>Thank you for your order.</p>
        <div className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" name="name" />
        <Input label="E-mail Addresss" type="email" id="email" name="email" />
        <Input label="Street" type="text" id="street" name="street" />
        <div className='control-row'>
          <Input label="Postal Code" type="text" id="postal-code" name="postal-code" />
          <Input label="City" type="text" id="city" name="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <div className="modal-actions">
          {action}
        </div>
      </form>
    </Modal>
  )
}