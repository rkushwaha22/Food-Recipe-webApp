import React, { useState } from 'react'
import MealCard from './MealCard/MealCard';
import Loader from './Loader/Loader';

export default function MainPage() {

  const [data, setData] = useState();
  const [search, setSerch] = useState("")



  const HandleInput = (e) => {
    setSerch(e.target.value);
    // console.log(search);
  }

  const myfun = async () => {
    if (search == "") {
      alert("Please Enter Something")

    }
    
    else {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      // console.log(get);
      const jsonData = await get.json();
      // console.log(jsonData.meals);
      setData(jsonData.meals);
      // console.log(data);
    }
  
  }


  return (
    <>
      <h1 className='head'>FOOD RECIPE APP</h1>
      <div className='container'>
        <div className="searchBar">
          <input type="text" placeholder='Enter Dishes Ex :- Veg , Rice.....' onChange={HandleInput} />
          <button onClick={myfun}>Search</button>
        </div>
        {
          search == "" ? <div className='loader-container'>
            <p className='load-para'>Search here what you want to cook</p><Loader /></div>
           : <div> <MealCard detail={data} search={search} setSerch={setSerch} />
          </div>
        }
 

      </div>
    </>
  )
}
