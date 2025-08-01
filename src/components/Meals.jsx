    import React, { useMemo } from 'react'
    import useHttp from '../hooks/useHttp';
    import MealItem from './MealItem';
    import Error from './Error';
    
    export default function Meals() {

        
        
        const requestConfig = useMemo(() => ({}), []);
        const {data,isLoading,error} = useHttp("http://localhost:3000/meals",requestConfig,[])

        if(isLoading){
            return <p className='center'> Data Fetching...</p>
        }

        if (error) {
            return <Error title="Failed to fetch meals" message={error} />
        }

        console.log(data); // debug için

      return (

       
       
         <ul id="meals">
           {data && data.map((meal) => (
             <MealItem key={meal.id} meal={meal} />
           ))}
         </ul>
       
      );
    }
    