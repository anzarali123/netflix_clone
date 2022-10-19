import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import video from "../../assets/Stranger_Things.mp4";
import { Container } from "./Player.styles";
import { useNavigate } from "react-router-dom";

function Player() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={handleNavigate} />
        </div>
        <video src={video} autoPlay loop controls></video>
      </div>
    </Container>
  );
}

export default Player;
