import {useState} from 'react'

const useDeleteRequest = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    async function deleteRequest(endpoint) {

        setIsLoading(true)

        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
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

return { data, isLoading, error, deleteRequest }
}

export default useDeleteRequest