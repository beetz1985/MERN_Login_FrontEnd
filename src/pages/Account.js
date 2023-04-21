import React, { useState, useContext, useEffect } from 'react'
import { AuthorityContext } from '../contexts/AuthorityContext'
import useGetRequest from '../hooks/useGetRequest'
import useDeleteRequest from '../hooks/useDeleteRequest'
import UserCard from '../components/UserCard'
import { API_BASE_URL } from '../util/constants'

const Account = () => {
    const [displayData, setDisplayData] = useState(null)
    const [displayError, setDisplayError] = useState(null)
    const { token, logOut } = useContext(AuthorityContext)
    const { isLoading: deleteIsLoading, error: deleteError, deleteRequest } = useDeleteRequest()
    const { data: getData, isLoading: getIsLoading, error: getError, getRequest } = useGetRequest()


    useEffect(() => {
        getRequest(`${API_BASE_URL}/april/jwt/api/protected_users`, token)
    }, [getRequest, token])

    useEffect(() => {
        if (getData) {
            setDisplayData(getData)
            setDisplayError(null)
        }
        if (getError) {
            setDisplayError(getError)
        }
    }, [getData, getError])





    function handleLogout(e) {
        e.preventDefault()
        logOut()
    }

    async function handleDeleteUser(id) {
        await deleteRequest(`${API_BASE_URL}/april/jwt/api/${id}`)
        await getRequest(`${API_BASE_URL}/april/jwt/api/protected_users`, token)
    }


    const userElements = displayData?.map((v, i) => {
        return <UserCard key={i} email={v.email} id={v._id} deleteUser={handleDeleteUser} />
    })

    return (
        <section className="flex">
            <div className="p-10">
                <div>Your Personal Account</div>
                <button onClick={handleLogout} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out my-4">Log Out</button>
            </div>
            <div className="w-64">
                {displayError && <p>Unable to show data</p>}
                {userElements}
            </div>
        </section>
    )
}

export default Account