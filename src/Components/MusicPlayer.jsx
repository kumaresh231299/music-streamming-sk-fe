import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { MusicState } from "../Context/MusicContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MusicPlayer() {

    const { songs, trackIndex, setTrackIndex } = MusicState();

    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? songs?.length - 1 : currentTrack - 1
        );
    };

    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < songs?.length - 1 ? currentTrack + 1 : 0
        );
    };

    return (
        <div className="fixed-bottom bg-dark"> 
            <div className="container-fluid"> 
                <div className="row justify-content-center"> 
                    <div className="col-lg-12 col-md-12 col-sm-12"> 
                        <div className="card bg-black text-white">
                            <div className="card-header ">
                                Now Playing: {songs[trackIndex]?.name}
                            </div>
                            <div className="card-body ">
                                <AudioPlayer
                                    style={{ backgroundColor: '#121212', color: "white" }}
                                    autoPlay
                                    src={songs[trackIndex]?.songUrl}
                                    onPlay={(e) => console.log("onPlay")}
                                    showSkipControls={true}
                                    showJumpControls={false}
                                    onClickPrevious={handleClickPrevious}
                                    onClickNext={handleClickNext}
                                    onEnded={handleClickNext}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
