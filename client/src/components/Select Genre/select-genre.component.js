import React from "react";
import { Select } from "./select-genre.styles";
import { useContext } from "react";
import { MoviesContext } from "../../Contexts/context";

function SelectGenre() {
  const { genres, setGenre } = useContext(MoviesContext);

  const handleChangeGenre = (event) => {
    const { value } = event.target;
    setGenre(value);
  };
  return (
    <Select className="flex" onChange={handleChangeGenre}>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

export default SelectGenre;
