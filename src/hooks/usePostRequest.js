import {useState} from 'react'

const usePostRequest = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    async function postRequest(endpoint, body) {

        setIsLoading(true)
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : null,
            })

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.msg)
                throw new Error(errorData.msg)
            }

            const jsonData = await response.json()
            setData(jsonData)

        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { data, isLoading, error, setError, postRequest }
}

export default usePostRequest