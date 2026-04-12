import React, { useState } from 'react';
import MealCard from '../MealCard/MealCard';
import Loader from '../Loader/Loader';
import "../MainPage/MainPage.css";

export default function MainPage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const HandleInput = (e) => {
    setSearch(e.target.value);
  }

  const myfun = async () => {
    if (search.trim() === "") {
      alert("Please Enter Something");
      return;
    }

    setLoading(true);
    setHasSearched(true); 
    setData(null); // Purana data clear karein taaki results refresh hon

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await response.json();
      setData(jsonData.meals); 
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      // API call khatam hote hi loader hat jayega
      setLoading(false); 
    }
  }

  return (
    <div className="main-wrapper">
      <div className="hero-section">
        <h1 className='head'>Crave & Cook</h1>
        <p className="sub-head">Discover the best recipes from around the world</p>

        <div className='search-container'>
          <div className="searchBar">
            <input
              type="text"
              placeholder='Search Dishes...'
              onChange={HandleInput}
              onKeyDown={(e) => e.key === 'Enter' && myfun()} 
            />
            <button onClick={myfun}>Search</button>
          </div>
        </div>
      </div>

      <div className='content-section'>
        {/* LOGIC START */}
        
        {/* 1. Jab tak search nahi kiya (Initial State) */}
        {!hasSearched && (
          <div className='loader-container'>
             <Loader /> {/* Search se pehle wala loader */}
             <p className='load-para'>Hungry? Search for a delicious meal!</p>
          </div>
        )}

        {/* 2. Jab search ho raha ho (During Search) */}
        {loading && (
          <div className='loader-container'>
            <Loader /> 
            <p className='load-para'>Flipping the pans for you...</p>
          </div>
        )}

        {/* 3. Jab search khatam ho jaye aur data aa jaye (After Search) */}
        {!loading && hasSearched && (
          <div className="results-container">
            {data === null ? (
              <div className='loader-container'>
                <p className='load-para'>No recipes found for "{search}".</p>
              </div>
            ) : (
              <MealCard detail={data} />
            )}
          </div>
        )}

        {/* LOGIC END */}
      </div>
    </div>
  );
}

