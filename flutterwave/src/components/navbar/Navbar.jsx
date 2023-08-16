import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo/Flutterwave.svg"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full py-[30px] px-[30px]'>
        <Link to="/">
            <img src={logo} alt="flutterwave logo" className='w-48 cursor-pointer'/>
        </Link>
        <Link to="/register">
            <p className='text-slate-700 py-[7.5px] px-[16px] bg-amber-500 rounded-md cursor-pointer hover:bg-amber-600 font-semibold'>
                Create account
            </p>
        </Link>
    </div>
  )
}

export default Navbar