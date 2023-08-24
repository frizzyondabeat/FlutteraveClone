import {useState, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import UseRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const {auth, persistedAuth} = useAuth()
    const refreshToken = UseRefreshToken()

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await refreshToken()
                console.log(`Response: ${JSON.stringify(response)}`)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyToken() : setIsLoading(false)

    }, [])

    useEffect(() => {
        console.log(`persistLogin: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]);

    return (
        <>
            {
                !persistedAuth
                    ? <Outlet/>
                    : isLoading
                        ?
                            <div className="bg-amber-500 items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Loading...
                            </div>
                        : <Outlet/>}
        </>
    )
}

export default PersistLogin