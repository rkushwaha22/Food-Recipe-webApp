import React, { useState } from 'react';
import MealCard from '../MealCard/MealCard';
import Loader from '../Loader/Loader';
import "../MainPage/MainPage.css";

export default function MainPage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if search was ever performed

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

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await response.json();

      // TheMealDB returns null in .meals if nothing is found
      setData(jsonData.meals); 
    } catch (error) {
      console.log("Error fetching data", error);
      alert("Network issue! Please try again.");
    } finally {
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
              placeholder='Search Dishes Ex: Paneer, Pasta, Burger...'
              onChange={HandleInput}
              onKeyDown={(e) => e.key === 'Enter' && myfun()} 
            />
            <button onClick={myfun}>Search</button>
          </div>
        </div>
      </div>

      <div className='content-section'>
        {loading ? (
          /* Case 1: Fetching Data */
          <div className='loader-container'>
            <Loader />
            <p className='load-para'>Flipping the pans for you...</p>
          </div>
        ) : !hasSearched ? (
          /* Case 2: Initial State (No search yet) */
          <div className='loader-container'>
            <p className='load-para'>Hungry? Search for a delicious meal!</p>
          </div>
        ) : data === null ? (
          /* Case 3: No Results Found */
          <div className='loader-container'>
            <p className='load-para'>No recipes found for "{search}". Try something else!</p>
          </div>
        ) : (
          /* Case 4: Results Found */
          <div className="results-container">
            <MealCard detail={data} />
          </div>
        )}
      </div>
    </div>
  );
}






















// import React, { useState } from 'react'
// import MealCard from '../MealCard/MealCard';
// import Loader from '../Loader/Loader';
// import "../MainPage/MainPage.css";
// const API_KEY = import.meta.env.VITE_API_KEY;

// export default function MainPage() {
//   const [data, setData] = useState(null);
//   const [search, setSerch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const HandleInput = (e) => {
//     setSerch(e.target.value);
//   }

//   // const myfun = async () => {
//   //   if (search.trim() === "") {
//   //     alert("Please Enter Something");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   setData(null);

//   //   try {
//   //     // Spoonacular ka ComplexSearch endpoint sabse best hai

//   //     const response = await fetch(
//   //         `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=12&apiKey=${API_KEY}`
//   //         );

//   //     // const response = await fetch(
//   //     //   `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=12&apiKey=${API_KEY}`,
//   //     //   {
//   //     //     method: 'GET',
//   //     //     headers: {
//   //     //       'Content-Type': 'application/json',
//   //     //     }
//   //     //   }
//   //     // );

//   //     const jsonData = await response.json();

//   //     // Spoonacular mein data 'results' array ke andar hota hai
//   //     // Aise likhein taaki agar data na mile toh crash na ho
//   //     if (jsonData && jsonData.results) {
//   //       setData(jsonData.results);
//   //     } else {
//   //       console.log("No data found");
//   //       setData([]); // Empty array set karein
//   //     }

//   //   } catch (error) {
//   //     console.error("Error fetching data", error);
//   //     alert("API Limit reach ho gayi ya network issue hai!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const myfun = async () => {
//     if (search.trim() === "") {
//       alert("Please Enter Something");
//       return;
//     }

//     // Loader on karein aur purana data reset karein
//     setLoading(true);
//     setData(null); 

//     try {
//       const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
//       const jsonData = await get.json();

//       // Data set karein
//       setData(jsonData.meals);
//     } catch (error) {
//       console.log("Error fetching data", error);
//       alert("Something went wrong. Please check your internet connection.");
//     } finally {
//       // Har haal mein loader off karein
//       setLoading(false); 
//     }
//   }

//   return (
//     <div className="main-wrapper">
//       <div className="hero-section">
//         <h1 className='head'>Crave & Cook</h1>
//         <p className="sub-head">Discover the best recipes from around the world</p>

//         <div className='search-container'>
//           <div className="searchBar">
//             <input
//               type="text"
//               placeholder='Search Dishes Ex: Paneer, Pasta, Burger...'
//               onChange={HandleInput}
//               onKeyDown={(e) => e.key === 'Enter' && myfun()} // Enter key support
//             />
//             <button onClick={myfun}>Search</button>
//           </div>
//         </div>
//       </div>

//       <div className='content-section'>
//         {
//           /* Jab loading ho rahi ho ya pehli baar page khula ho (!data) */
//           loading || !data ? (
//             <div className='loader-container'>
//               <Loader />
//               <p className='load-para'>
//                 {loading ? "Flipping the pans for you..." : "Hungry? Search for a delicious meal!"}
//               </p>
//             </div>
//           ) : (
//             /* Jab data mil jaye aur loading ruk jaye */
//             <div className="results-container">
//               {/* Agar search result null ho (item na mile) */}
//               {data === null ? (
//                 <p className='load-para'>No recipes found. Try searching for something else!</p>
//               ) : (
//                 <MealCard detail={data} />
//               )}
//             </div>
//           )
//         }
//       </div>
//     </div>
//   );
// }





// // import React, { useState } from 'react'
// // import MealCard from '../MealCard/MealCard';
// // import Loader from '../Loader/Loader';
// // import "../MainPage/MainPage.css"

// // export default function MainPage() {
// //   const [data, setData] = useState(null); // Initial state null rakhein
// //   const [search, setSerch] = useState("");
// //   const [loading, setLoading] = useState(false); // Loading state add ki



// //   const HandleInput = (e) => {
// //     setSerch(e.target.value);
// //     // console.log(search);
// //   }

// //   const myfun = async () => {
// //     if (search == "") {
// //       alert("Please Enter Something")

// //     }

// //     else {
// //       const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
// //       // console.log(get);
// //       const jsonData = await get.json();
// //       // console.log(jsonData.meals);
// //       setData(jsonData.meals);
// //       // console.log(data);
// //     }

// //   }

// //   return (
// //     <div className="main-wrapper">
// //       <div className="hero-section">
// //         <h1 className='head'>Crave & Cook</h1>
// //         <p className="sub-head">Discover the best recipes from around the world</p>

// //         <div className='search-container'>
// //           <div className="searchBar">
// //             <input
// //               type="text"
// //               placeholder='Search Dishes Ex: Paneer, Pasta, Burger...'
// //               onChange={HandleInput}
// //               onKeyDown={(e) => e.key === 'Enter' && myfun()}
// //             />
// //             <button onClick={myfun}>Search</button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className='content-section'>
// //         {
// //           /* Agar loading ho raha hai YA data abhi tak null hai, toh Pan Loader dikhao */
// //           loading || !data ? (
// //             <div className='loader-container'>
// //               <Loader />
// //               <p className='load-para'>
// //                 {loading ? "Flipping the pans for you..." : "Hungry? Search for a delicious meal!"}
// //               </p>
// //             </div>
// //           ) : (
// //             /* Jab data aa jaye aur loading khatam ho jaye */
// //             <div className="results-container">
// //               <MealCard detail={data} search={search} setSerch={setSerch} />
// //             </div>
// //           )
// //         }
// //       </div>
// //     </div>
// //   );
// // }
