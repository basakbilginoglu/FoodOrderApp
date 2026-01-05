import { useState, useEffect } from "react";
import MealsItem from "./MealItem";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";

export default function Meals() {


  const {data:loadedMeals,isLoading,error}=useHttp("http://localhost:3000/meals",null,[]);

  if(isLoading && !error) {
    return <p className="center">Loading meals...</p>
  }
  if(error) {
    return <Error title="An error occurred!" message={error} />
  }

  return (
    <ul id="meals">
     
      {loadedMeals && loadedMeals.map((meal) => (
        <MealsItem key={meal.id} meal={meal} />
       
      ))}
    
    </ul>
  );
}
