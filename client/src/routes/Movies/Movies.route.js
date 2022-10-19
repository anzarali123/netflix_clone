import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import { Container } from "./movies.styles";
import { useContext, useState } from "react";
import { MoviesContext } from "../../Contexts/context";
import Slider from "../../components/Slider/Slider.component";
import NotAvailable from "../../components/Not Available/Notavailable.component";
import SelectGenre from "../../components/Select Genre/select-genre.component";

function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { moviesByGenre } = useContext(MoviesContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre />
        {moviesByGenre.length ? (
          <Slider movies={moviesByGenre} />
        ) : (
          <NotAvailable data="Movie" />
        )}
      </div>
    </Container>
  );
}

export default Movies;
