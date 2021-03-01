import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SpriteSheet from "../../Assets/spritesheet.png";
import Logo from "../../Assets/logo.png";
import LoginFooter from "./LoginFooter";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const ForgotPassword = (props) => {
  const [inputData, setInputData] = useState({
    username: "",
  });
  const [disabled, setDisabled] = useState(true);

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    inputData.username.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <ForgotPasswordMainWrap>
        <TopBar>
          <div>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
        </TopBar>
        <ForgotPasswordMainContainer>
          <h1></h1>
          <h5>Trouble Logging In?</h5>
          <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
          <form>
            <input
              name="username"
              placeholder="Email, Phone or Username"
              required
              value={inputData.username}
              onChange={(event) => inputDataHandler(event)}
            />
            <Button disabled={disabled}>Send Login Link</Button>
          </form>
          <MiddleContainer>
            <small>OR</small>
          </MiddleContainer>
          <BottomContainer>
            <Link to="/register">Create New Account</Link>
          </BottomContainer>
          <Link to="/login">Back To Login</Link>
        </ForgotPasswordMainContainer>
        <LoginFooter />
      </ForgotPasswordMainWrap>
    </>
  );
};

const TopBar = styled.div`
  height: 54px;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid ${theme.main.grey};
  margin-bottom: 30px;

  > div {
    height: 54px;
    padding: 0 40px;
    display: flex;
    align-items: center;
  }
  > div > a {
    margin-top: 7px;
  }
  > div > a > img {
    height: 29px;
    -o-object-fit: contain;
    object-fit: contain;
  }
`;

const ForgotPasswordMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const ForgotPasswordMainContainer = styled.div`
  background-color: white;
  border: 1px solid ${theme.main.grey};
  border-radius: 1px;
  text-align: center;
  width: 388px;
  margin: 0 auto;
  font-size: 14px;

  > h1 {
    background-image: url(${SpriteSheet});
    background-repeat: no-repeat;
    background-position: -130px 0;
    height: 96px;
    width: 96px;
    margin: 22px auto 12px;
  }

  > h5 {
    color: ${theme.a.dark};
  }

  > p {
    color: ${theme.a.light};
    width: 300px;
    margin: 0 auto;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    flex: 0 0 auto;
    padding: 0px 40px;
  }

  > form > input {
    width: 300px;
    padding: 6px;
    margin: 0px 0px 16px;
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

  > a {
    color: ${theme.a.dark};
    display: block;
    font-weight: 500;
    border-top: 1px solid ${theme.main.grey};
    padding: 10px;
    background-color: #fafafa;
  }
`;

const MiddleContainer = styled.div`
  margin-top: 16px;
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
  margin: 10px 0px 70px;

  > a {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.a.dark};
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
