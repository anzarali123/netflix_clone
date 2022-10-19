import React from "react";
import CardSlider from "../Card Slider/Card-slider.component";

function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="Popular On Netflix"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        title="Award Winning Movies"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider title="Most Liked Shows" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Feel Good Movies" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}

export default Slider;
