import React from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


export default function MealCard({ detail,search,setSerch }) {

    // console.log(detail);
    // const navigate = useNavigate()

    // const navigateHome = () => {
    //     setSerch('')
    
    // }

    return (
        <div className='meals'>
            {
                !detail ? "" : detail.map((item, index) => {
                    return (
                        <div key={index} className='mealImg'>

                            <img src={item.strMealThumb} alt="" />
                            <p>{item.strMeal}</p>
                            <div className="recipe-btndiv">
                                {/* <button onClick={navigateHome}>&#8592;</button> */}
                                <NavLink to={`/${item.idMeal}`}><button >Recipe</button></NavLink>

                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}
