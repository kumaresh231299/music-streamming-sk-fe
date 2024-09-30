import React from "react";
import { MdMenu } from "react-icons/md";
import { Button } from "react-bootstrap";
import { SiSongkick } from "react-icons/si";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MusicState } from "../Context/MusicContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { setShowModal, isOpen, setIsOpen } = MusicState();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-dark py-2 px-2">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Button className="d-md-none btn btn-dark mx-2" onClick={toggleSidebar}>
                        {isOpen ? <IoMdCloseCircle /> : <MdMenu />}
                    </Button>
                    <SiSongkick size={40} color="#fff" />
                </div>
                <button
                    className="bg-white text-black text-[15px] px-4 py-1 rounded-3"
                    onClick={() => navigate('/user-details')}
                >
                    User
                </button>
            </div>
        </div>
    );
};

export default Navbar;
