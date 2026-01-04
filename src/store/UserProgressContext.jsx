import { useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCard:()=>{},
    hideCard:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
});

export function UserProgressContextProvider({children}){

   const[userProgress, setUserProgress]= useState('');

   function showCard(){
    setUserProgress('cart');
   }
   
   function hideCard(){
    setUserProgress('');
   }

    function showCheckout(){
        setUserProgress('checkout');
    }
    
    function hideCheckout(){
        setUserProgress('');
    }
    
    const userProgressContext = {
        progress: userProgress,
        showCard,
        hideCard,
        showCheckout,
        hideCheckout
    }


    return(
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    )
}

   

export default UserProgressContext;