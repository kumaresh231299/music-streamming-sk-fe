import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleUp, FaEllipsisH } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MusicState } from "../Context/MusicContext";
import { GrPrevious } from "react-icons/gr";

const AlbumItem = () => {
  // { index, name, img, desc, id, url, category }
  const { id } = useParams(); //Playlist ID from the URL
  const [playlistDetails, setPlaylistDetails] = useState(null);

  // const navigate = useNavigate();
  // const location = useLocation();

  const { songs, setSongs, setTrackIndex } = MusicState();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/update/playlist/${id}`
        );
        setPlaylistDetails(response?.data?.playlist);
        setSongs(response?.data?.playlist?.playlist);
      } catch (error) {
        console.error("Error fetching playlist details :   ", error);
      }
    };
    fetchPlaylistDetails();
  }, [id]);

  console.log("playlistDetails:  ", playlistDetails)

  // Handle back navigation
  // const handleBack = () => {
  //   if (location.pathname !== "/") {
  //     navigate(-1);
  //   }
  // };

  return (
    <div className="container">
      {/* Back Button */}
      {/* <button
                onClick={handleBack}
                className="mb-1 btn btn-secondary rounded"
                aria-label="Go Back"
            >
                <GrPrevious />
            </button> */}
      {playlistDetails ? (
        <>
          <h2 className="mb-4">
            {playlistDetails.playlistName}
          </h2>
          {playlistDetails.playlist && playlistDetails?.playlist?.length > 0 ? (
            <div className="row">
              {songs?.map((song, index) => (
                <div
                  key={song?._id}
                  onClick={() => setTrackIndex(index)}
                  className="card mx-2"
                  style={{ width: "10rem", cursor: "pointer" }}>
                  <img
                    src={song?.img} class="card-img-top" alt="songImg" />
                  <div className="card-body">
                    <h5 className="card-title">{song?.name}</h5>
                    <p className="card-text">{song?.desc?.length > 50 ? `${song?.desc?.slice(0, 50)}...` : song?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No songs available in this playlist.</p>
          )}
        </>
      ) : (
        <p>Loading playlist details...</p>
      )}
    </div>
  );
};

export default AlbumItem;
