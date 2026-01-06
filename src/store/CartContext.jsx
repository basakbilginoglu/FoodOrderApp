import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1
      };
    }

    return { items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state,items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: []
  });

  function addItem(item) {
    cartDispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    cartDispatch({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    cartDispatch({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
