import {useState, useEffect} from 'react';
import {Sidebar} from '../../components';
import {Link} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useRefreshToken from '../../hooks/useRefreshToken';

const Dashboard = () => {

    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState([])

    // useEffect(() => {
    //     let isMounted = true
    //     const controller = new AbortController()
    //
    //     const getUsers = async () => {
    //         await axiosPrivate.get(
    //             '/users',
    //             {signal: controller.signal}
    //         ).then(
    //             (response) => {
    //                 isMounted && setUsers(response?.data)
    //             }
    //         ).catch(
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    //     }
    //
    //     getUsers()
    //
    //     return () => {
    //         isMounted = false
    //         controller.abort()
    //     }
    //
    // }, [])

    return (
        <div className='bg-white flex w-full h-full'>
            <div className='flex w-full'>
                <Sidebar/>
                <div className='flex flex-col w-full'>
                    <div
                        className='flex flex-col justify-center items-center text-slate-700 bg-amber-200 py-2 px-6 w-full'>
                        <p className='text-sm font-bold'>Welcome to Flutterwave</p>
                        <p className='text-sm font tracking-wide'>Fill in your profile details to fully verify your
                            account and start accepting payments. <Link to='/onboarding' className='underline'>Get
                                started</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;