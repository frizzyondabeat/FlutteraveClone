import './App.css'
import { Login, Register, Home } from "./containers"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Footer } from './components'

function App() {

  return (
    <div className='w-full overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
