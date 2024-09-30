import React, { createContext, useContext, useState } from "react";

//Create a context
const MyContext = createContext();

//Create a provider component
const MusicProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [trackIndex, setTrackIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [songReferesh, setSongReferesh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [playlist, setPlaylist] = useState([]);

    return (
        <MyContext.Provider
            value={{
                songs,
                setSongs,
                trackIndex,
                setTrackIndex,
                showModal,
                setShowModal,
                playlist,
                setPlaylist,
                songReferesh,
                setSongReferesh,
                isOpen,
                setIsOpen
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export const MusicState = () => {
    return useContext(MyContext);
};

export default MusicProvider;