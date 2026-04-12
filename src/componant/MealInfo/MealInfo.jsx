import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../MealInfo/MealInfo.css";

export default function MealInfo() {
    const { mealid } = useParams(); 
    const [info, setInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async () => {
            try {
                // TheMealDB ka lookup endpoint use karein
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
                );
                const jsdata = await response.json();
                
                // TheMealDB array return karta hai, humein pehla meal chahiye
                if (jsdata.meals) {
                    setInfo(jsdata.meals[0]);
                }
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        if (mealid) getInfo();
    }, [mealid]);

    // Ingredients ki list banana (TheMealDB mein ingredients alag-alag keys mein hote hain)
    const getIngredients = () => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = info[`strIngredient${i}`];
            const measure = info[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    return (
        <div className="meal-info-wrapper">
            {!info ? (
                <div className="loading">Loading delicious recipe...</div>
            ) : (
                <div className='mealInfo-card'>
                    <div className="image-section">
                        <img src={info.strMealThumb} alt={info.strMeal} />
                        <button className="back-btn" onClick={() => navigate("/")}>
                            ← Back to Menu
                        </button>
                    </div>
                    
                    <div className='info-content'>
                        <span className="category-tag">
                            {info.strCategory} | {info.strArea}
                        </span>
                        
                        <h1 className="meal-title">{info.strMeal}</h1>
                        
                        <div className="ingredients-section">
                            <h3>Ingredients</h3>
                            <ul className="ingredients-list">
                                {getIngredients().map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <h3>Instructions</h3>
                        <div className="instructions-box">
                            <p>{info.strInstructions}</p>
                        </div>

                        {info.strYoutube && (
                            <a href={info.strYoutube} target="_blank" rel="noreferrer" className="video-link">
                                Watch Video Tutorial
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}








// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import "../MealInfo/MealInfo.css";
// const API_KEY = import.meta.env.VITE_API_KEY;

// export default function MealInfo() {
//     const { mealid } = useParams(); // Yeh wahi 'id' hai jo MealCard se aa rahi hai
//     const [info, setInfo] = useState(null);
//     const navigate = useNavigate();

//     // Spoonacular API Key yahan rakhein
    
//     useEffect(() => {
//         const getInfo = async () => {
//             try {
//                 // Spoonacular Information Endpoint
//                 const response = await fetch(
//                     `https://api.spoonacular.com/recipes/${mealid}/information?apiKey=${API_KEY}`
//                 );
//                 const jsdata = await response.json();
//                 setInfo(jsdata);
//             } catch (error) {
//                 console.error("Error fetching recipe details:", error);
//             }
//         };
//         if (mealid) getInfo();
//     }, [mealid]);

//     return (
//         <div className="meal-info-wrapper">
//             {!info ? (
//                 <div className="loading">Loading delicious recipe...</div>
//             ) : (
//                 <div className='mealInfo-card'>
//                     <div className="image-section">
//                         {/* Spoonacular mein images seedha 'image' property mein hoti hain */}
//                         <img src={info.image} alt={info.title} />
//                         <button className="back-btn" onClick={() => navigate("/")}>
//                             ← Back to Menu
//                         </button>
//                     </div>
                    
//                     <div className='info-content'>
//                         {/* Dish types ya Cuisines dikha sakte hain */}
//                         <span className="category-tag">
//                             {info.dishTypes?.[0] || "Recipe"}
//                         </span>
                        
//                         <h1 className="meal-title">{info.title}</h1>
                        
//                         <div className="details-grid">
//                             <div className="detail-item">
//                                 <strong>Ready in:</strong> {info.readyInMinutes} mins
//                             </div>
//                             <div className="detail-item">
//                                 <strong>Servings:</strong> {info.servings}
//                             </div>
//                             <div className="detail-item">
//                                 <strong>Health Score:</strong> {info.healthScore}%
//                             </div>
//                         </div>

//                         <h3>Instructions</h3>
//                         <div className="instructions-box">
//                             {/* Spoonacular mein 'instructions' HTML string bhi ho sakti hai */}
//                             <div dangerouslySetInnerHTML={{ __html: info.instructions || info.summary }} />
//                         </div>

//                         {info.sourceUrl && (
//                             <a href={info.sourceUrl} target="_blank" rel="noreferrer" className="video-link">
//                                 View Full Original Recipe
//                             </a>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
