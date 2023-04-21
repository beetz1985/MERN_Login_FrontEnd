import React, { useState, useEffect, useContext } from 'react'
import { AuthorityContext } from '../contexts/AuthorityContext'
import usePostRequest from '../hooks/usePostRequest'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const {saveToken} = useContext(AuthorityContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {data, isLoading, error, setError, postRequest} = usePostRequest()
    const navigate = useNavigate()


    useEffect(()=>{
        if(data) {
            console.log("Data: " + data)
            saveToken(data)
            setEmail('')
            setPassword('')
            setError('')
            navigate('/account')
        }

        if(error) {
            console.log("Error: " + error)
        }
    }, [data, error, navigate, saveToken, setError])



    function handleChange(e) {
        if(error) setError('')
        const { name, value } = e.target
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        postRequest('http://localhost:5000/april/jwt/api/register', {email, password})
    }

    function handleClear(e) {
        e.preventDefault()
        setEmail('')
        setPassword('')
        setError('')
    }


    return (
        <section className="flex flex-col w-[fit-content] h-[fit-content] p-10 mx-auto my-10">
            <h2 className="text-3xl font-bold text-slate-600 mb-10">Join Us...</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-4 my-4">
                    <div className="flex flex-col">
                        <label className="text-[0.75rem] px-2" htmlFor="email">Email: </label>
                        <input onChange={handleChange} className="border-[1px] rounded-full px-2" type="email" name="email" value={email}/>
                    </div>
                    <div className="flex flex-col ">
                        <label className="text-[0.75rem] px-2" htmlFor="password">Password: </label>
                        <input onChange={handleChange} className="border-[1px] rounded-full px-2" type="password" name="password" value={password}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out my-4">Sign Up</button>
                    <button onClick={handleClear} className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out my-4">Clear</button>
                </div>

            </form>
            {error && <p className="w-full text-center p-2 my-4 text-red-600 font-bold">Error: <span className="font-normal">{error}</span></p>}
        </section>
    )
}

export default Signup