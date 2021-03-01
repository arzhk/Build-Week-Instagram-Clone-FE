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

const Login = (props) => {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    inputData.username.length !== 0 && inputData.password.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <LoginMainWrap>
        <LoginMainContainer>
          <h1></h1>
          <form>
            <input
              name="username"
              placeholder="Phone number, username or email"
              required
              value={inputData.username}
              onChange={(event) => inputDataHandler(event)}
            />
            <input
              name="password"
              placeholder="Password"
              required
              value={inputData.password}
              onChange={(event) => inputDataHandler(event)}
            />
            <Button disabled={disabled}>Log In</Button>
          </form>
          <MiddleContainer>
            <small>OR</small>
          </MiddleContainer>

          <BottomContainer>
            <Button>
              <FacebookIcon />
              Log in with Facebook
            </Button>
            <Link to="/forgotpassword">Forgot password?</Link>
          </BottomContainer>
        </LoginMainContainer>
        <LoginRegisterContainer>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </LoginRegisterContainer>
        <GetAppContainer />
      </LoginMainWrap>
      <LoginFooter />
    </>
  );
};

const LoginMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 88vh;
`;

const LoginMainContainer = styled.div`
  background-color: white;
  border: 1px solid ${theme.main.grey};
  border-radius: 1px;
  padding: 10px 0;
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

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    flex: 0 0 auto;
    padding: 0px 40px;
  }

  > form > input {
    width: 268px;
    padding: 6px;
    margin: 0px 0px 10px;
    border: 1px solid ${theme.main.grey};
    border-radius: 3px;
    background-color: rgba(218, 218, 218, 0.1);
    font-size: 14px;
  }

  > form > input::placeholder {
    color: rgba(38, 38, 38, 0.5);
    font-size: 0.75rem;
  }

  > form > input:focus {
    outline: none;
  }

  > form > button {
    width: 100%;
    height: 30px;
    font-weight: 500;
    font-size: 0.9rem;
    background-color: ${theme.main.lightblue};
    padding: 4px;
    border: none;
    transition: opacity 0.25s ease;
  }
  > form > button:disabled {
    opacity: 0.3;
  }
`;

const MiddleContainer = styled.div`
  margin-top: 10px;
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

const BottomContainer = styled.div`
  margin: 20px 0px;
  > button {
    background-color: transparent;
    border: none;
    color: ${theme.main.facebook};
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  > button:hover {
    background-color: transparent;
    color: ${theme.main.facebook};
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
