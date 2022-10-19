import React from "react";
import { Container } from "./tv-shows.styles";
import Navbar from "../../components/Navbar/Navbar.component";
import SelectGenre from "../../components/Select Genre/select-genre.component";
import NotAvailable from "../../components/Not Available/Notavailable.component";
import Slider from "../../components/Slider/Slider.component";
import { useState, useContext } from "react";
import { MoviesContext } from "../../Contexts/context";
function TvShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { tvShows } = useContext(MoviesContext);

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
        {tvShows.length ? (
          <Slider movies={tvShows} />
        ) : (
          <NotAvailable data="TV Shows" />
        )}
      </div>
    </Container>
  );
}

export default TvShows;
