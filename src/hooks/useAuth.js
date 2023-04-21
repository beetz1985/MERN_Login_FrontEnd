import { useContext } from 'react'
import { AuthorityContext } from '../contexts/AuthorityContext'


const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated, token, setToken } = useContext(AuthorityContext)
    return (
        { isAuthenticated, setIsAuthenticated, token, setToken }
    )
}

export default useAuth