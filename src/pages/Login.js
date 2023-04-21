import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import usePostRequest from '../hooks/usePostRequest'
import { AuthorityContext } from '../contexts/AuthorityContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

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
        const { name, value } = e.target
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        postRequest('http://localhost:5000/april/jwt/api/login', {email, password})

        //Hit API Authentication Endpoint
    }




    return (
        <section className="border-[1px] max-w-[350px] h-[fit-content] shadow-lg mx-auto my-20">
            <form className="h-full w-full text-center my-10" onSubmit={handleSubmit}>
                <div className="inline-flex flex-col justify-center items-start h-full gap-4">
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input onChange={handleChange} className="border-[1px]" type="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={handleChange} className="border-[1px]" type="password" name="password" />
                    </div>
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out my-4">Log In</button>
                </div>
                <p>No account? No worries, sign up <Link className="hover:underline text-blue-300" to="/signup">here!</Link></p>
                {
                error 
                && 
                <p className="w-full text-center p-2 my-4 text-red-600 font-bold">Error: <span className="font-normal">{error}</span></p>}
            </form>
        </section>
    )
}

export default Login