import React, { useEffect } from "react";
import axios from "axios";
import SongItem from "./SongItem";
import { MusicState } from "../Context/MusicContext.jsx";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import { PiPlaylistDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";


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
                    "https://music-streamming-sk-app-be.onrender.com/api/audio/upload-audio"
                    // "http://localhost:4000/api/audio/upload-audio"
                );
                setSongs(response.data.result);

                const getPlatlist = await axios.get(
                    `https://music-streamming-sk-app-be.onrender.com/api/update/user-details/getPlaylist/${userID}`
                );
                setPlaylist(getPlatlist?.data?.playlist || []); // Set to an empty array if undefined
                // console.log("getPlatlist:   ", getPlatlist);
                // setPlaylist(getPlatlist);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, [setSongs, setPlaylist, userID, songReferesh]);

    return (
        <div className="flex-fill container " style={{ marginBottom: "200px" }}>

            <div className="mb-2 container">
                <h3 className="mb-3">Your Playlists</h3>

                {/* Mapping over playlists */}
                <div className="row">
                    {playlist && playlist.length > 0 ? (
                        playlist.map((playlistItem, playlistIndex) => (
                            <div
                                key={playlistIndex}
                                className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
                            >
                                <div
                                    className="card playlist-card align-items-center pt-2"
                                    style={{ width: "100%", backgroundColor: "#2c3e50" }}
                                >
                                    <div
                                        className="d-flex justify-content-center align-items-center bg-black rounded-circle"
                                        style={{ width: "60px", height: "60px" }}
                                    >
                                        <PiPlaylistDuotone size={40} color="white" />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <h6
                                            className="card-title text-white mb-3 text-center"
                                            style={{
                                                maxWidth: "6rem",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {playlistItem?.playlistName}
                                        </h6>
                                        <button
                                            onClick={() =>
                                                navigate(`/user-details/getPlaylist/${playlistItem._id}`)
                                            }
                                            className="btn bg-white btn-sm"
                                            style={{ maxWidth: "8rem", whiteSpace: "nowrap" }}
                                        >
                                            View Playlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center fw-semibold mt-3">No playlists available.</p>
                    )}
                </div>
            </div>


            <h3 className="mb-3">Trending Songs</h3>
            <Marquee pauseOnHover={true} speed={40} gradient={false}>
                {songs && songs.length > 0 ? (
                    songs.map((song, index) => (
                        <div key={index} style={{ marginRight: "1rem", width: "200px" }}>
                            <SongItem
                                index={index}
                                id={song._id}
                                name={song.name}
                                desc={song.desc}
                                img={song.img}
                                url={song.songUrl}
                                category={song.category}
                            />
                        </div>
                    ))
                ) : (
                    <p>No songs available.</p>
                )}
            </Marquee>
            <CreatePlaylistModal />
        </div>
    );
};

export default DisplayHome;
