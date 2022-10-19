import { Routes, Route } from "react-router-dom";
import Netflix from "./routes/Homepage/Netflix.route";
import Movies from "./routes/Movies/Movies.route";
import MyList from "./routes/My List/myList.route";
import Player from "./routes/Player/Player.route";
import SignIn from "./routes/Signin/sign-in.route";
import Signup from "./routes/Signup/sign-up.route";
import TvShows from "./routes/TV Shows/tv-shows.route";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Netflix />} />
      <Route exact path="signin" element={<SignIn />} />
      <Route exact path="player" element={<Player />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tv" element={<TvShows />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/mylist" element={<MyList />} />
    </Routes>
  );
}

export default App;
