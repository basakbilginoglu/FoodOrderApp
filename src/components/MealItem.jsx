import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import Button from './UI/Button';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1
    });
  }

  return (
    <li className="meal-item">
      <div>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <p>{meal.description}</p>
        <span>{meal.price}₺</span>
      </div>
      <Button onClick={handleAddToCart}>Sepete Ekle</Button>
    </li>
  );
}
