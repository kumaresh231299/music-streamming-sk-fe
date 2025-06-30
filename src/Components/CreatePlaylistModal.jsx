import React, { useState } from "react";
import axios from "axios";
import { MusicState } from "../Context/MusicContext";

const CreatePlaylistModal = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);

    const { songs, showModal, setShowModal, songReferesh, setSongReferesh } = MusicState();
    const userID = localStorage.getItem("userId");

    const handlesongSelect = (song) => {
        setSelectedSongs((prev) =>
            prev.includes(song)
                ? prev.filter((s) => s !== song)
                : [...prev, song]
        );
    };

    const handleCreatePlaylist = async () => {
        if (!playlistName || selectedSongs.length === 0) {
            alert("Please enter a playlist name and select at least one song.");
            return;
        }

        try {
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

            const response = await axios.post(
                `https://music-streamming-sk-app-be.onrender.com/api/update/user-details/createPlaylist/${userID}`,
                { newPlaylist }
            );

            alert("Playlist created successfully");
            setShowModal(false);
            setSongReferesh(!songReferesh);
        } catch (error) {
            console.log("Error creating playlist: ", error.response ? error.response.data : error.message);
            alert("Failed to create playlist, " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow rounded">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Create New Playlist</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Playlist Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter playlist name"
                                        value={playlistName}
                                        onChange={(e) => setPlaylistName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="form-label fw-bold text-muted">Select Songs</label>
                                    <div className="list-group overflow-auto" style={{ maxHeight: "200px" }}>
                                        {songs.map((song, index) => (
                                            <label
                                                key={index}
                                                className="list-group-item d-flex align-items-center"
                                            >
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    checked={selectedSongs.includes(song)}
                                                    onChange={() => handlesongSelect(song)}
                                                />
                                                <div>
                                                    <div className="fw-semibold">{song.name}</div>
                                                    <small className="text-muted">{song.category}</small>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCreatePlaylist}>
                                    Create Playlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePlaylistModal;


// import React, { useState } from "react";
// import axios from "axios";
// import { MusicState } from "../Context/MusicContext";

// const CreatePlaylistModal = () => {
//     const [playlistName, setPlaylistName] = useState("");
//     const [selectedSongs, setSelectedSongs] = useState([]);

//     const { songs, showModal, setShowModal, songReferesh, setSongReferesh } = MusicState();
//     const userID = localStorage.getItem("userId");

//     const handlesongSelect = (song) => {
//         setSelectedSongs((prev) =>
//             prev.includes(song)
//                 ? prev.filter((s) => s !== song)
//                 : [...prev, song]
//         );
//     };

//     const handleCreatePlaylist = async () => {
//         if (!playlistName || selectedSongs.length === 0) {
//             alert("Please enter a playlist name and select at least one song.");
//             return;
//         }

//         try {
//             const newPlaylist = {
//                 playlistName,
//                 playlist: selectedSongs.map(song => ({
//                     name: song.name,
//                     desc: song.desc,
//                     img: song.img,
//                     songUrl: song.songUrl,
//                     category: song.category,
//                 })),
//             };

//             await axios.post(
//                 `https://music-streamming-sk-app-be.onrender.com/api/update/user-details/createPlaylist/${userID}`,
//                 { newPlaylist }
//             );

//             alert("Playlist created successfully");
//             setShowModal(false);
//             setSongReferesh(!songReferesh);
//         } catch (error) {
//             console.log("Error creating playlist: ", error.response ? error.response.data : error.message);
//             alert("Failed to create playlist, " + (error.response ? error.response.data.message : error.message));
//         }
//     };

//     return (
//         <>
//             {showModal && (
//                 <div
//                     className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-black"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
//                 >
//                     <div className="bg-white rounded shadow p-4" style={{ width: "100%", maxWidth: "600px" }}>
//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                             <h5 className="mb-0 fw-bold text-black">Create New Playlist</h5>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 aria-label="Close"
//                                 onClick={() => setShowModal(false)}
//                             ></button>
//                         </div>

//                         <div className="mb-4">
//                             <label className="form-label fw-semibold">Playlist Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter playlist name"
//                                 value={playlistName}
//                                 onChange={(e) => setPlaylistName(e.target.value)}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label fw-semibold">Select Songs</label>
//                             <div className="border rounded overflow-auto" style={{ maxHeight: "250px" }}>
//                                 {songs.map((song, index) => (
//                                     <div
//                                         key={index}
//                                         className="form-check px-3 py-2 border-bottom d-flex align-items-center"
//                                     >
//                                         <input
//                                             className="form-check-input me-2"
//                                             type="checkbox"
//                                             checked={selectedSongs.includes(song)}
//                                             onChange={() => handlesongSelect(song)}
//                                             id={`song-${index}`}
//                                         />
//                                         <label className="form-check-label w-100" htmlFor={`song-${index}`}>
//                                             <div className="fw-semibold">{song.name}</div>
//                                             <small className="text-muted">{song.category}</small>
//                                         </label>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="d-flex justify-content-end gap-2">
//                             <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                                 Cancel
//                             </button>
//                             <button className="btn btn-primary" onClick={handleCreatePlaylist}>
//                                 Create Playlist
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default CreatePlaylistModal;
