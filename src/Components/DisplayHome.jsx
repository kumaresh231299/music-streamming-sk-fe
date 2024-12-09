import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import SongItem from "./SongItem";
import { MusicState } from "../Context/MusicContext.jsx";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import { PiPlaylistDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; 
// import "swiper/swiper.min.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import  SwiperCore from "swiper"
import { Navigation, Pagination } from "swiper/modules";

//Install Swiper modules
SwiperCore.use([Pagination,Navigation])

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
        <div className="flex-fill container ">

            <div className="mb-4 ">
                <h3 className="">Your Playlists</h3>

                {/* Mapping over playlists to display each song in the playlist */}
                <div className="row gap-3 container">
                    {playlist && playlist.length > 0 ? (
                        playlist.map((playlistItem, playlistIndex) => (
                            <div
                                key={playlistIndex}
                                className="card playlist-card align-items-center pt-2 bg-dark"
                                style={{ width: "10rem" }}>
                                <div
                                    className="d-flex justify-content-center align-items-center bg-black rounded-circle"
                                    style={{ width: '60px', height: '60px' }} 
                                >
                                    <PiPlaylistDuotone size={40} color="white" />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h6 className="card-title text-white mb-3" style={{
                                        maxWidth: "6rem",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>{playlistItem?.playlistName}</h6>
                                    <button
                                        onClick={() => navigate(`/user-details/getPlaylist/${playlistItem._id}`)}
                                        className="btn bg-white " style={{
                                            maxWidth: "8rem",
                                            whiteSpace: "nowrap"
                                        }}>  View Playlist
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
            <div className="song-card">
                <h3 className="">Trending Songs</h3>
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            centeredSlides: true,
                        },
                        480: {
                            slidesPerView: 2,
                            centeredSlides: true,
                        },
                        768: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    
                    // navigation
                    pagination={{ clickable: true }}     This is for below dotted of carousel
                    className="mb-5 custom-swiper-pagination"
                >
                    {/* <div className="row gap-3 mb-5 container"> */}
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => (
                            <SwiperSlide key={index}>
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
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center text-lg font-semibold">
                            No songs available.
                        </p>
                    )}
                    {/* </div> */}
                </Swiper>
            </div>
            <CreatePlaylistModal />
        </div>
    );
};

export default DisplayHome;
