import React from "react";
import backgroundImage from "../../assets/login.jpg";
import { Container } from "./BackgroundImage.styles";
function Background() {
  return (
    <Container>
      <img src={backgroundImage} />
    </Container>
  );
}

export default Background;
