import React from 'react';
import { Link } from 'react-router-dom'; // 'Link' import karna zaroori hai
import "../MealCard/MealCard.css";

export default function MealCard({ detail }) {
    return (
        <div className="meals-grid">
            {detail.map((curItem) => {
                return (
                    // TheMealDB mein unique ID 'idMeal' hoti hai
                    <div className="meal-card" key={curItem.idMeal}>
                        <div className="meal-img-wrapper">
                            {/* TheMealDB ki keys: strMealThumb aur strMeal */}
                            <img src={curItem.strMealThumb} alt={curItem.strMeal} />
                            
                            <div className="meal-overlay">
                                {/* Recipe detail page ke liye link */}
                                <Link to={`/${curItem.idMeal}`} className="recipe-link">
                                    View Recipe
                                </Link>
                            </div>
                        </div>

                        <div className="meal-info-footer">
                            <h3 title={curItem.strMeal}>{curItem.strMeal}</h3>
                            <div className="meal-meta">
                                <span>{curItem.strCategory}</span>
                                <span className="area-tag">{curItem.strArea}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}









// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import "../MealCard/MealCard.css";

// export default function MealCard({ detail }) {
//     return (
//         <div className="meals-grid">
//             {detail.map((curItem) => {
//                 return (
//                     <div className="meal-card" key={curItem.id}>
//                         <div className="meal-img-wrapper">
//                             <img src={curItem.image} alt={curItem.title} />
//                             <div className="meal-overlay">
//                                 <Link to={`/${curItem.id}`} className="recipe-link">
//                                     View Recipe
//                                 </Link>
//                             </div>
//                         </div>

//                         <div className="meal-info-footer">
//                             <p title={curItem.title}>{curItem.title}</p>
//                             <span>Recipe ID: {curItem.id}</span>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
