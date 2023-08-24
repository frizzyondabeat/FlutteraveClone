import React from 'react';
import axios from "../api/axios";
import useAuth from "./useAuth";

const UseLogout = () => {

    const {setAuth} = useAuth();

    const logout = async () => {
        const response = await axios.get(
            "/logout",
            {withCredentials: true}
        ).then(
            (response) => {
                setAuth({})
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    return logout

}

export default UseLogout;