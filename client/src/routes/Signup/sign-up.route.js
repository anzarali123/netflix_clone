import { useState } from "react";
import {
  createUserAuthWithEmailAndPassword,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import Background from "../../components/BackgroundImage/BackgroundImage.component";

import Header from "../../components/Header/Header.component";
import { Container } from "./sign-up.styles";
import { useNavigate } from "react-router-dom";

const defaultFormValues = {
  email: "",
  password: "",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async () => {
    const { email, password } = formValues;
    const response = await createUserAuthWithEmailAndPassword(email, password);
    // if (response) {
    onAuthStateChangedListener((currentUser) => {
      if (currentUser) navigate("/");
    });
    // }
  };

  return (
    <Container showPassword={showPassword}>
      <Background />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch Anywhere. Cancel Anytime</h4>
            <h6>Ready to watch? Enter your email to start your membership</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formValues.email}
              onChange={onChangeHandler}
              required
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formValues.password}
                onChange={onChangeHandler}
                required
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
