import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
    let copyright = String.fromCodePoint(0x00A9);

  return (
    <div className='flex flex-row justify-between items-center p-10 text-sm text-slate-600'>
        <p>{copyright}Flutterwave 2023</p>
        <div className='flex flex-row justify-between items-center w-1/4'>
            <Link to="/ng/privacy-policy">
                <p>Privacy policy</p>
            </Link>
            <Link to="/ng/terms">
                <p>Terms and conditions</p>
            </Link>
        </div>
    </div>
  )
}

export default Footer