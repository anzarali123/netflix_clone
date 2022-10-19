import { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import Background from "../../components/BackgroundImage/BackgroundImage.component";

import Header from "../../components/Header/Header.component";
import { Container } from "./sign-in.styles";
import { useNavigate } from "react-router-dom";

const defaultFormValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = async () => {
    const { email, password } = formValues;
    const response = await signInUserWithEmailAndPassword(email, password);
    // if (response) {
    onAuthStateChangedListener((currentUser) => {
      if (currentUser) navigate("/");
    });
    // }
  };

  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formValues.email}
                onChange={onChangeHandler}
                required
              />

              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formValues.password}
                onChange={onChangeHandler}
                required
              />

              <button onClick={handleSignIn}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
