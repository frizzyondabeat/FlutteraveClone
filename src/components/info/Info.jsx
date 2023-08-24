import React from 'react';
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./Info.css"

const Info = ({heading, message}) => {
    return (
        <div className='flex flex-row w-1/2 items-start py-3'>
            <FontAwesomeIcon icon={faCheck} className='text-emerald-700 bg-emerald-100 border-2 border-white p-1 rounded-full'/>
            <div className="ml-5">
                <h1 className='text-slate-600 text-base font-bold mb-2'>{heading}</h1>
                <p className='text-slate-600 text-xs'>{message}</p>
            </div>
        </div>
    );
};

export default Info;