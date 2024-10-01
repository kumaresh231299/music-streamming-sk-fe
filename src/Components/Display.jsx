import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import ForgotPassword from '../Pages/ForgotPassword'
import Sidebar from './Sidebar'
import Player from './MusicPlayer'
import LoginPage from '../Pages/LoginPage'
import RegistraionPage from '../Pages/RegistraionPage'
import UserDetails from './UserDetails'
import AlbumItem from './AlbumItem'
import Navbar from './Navbar'
import ResetPassword from '../Pages/ResetPassword'
import Auth from './Auth'

const Display = () => {
    const [user, setUser] = useState();
    // const [from, setFrom] = useState("Login");

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) {
            setUser(u);
        }
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <Navbar />
                    <div className='d-flex vh-100 bg-dark'>
                        <div className='d-flex flex-grow-1'>
                            <Sidebar />
                            <div className='flex-grow-1'>
                                <div
                                    className='w-100 h-100 m-2 p-3 bg-dark text-light overflow-auto rounded'
                                >
                                    <Routes>
                                        <Route path='/' element={<DisplayHome />} />
                                        <Route path='/user-details/getPlaylist/:id' element={<AlbumItem />} />
                                        <Route path="/user-details" element={<UserDetails />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                        <Player />
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    {/* {from === "Login" ? (
                        <LoginPage setFrom={setFrom} setUser={setUser} />
                    ) : from === "Forgot" ? (
                        <ForgotPassword setFrom={setFrom} />
                    ) : (
                        <RegistraionPage setFrom={setFrom} />
                    )} */}
                    <Routes>
                        <Route path='/' element={<Auth setUser={setUser} />} />
                        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                    </Routes>
                </div>
            )}
        </div>
    )
}

export default Display;
