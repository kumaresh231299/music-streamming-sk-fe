import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import Sidebar from './Sidebar';
import Player from './MusicPlayer';
import UserDetails from './UserDetails';
import AlbumItem from './AlbumItem';
import Navbar from './Navbar';
import ResetPassword from '../Pages/ResetPassword';
import Auth from './Auth';

const Display = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) {
            setUser(u);
        }
    }, []);

    return (
        <div className="container-fluid p-0">
            {user ? (
                <div>
                    <Navbar />
                    <div className="row g-0 vh-100 bg-dark">
                        {/* Sidebar */}
                        <div className="col-12 col-md-2 col-lg-3 bg-dark p-0">
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0">
                            <div className="flex-grow-1 bg-dark text-light overflow-auto rounded p-3">
                                <Routes>
                                    <Route path="/" element={<DisplayHome />} />
                                    <Route path="/user-details/getPlaylist/:id" element={<AlbumItem />} />
                                    <Route path="/user-details" element={<UserDetails />} />
                                </Routes>
                            </div>
                        </div>

                        {/* Music Player */}
                        <div className="col-12 p-0">
                            <Player />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100 bg-primary shadow shadow-lg">
                    <Routes>
                        <Route path="/" element={<Auth setUser={setUser} />} />
                        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default Display;
