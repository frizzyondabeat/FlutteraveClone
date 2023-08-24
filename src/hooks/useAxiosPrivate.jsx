import {useEffect} from 'react';
import {axiosPrivate} from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const UseAxiosPrivate = () => {

    const refreshToken = useRefreshToken()
    const {auth} = useAuth()

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                console.log(`config: ${JSON.stringify(config)}`)
                !config.headers['Authorization'] &&
                (config.headers['Authorization'] = `Bearer ${auth?.accessToken}`)
                return config
            },
            error => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const previousRequest = error?.config
                if (error?.response?.status === 403 && !previousRequest.sent) {
                    console.log(`responseInterceptor: ${JSON.stringify(error)}`)
                    previousRequest.sent = true
                    const accessToken = await refreshToken()
                    previousRequest.headers['Authorization'] = `Bearer ${accessToken}`
                    return axiosPrivate(previousRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }

    }, [auth, refreshToken])

    return axiosPrivate
};

export default UseAxiosPrivate;