import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import styled from "styled-components";
import SpriteSheet from "../../Assets/spritesheet.png";
import GetAppContainer from "./GetAppContainer";
import LoginFooter from "./LoginFooter";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Register = (props) => {
  const [inputData, setInputData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    inputData.email.length !== 0 &&
    inputData.name.length !== 0 &&
    inputData.username.length !== 0 &&
    inputData.password.length !== 0
      ? setDisabled(false)
      : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <RegisterMainWrap>
        <RegisterMainContainer>
          <h1></h1> {/* Logo */}
          <h5>Sign up to see photos and videos from your friends.</h5>
          <FacebookLogInContainer>
            <Button>
              <FacebookIcon />
              Log in with Facebook
            </Button>
          </FacebookLogInContainer>
          <MiddleContainer>
            <small>OR</small>
          </MiddleContainer>
          <form>
            <input
              name="email"
              placeholder="Mobile Number or Email"
              required
              value={inputData.email}
              onChange={(event) => inputDataHandler(event)}
            />
            <input
              name="name"
              placeholder="Full Name"
              required
              value={inputData.name}
              onChange={(event) => inputDataHandler(event)}
            />
            <input
              name="username"
              placeholder="Username"
              required
              value={inputData.username}
              onChange={(event) => inputDataHandler(event)}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
              value={inputData.password}
              onChange={(event) => inputDataHandler(event)}
            />
            <Button disabled={disabled}>Next</Button>
            <p>
              By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Data Policy
              and how we use cookies and similar technology in our Cookies Policy .
            </p>
          </form>
        </RegisterMainContainer>
        <LoginRegisterContainer>
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </LoginRegisterContainer>
        <GetAppContainer />
      </RegisterMainWrap>
      <LoginFooter />
    </>
  );
};

const RegisterMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 88vh;
`;

const RegisterMainContainer = styled.div`
  background-color: white;
  border: 1px solid ${theme.main.grey};
  border-radius: 1px;
  padding: 10px 0 20px;
  margin: 0 0 10px;
  text-align: center;

  > h1 {
    background-image: url(${SpriteSheet});
    background-repeat: no-repeat;
    background-position: 0 -130px;
    height: 51px;
    width: 175px;
    margin: 22px auto 12px;
  }
  > h5 {
    width: 268px;
    margin: 0 auto;
    font-size: 17px;
    color: ${theme.a.light};
  }
  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    flex: 0 0 auto;
    padding: 0px 40px;
    font-size: 14px;
  }

  > form > input {
    width: 268px;
    padding: 6px;
    margin: 0px 0px 10px;
    border: 1px solid ${theme.main.grey};
    border-radius: 3px;
    background-color: rgba(218, 218, 218, 0.1);
  }

  > form > input::placeholder {
    color: rgba(38, 38, 38, 0.5);
    font-size: 0.75rem;
  }

  > form > input:focus {
    outline: none;
  }

  > form > button {
    width: 268px;
    height: 30px;
    font-weight: 500;
    font-size: 0.9rem;
    background-color: ${theme.main.lightblue};
    padding: 4px;
    border: none;
    margin-top: 6px;
    transition: opacity 0.25s ease;
  }
  > form > button:disabled {
    opacity: 0.3;
  }
  > form > p {
    width: 268px;
    font-size: 12px;
    color: ${theme.a.light};
    margin: 16px 0;
  }
`;

const MiddleContainer = styled.div`
  position: relative;

  > small {
    color: rgba(38, 38, 38, 0.5);
    font-weight: 500;
  }

  > small::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 12%;
    right: 58%;
    height: 1px;
    background-color: ${theme.main.grey};
  }

  > small::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 12%;
    left: 58%;
    height: 1px;
    background-color: ${theme.main.grey};
  }
`;

const FacebookLogInContainer = styled.div`
  margin: 20px 0px 16px;

  > button {
    background-color: ${theme.main.lightblue};
    border: none;
    color: white;
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 268px;
    padding: 4px;
  }

  > button:hover {
    background-color: ${theme.main.lightblue};
  }

  > button svg {
    margin-right: 0.25rem;
  }

  > a {
    font-size: 0.75rem;
    color: ${theme.a.primary};
  }
`;

const LoginRegisterContainer = styled.div`
  background-color: white;
  border: 1px solid ${theme.main.grey};
  border-radius: 1px;
  width: 350px;
  padding: 20px 0;
  text-align: center;
  > p {
    margin: 0;
    font-size: 14px;
  }
  > p > a {
    color: ${theme.main.lightblue};
    font-weight: 500;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
