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

  return (
    <div
      onClick={() => setTrackIndex(index)}
      className="card bg-secondary"
      style={{ width: "10rem" }}> 
      
      <img src={img} class="card-img-top" alt="songImg" className="p-1" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p class="card-text">{desc.length > 50 ? `${desc.slice(0, 80)}...` : desc}</p>

      </div>
    </div>
  );
};

export default SongItem;
