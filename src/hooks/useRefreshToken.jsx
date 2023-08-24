import React from 'react';
import axios from "../api/axios";
import useAuth from "./useAuth";

const UseRefreshToken = () => {

    const {setAuth} = useAuth();

    const refreshToken = async () => {
        const response = await axios.get(
            "/refresh",
            {withCredentials: true}
        ).then(
            (response) => {
                setAuth(prevState => {
                    console.log(`prevState: ${JSON.stringify(prevState)}`)
                    console.log(`refreshToken: ${response?.data?.accessToken}`)
                    return {
                        ...prevState,
                        roles: response?.data?.roles,
                        accessToken: response?.data?.accessToken
                    }
                })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        return response?.data?.accessToken
    }

    return refreshToken
};

export default UseRefreshToken;