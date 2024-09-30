import React, { useState } from "react";
import { FaArrowRight, FaList, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { LiaHomeSolid } from "react-icons/lia";
import { MdLibraryMusic } from "react-icons/md";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import { Button } from "react-bootstrap";
import { MusicState } from "../Context/MusicContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { setShowModal, isOpen, setIsOpen } = MusicState();
    const navigate = useNavigate();
    // Retrieve user from localStorage
    const userDetails = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {/* Sidebar for large and medium screens */}
            <div className="d-none d-md-flex bg-dark text-white p-2 sidebar-lg">
                <div className="py-3 rounded">
                    <div className="d-flex flex-column" style={{cursor:"pointer"}}>
                        <div 
                        className="d-flex align-items-center gap-3 px-3 cursor-pointer bg-secondary" 
                        onClick={() => navigate("/")}>
                            <LiaHomeSolid size={20} />
                            <p className="fw-bold mt-3">Home</p>
                        </div>
                    </div>

                    <div className="bg-secondary text-white p-4 rounded mb-3 mt-4">
                        <h5>Create your first Playlist</h5>
                        {/* <p className="text-muted">It's easy, we'll help you</p> */}

                        <div className="d-flex justify-content-between">
                            <div className="px-1">
                            <Button className="btn btn-light text-dark" onClick={() => setShowModal(true)}>
                                Create Playlist
                            </Button>
                            </div>
                            <div className="px-1">
                            <Button
                                className="btn btn-light text-dark"
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                            >
                                Log Out
                            </Button>
                            </div>
                            
                        </div>
                    </div>

                    {/* Music Icon */}
                    <div className="d-flex justify-content-center mb-3 bg-secondary p-2">
                        <MdLibraryMusic size={68} />
                    </div>
                     {/*  App Name */}
                    <div className="bg-secondary p-3 d-flex justify-content-between align-items-center rounded">
                        <p className="fs-5">SK Music Streaming</p>
                        <PiMicrophoneStageDuotone size={40} />
                    </div>
                </div>
            </div>

            {/* Toggle Button for Small Screens */}
            {isOpen && (
                <div className="d-lg-none bg-dark text-white p-2 small-screen-sidebar">
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-center gap-3 px-3 cursor-pointer" onClick={() => navigate("/")}>
                            <LiaHomeSolid size={20} />
                            <p className="fw-bold mt-3">Home</p>
                        </div>
                        <div className="d-flex align-items-center gap-3 px-3 cursor-pointer">
                            <Button className="btn btn-light text-dark" onClick={() => setShowModal(true)}>
                                Create Playlist
                            </Button>
                        </div>
                        <div className="d-flex align-items-center gap-3 px-3 cursor-pointer" onClick={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                        }}>
                            <Button
                                className="btn btn-light text-dark"
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                            >
                                Log Out
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
