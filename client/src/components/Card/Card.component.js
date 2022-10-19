import React, { useEffect, useState, useContext } from "react";
import { Container } from "./Card.styles";
import { useNavigate } from "react-router-dom";
import video from "../../assets/Stranger_Things.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";

function Card({ movieData, isLiked = false, removeFromList }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChangedListener((currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/signin");
    });
  }, []);

  const addToList = async () => {
    const data = movieData;
    try {
      await fetch("http://localhost:5000/api/user/add", {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          data,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() => {
                      removeFromList(movieData.id);
                    }}
                  />
                ) : (
                  <AiOutlinePlus title="Add To List" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Card;
