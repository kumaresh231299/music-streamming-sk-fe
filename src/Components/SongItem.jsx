import React, { useState } from "react";
import { GiLoveSong } from "react-icons/gi";
import { FaAngleUp, FaEllipsisH } from "react-icons/fa";
import { MusicState } from "../Context/MusicContext";

const SongItem = ({ index, name, img, desc, id, url, category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setTrackIndex } = MusicState();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Truncate name if it's longer than 20 characters
  const truncatedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;

  return (
    <div
      onClick={() => setTrackIndex(index)}
      className="card custom-song-card text-white "
      style={{ width: "10rem", margin: "1rem", backgroundColor:"#2c3e50" }}> 
      
      <img src={img} className="card-img-top" alt="songImg" />
      <div className="card-body">
        <h6 className="card-title song-title">{truncatedName}</h6>
        <p className="card-text song-desc">{desc?.length > 15 ? `${desc.slice(0, 16)}...` : desc}</p>

      </div>
    </div>
  );
};

export default SongItem;
