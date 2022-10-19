import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Container } from "./Header.styles";

function Header(props) {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(props.login ? "/signin" : "/signup");
  };
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} />
      </div>
      <button onClick={navigateHandler}>
        {props.login ? "Log In" : "Sign UP"}
      </button>
    </Container>
  );
}

export default Header;
