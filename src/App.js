import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import PrivateRoute from './util/PrivateRoute'
import { AuthorityContextProvider } from './contexts/AuthorityContext'


const App = () => {

    return (
        <>
            <AuthorityContextProvider>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/account" element={
                        <PrivateRoute>
                            <Account />
                        </PrivateRoute>
                    } />
                </Routes>

            </AuthorityContextProvider>
        </>
    )
}

export default App