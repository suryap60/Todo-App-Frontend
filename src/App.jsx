import { useState } from 'react'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import Todo from './Todo.jsx'



function App() {
  

  return (
    <>
      <div>
        
        <Router>
          <Routes>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/todolist' element={<Todo/>}/>
          </Routes>
        </Router>

      </div>
      
    </>
  )
}

export default App
