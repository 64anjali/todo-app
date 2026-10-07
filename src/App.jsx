import { useState } from 'react'
import TodoList from './components/TodoList'
import AddTask from './components/AddTask'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<TodoList/>}/>
      <Route path="/add-task" element={<AddTask/>}/>
    </Routes>
    </>
  )
}

export default App
