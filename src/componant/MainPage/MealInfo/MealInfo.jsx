import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function MealInfo() {
    const {mealid}= useParams();
    const [info,setInfo]=useState()
   
    
    const getInfo = async ()=>{
        const get =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
        const jsdata = await get.json();
        console.log(jsdata.meals[0]);
        setInfo(jsdata.meals[0])
        
        
    }
   if(info != ""){
    getInfo()
   }
   const navigate = useNavigate()
   const navigateHome = ()=>{
    navigate("/")
   }
  return (
   <>

    {
        !info ? "Data not found" : 
        <div className='mealInfo'>
      <img src={info.strMealThumb} alt="" />
      <div className='info'>
        
        <h1>Recipe Details</h1>
        <button>{info.strMeal}</button> 
        <h3>Instruction</h3>
        <p>{info.strInstructions}</p>
         <button onClick={navigateHome}>&#8592;</button>
      </div>
    </div>
    }
   
   </>
    
  )
}
