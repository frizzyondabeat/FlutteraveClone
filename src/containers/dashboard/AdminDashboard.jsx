import React from 'react';
import { Sidebar } from '../../components';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';


const AdminDashboard = () => {
    return (
        <div className='bg-white flex'>
            <div className='flex-row'>
                <Sidebar />
                <div className='flex-col'>
                    <div className='flex justify-between items-center bg-amber-300 py-4 px-6'>
                        <p>Welcome to Flutterwave</p>
                        <p>Fill in your profile details to fully verify your account and start accepting payments.</p>
                        <Link to='/onboarding' className='underline'>Get started</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;