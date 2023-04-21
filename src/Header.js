import React from 'react'
import useAuth from './hooks/useAuth'
import { Link } from 'react-router-dom'

const Header = () => {

    const { isAuthenticated } = useAuth()


    const linkStyling = "hover:underline cursor-pointer"

    return (
        <header className="flex bg-slate-100 p-10">
            <div className="basis-1/6">
                <p>Logo</p>
            </div>
            <nav className="basis-4/6">
                <ul className="flex w-full space-x-4 justify-center ">
                    <li><Link className={linkStyling} to="/">Home</Link></li>
                    <li><Link className={linkStyling} to="/about">About</Link></li>
                    <li><Link className={linkStyling} to="/contact">Contact</Link></li>
                    <li><Link className={linkStyling} to="/account">My Account</Link></li>
                </ul>
            </nav>
            <div className="basis-1/6">
                {isAuthenticated
                    ?
                    <p>You Are Logged In</p>
                    :
                    <p>
                        <Link className={linkStyling} to="/login">Login</Link>
                        &nbsp;or&nbsp;
                        <Link className={linkStyling} to="/signup">Signup</Link>
                    </p>
                }
            </div>
        </header>
    )
}

export default Header