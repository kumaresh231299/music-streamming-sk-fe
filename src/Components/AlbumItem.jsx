import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MusicState } from "../Context/MusicContext";
import { GrPrevious } from "react-icons/gr";

const AlbumItem = () => {
  const { id } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { songs, setSongs, setTrackIndex } = MusicState();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `https://music-streamming-sk-app-be.onrender.com/api/update/playlist/${id}`
        );
        setPlaylistDetails(response?.data?.playlist);
        setSongs(response?.data?.playlist?.playlist);
      } catch (error) {
        console.error("Error fetching playlist details: ", error);
      }
    };
    fetchPlaylistDetails();
  }, [id]);

  const handleBack = () => {
    if (location.pathname !== "/") {
      navigate(-1);
    }
  };

  return (
    <div className="container py-4">
      {/* Back Button */}
      <div className="mb-3">
        <button onClick={handleBack} className="btn btn-secondary rounded" aria-label="Go Back">
          <GrPrevious /> Back
        </button>
      </div>

      {/* Playlist Title */}
      {playlistDetails ? (
        <>
          <h2 className="mb-4 fw-bold">{playlistDetails.playlistName}</h2>

          {/* Songs Grid */}
          {playlistDetails.playlist && playlistDetails.playlist.length > 0 ? (
            <div className="row" style={{marginBottom:"110px"}}>
              {songs?.map((song, index) => (
                <div
                  key={song?._id}
                  className="col-md-3 col-sm-6 mb-4"
                  onClick={() => setTrackIndex(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card shadow-sm h-100 border-0 hover-shadow" style={{ backgroundColor: "#f8f9fa" }}>
                    <img
                      src={song?.img}
                      alt="song"
                      className="card-img-top"
                      style={{ height: "130px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title text-truncate">{song?.name}</h6>
                      <p className="card-text text-muted small">
                        {song?.desc?.length > 60
                          ? `${song?.desc.slice(0, 60)}...`
                          : song?.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No songs available in this playlist.</p>
          )}
        </>
      ) : (
        <p className="text-muted">Loading playlist details...</p>
      )}
    </div>
  );
};

export default AlbumItem;
