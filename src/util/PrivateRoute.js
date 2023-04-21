import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthorityContext } from '../contexts/AuthorityContext'

const PrivateRoute = (props) => {

    const { isAuthenticated, token } = useContext(AuthorityContext)

    return (
        <>
            {isAuthenticated && token ? props.children : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRoute