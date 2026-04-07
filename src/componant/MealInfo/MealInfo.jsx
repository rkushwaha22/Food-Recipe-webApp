import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../MealInfo/MealInfo.css";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function MealInfo() {
    const { mealid } = useParams(); // Yeh wahi 'id' hai jo MealCard se aa rahi hai
    const [info, setInfo] = useState(null);
    const navigate = useNavigate();

    // Spoonacular API Key yahan rakhein
    
    useEffect(() => {
        const getInfo = async () => {
            try {
                // Spoonacular Information Endpoint
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${mealid}/information?apiKey=${API_KEY}`
                );
                const jsdata = await response.json();
                setInfo(jsdata);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        if (mealid) getInfo();
    }, [mealid]);

    return (
        <div className="meal-info-wrapper">
            {!info ? (
                <div className="loading">Loading delicious recipe...</div>
            ) : (
                <div className='mealInfo-card'>
                    <div className="image-section">
                        {/* Spoonacular mein images seedha 'image' property mein hoti hain */}
                        <img src={info.image} alt={info.title} />
                        <button className="back-btn" onClick={() => navigate("/")}>
                            ← Back to Menu
                        </button>
                    </div>
                    
                    <div className='info-content'>
                        {/* Dish types ya Cuisines dikha sakte hain */}
                        <span className="category-tag">
                            {info.dishTypes?.[0] || "Recipe"}
                        </span>
                        
                        <h1 className="meal-title">{info.title}</h1>
                        
                        <div className="details-grid">
                            <div className="detail-item">
                                <strong>Ready in:</strong> {info.readyInMinutes} mins
                            </div>
                            <div className="detail-item">
                                <strong>Servings:</strong> {info.servings}
                            </div>
                            <div className="detail-item">
                                <strong>Health Score:</strong> {info.healthScore}%
                            </div>
                        </div>

                        <h3>Instructions</h3>
                        <div className="instructions-box">
                            {/* Spoonacular mein 'instructions' HTML string bhi ho sakti hai */}
                            <div dangerouslySetInnerHTML={{ __html: info.instructions || info.summary }} />
                        </div>

                        {info.sourceUrl && (
                            <a href={info.sourceUrl} target="_blank" rel="noreferrer" className="video-link">
                                View Full Original Recipe
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
