import { createContext,useReducer } from "react";

const CartContext=createContext(
    {
        items:[],
        addItem: (item) => {},
        removeItem: (id) => {}
    }
);

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedItems = state.items.filter(
      item => item.id !== action.id
    );
    return { items: updatedItems };
  }

  return state;
}


export function CartContextProvider({ children }) {
useReducer(cartReducer, {
    items: []
  });

 

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}


export default CartContext;