import React from 'react'
import { currencyFormatter } from './util/formatting'

export default function CartItem({ name, quantity, price, onAdd, onRemove}) {
    console.log("CartItem props:", { name, quantity, price });
    return (
        
    <li className = "cart-item">
        <p>
            {name} - {quantity} * {currencyFormatter.format(price)}
        </p>
        <p className = "cart-item-actions">
            <button onClick={onRemove}>-</button>
            <span>{quantity}</span>
            <button onClick={onAdd}>+ </button>
        </p>
    </li>
    );
}



