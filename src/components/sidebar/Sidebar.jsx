import {useState, useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import useRefreshToken from "../../hooks/useRefreshToken"

const Sidebar = () => {

    const [mainMenu, setMainMenu] = useState(false)

    return (
        <div>
            <div className='flex flex-col bg-slate-100 w-60 h-screen py-6'>
                <div className='flex flex-col justify-start px-6'>
                    {
                        mainMenu ? (
                            <div className='flex justify-between items-center mb-6'>

                                <div className='flex items-center'>
                                    <p className='text-slate-500 text-xl'>Close</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div
                                    className='flex items-center space-x-2 mb-10 cursor-pointer hover:text-slate-500'
                                    onClick={
                                        () => {
                                            setMainMenu(!mainMenu)
                                        }
                                    }
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className='text-xs text-slate-500 mr-2'/>
                                    <p className='text-slate-500 text-sm'>Main menu</p>
                                </div>
                                <h1 className='text-slate-800 font-semibold text-2xl mb-3'>Settings</h1>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar