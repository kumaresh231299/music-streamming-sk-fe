import React, { useState } from "react";
import { MusicState } from "../Context/MusicContext";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreatePlaylistModal = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);

    // Get songs and user from context
    const { songs, showModal, setShowModal, songReferesh, setSongReferesh } = MusicState();

    const userID = localStorage.getItem('userId');
    //console.log(userID);

    //Handles song selection
    const handlesongSelect = (song) => {
        setSelectedSongs((prev) =>
            prev.includes(song)
                ? prev.filter((s) => s !== song) // Deselect if already select
                : [...prev, song]
        );
    };
    // Handles creating a new playlist
    const handleCreatePlaylist = async () => {
        if (!playlistName || selectedSongs.length === 0) {
            alert("Please enter a playlist name and select at least one song.");
            return;
        }

        try {
            //create new playlist Object
            const newPlaylist = {
                playlistName,
                playlist: selectedSongs.map(song => ({
                    name: song.name,
                    desc: song.desc,
                    img: song.img,
                    songUrl: song.songUrl,
                    category: song.category,
                })),
            };

            // console.log("new playlist: ", newPlaylist)

            // Update user playlist
            const updatedUser = {
                newPlaylist
            };

            //Update user playlist using the backend API
            const response = await axios.post(
                `http://localhost:4000/api/update/user-details/createPlaylist/${userID}`,
                updatedUser
            );
            alert("Playlist created successfully");
            setShowModal(false);
            setSongReferesh(!songReferesh);
        } catch (error) {
            console.log("Error creating playlist : ", error.response ? error.response.data : error.messageor);
            alert("Failed to create playlist, " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Playlist Name"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <div className="mb-4">
                    <h3 className="text-lg font-medium mb-1">Select Songs</h3>
                    <ul className="">
                        {songs.map((song) => (
                            <li style={{
                                display: 'flex',
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: -20
                            }}>
                                <input type="checkbox" checked={selectedSongs.includes(song)} onChange={() => handlesongSelect(song)} />
                                <p className="mt-3 mx-2">{song.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreatePlaylist}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePlaylistModal;
