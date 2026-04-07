import React from 'react'
import { NavLink } from 'react-router-dom';
import "../MealCard/MealCard.css";

export default function MealCard({ detail }) {
    return (
        <div className="meals-grid">
            {detail.map((curItem) => {
                return (
                    <div className="meal-card" key={curItem.id}>
                        <div className="meal-img-wrapper">
                            <img src={curItem.image} alt={curItem.title} />
                            <div className="meal-overlay">
                                <Link to={`/${curItem.id}`} className="recipe-link">
                                    View Recipe
                                </Link>
                            </div>
                        </div>

                        <div className="meal-info-footer">
                            <p title={curItem.title}>{curItem.title}</p>
                            <span>Recipe ID: {curItem.id}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}