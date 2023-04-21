
import React, { createContext, useState, useEffect } from "react";

const AuthorityContext = createContext()


function AuthorityContextProvider(props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)


    useEffect(()=>{
        const storedToken = localStorage.getItem('mobo_user_authorisation');
        if(storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])


    function saveToken(newToken) {
        setToken(newToken)
        setIsAuthenticated(true)
        localStorage.setItem('mobo_user_authorisation', newToken)
    }


    function logOut() {
        setIsAuthenticated(false)
        setToken(null)
        localStorage.removeItem('mobo_user_authorisation')
    }


    return (
        <AuthorityContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, saveToken, logOut }}>
            {props.children}
        </AuthorityContext.Provider>
    )

}

export { AuthorityContext, AuthorityContextProvider }