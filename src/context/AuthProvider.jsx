import {createContext, useState} from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [persistedAuth, setPersistedAuth] = useState(JSON.parse(localStorage.getItem("persistAuth")) || false);

    return (
        <AuthContext.Provider value={{auth, setAuth, persistedAuth, setPersistedAuth}}>
            {children}
        </AuthContext.Provider>
    );
}
