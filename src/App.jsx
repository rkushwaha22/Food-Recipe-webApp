import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './Componant/MainPage/MainPage'
import { Route, Routes } from 'react-router-dom'
import MealInfo from './Componant/MealInfo/MealInfo'

function App() {
  

  return (
    <>
    
    <Routes>
       <Route path='/' element={<MainPage/>}/>
        <Route path='/:mealid' element={<MealInfo/>}/>
    </Routes>
    </>
  )
}

export default App
