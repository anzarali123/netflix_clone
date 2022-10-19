import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "./myList.styles";
import Navbar from "../../components/Navbar/Navbar.component";
import { useNavigate } from "react-router-dom";
import { onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";
import { MoviesContext } from "../../Contexts/context";
import Card from "../../components/Card/Card.component";

const MyList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [userLikedMovies, setUserLikedMovies] = useState([]);
  const navigate = useNavigate();
  const { getUserLikedMovies, removeFromLikedMovies } =
    useContext(MoviesContext);

  useEffect(() => {
    onAuthStateChangedListener((currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
  }, []);

  const removeFromList = useCallback(
    async (movieId) => {
      if (email) {
        const { msg, movies } = await removeFromLikedMovies(email, movieId);
        if (msg === "Movie successfully removed.") {
          setUserLikedMovies(movies);
        }
      }
    },
    [email]
  );

  useEffect(() => {
    if (email) {
      const fetchMovies = async () => {
        const { msg, movies } = await getUserLikedMovies(email);
        if (msg === "success") {
          setUserLikedMovies(movies);
        }
      };
      fetchMovies();
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {userLikedMovies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                removeFromList={removeFromList}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default MyList;
