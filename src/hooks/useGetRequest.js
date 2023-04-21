import {useState} from 'react'

const useGetRequest = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    async function getRequest(endpoint, token) {

        setIsLoading(true)

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if(!response.ok) {
                const errorData = await response.json()
                setError(errorData.msg)
                throw new Error(errorData.msg)
            }
            const jsonData = await response.json()
            
            setData(jsonData)

        } catch(err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }

        
    }

return { data, isLoading, error, getRequest }
}

export default useGetRequest