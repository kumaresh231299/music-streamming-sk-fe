import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import SongItem from "./SongItem";
import { MusicState } from "../Context/MusicContext.jsx";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import { PiPlaylistDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";

const DisplayHome = () => {
    const { songs, setSongs, songReferesh } = MusicState();
    const { playlist, setPlaylist } = MusicState();

    const userID = localStorage.getItem("userId");
    // console.log("userId",userID);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/audio/upload-audio"
                );
                setSongs(response.data.result);

                const getPlatlist = await axios.get(
                    `http://localhost:4000/api/update/user-details/getPlaylist/${userID}`
                );
                setPlaylist(getPlatlist?.data?.playlist || []); // Set to an empty array if undefined
                console.log("getPlatlist:   ", getPlatlist);
                // setPlaylist(getPlatlist);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, [setSongs, setPlaylist, userID, songReferesh]);

    return (
        <div className="flex-fill container">

            <div className="mb-4 ">
                <h3 className="">Your Playlists</h3>

                {/* Mapping over playlists to display each song in the playlist */}
                <div className="row gap-3 container">
                    {playlist && playlist.length > 0 ? (
                        playlist.map((playlistItem, playlistIndex) => (
                            <div
                                key={playlistIndex}
                                className="card align-items-center pt-2 bg-secondary"
                                style={{ width: "10rem" }}>
                                <div
                                    className="d-flex justify-content-center align-items-center bg-black rounded-circle"
                                    style={{ width: '60px', height: '60px' }} // Adjust width & height as needed
                                >
                                    <PiPlaylistDuotone size={40} color="white" />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h6 className="card-title text-white mb-3">{playlistItem?.playlistName}</h6>
                                    <button
                                        onClick={() => navigate(`/user-details/getPlaylist/${playlistItem._id}`)}
                                        className="btn bg-white ">  View Playlist
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="flex items-center justify-center font-semibold col-span-full">
                            No playlists available.
                        </p>
                    )}
                </div>
            </div>

            {/* Mapping to display all song */}
            <div className="">
                <h3 className="">Trending Songs</h3>
                <div className="row gap-3 mb-5 container">
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => (
                            <SongItem
                                key={index}
                                index={index}
                                id={song._id}
                                name={song.name}
                                desc={song.desc}
                                img={song.img}
                                url={song.songUrl}
                                category={song.category}
                            />
                        ))
                    ) : (
                        <p className="text-center text-lg font-semibold">
                            No songs available.
                        </p>
                    )}
                </div>
            </div>
            <CreatePlaylistModal />
        </div>
    );
};

export default DisplayHome;
