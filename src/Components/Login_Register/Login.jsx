import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Alert } from "react-bootstrap";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import styled from "styled-components";
import SpriteSheet from "../../Assets/spritesheet.png";
import GetAppContainer from "./GetAppContainer";
import LoginFooter from "./LoginFooter";
import Spinner from "../Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Login = (props) => {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.errors) {
        if (props.errors.show) {
          props.setError();
          props.showErrors(false);
        }
        setTimeout(() => {
          setLoading(false);
          props.setUser(data);
          props.history.push("/");
        }, 2000);
      } else {
        props.setError([{ ...data.errors[0] }]);
        props.showErrors(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
    if (event.keyCode === 13) {
      loginHandler();
    }
  };

  useEffect(() => {
    inputData.username.length !== 0 && inputData.password.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <LoginMainWrap>
        <LoginMainContainer>
          <h1></h1>
          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={loginHandler}>
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
                type="password"
                required
                value={inputData.password}
                onChange={(event) => inputDataHandler(event)}
              />
              <Button type="submit" disabled={disabled}>
                Log In
              </Button>
              {props.errors.show && (
                <Alert className="register-error" variant="danger">
                  {props.errors.errors[0].msg}
                </Alert>
              )}
            </form>
          )}
          <MiddleContainer>
            <small>OR</small>
          </MiddleContainer>

          <BottomContainer>
            <a href={`${process.env.REACT_APP_API_URL}/users/facebook`}>
              <Button disabled={true}>
                <FacebookIcon />
                Log in with Facebook
              </Button>
            </a>

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

  .spinner {
    display: flex;
    justify-content: center;
    padding: 30px 149px 26px;
  }

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

    .register-error {
      margin: 0;
      margin-top: 10px;
      background-color: transparent;
      border: none;
      color: ${theme.main.error};
      padding: 0 12px;
      max-width: 268px;
      font-size: 14px;
    }
    > input {
      width: 268px;
      padding: 6px;
      margin: 0px 0px 10px;
      border: 1px solid ${theme.main.grey};
      border-radius: 3px;
      background-color: rgba(218, 218, 218, 0.1);
      font-size: 14px;

      ::placeholder {
        color: rgba(38, 38, 38, 0.5);
        font-size: 0.75rem;
      }
      :focus {
        outline: none;
      }
    }
    > button {
      width: 100%;
      height: 30px;
      font-weight: 500;
      font-size: 0.9rem;
      background-color: ${theme.main.lightblue};
      padding: 4px;
      border: none;
      transition: opacity 0.25s ease;
      :disabled {
        opacity: 0.3;
      }
    }
  }
`;

const MiddleContainer = styled.div`
  margin-top: 10px;
  position: relative;

  > small {
    color: rgba(38, 38, 38, 0.5);
    font-weight: 500;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 12%;
      right: 58%;
      height: 1px;
      background-color: ${theme.main.grey};
    }
    ::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 12%;
      left: 58%;
      height: 1px;
      background-color: ${theme.main.grey};
    }
  }
`;

const BottomContainer = styled.div`
  margin: 20px 0px;
  > a > button {
    background-color: transparent;
    border: none;
    color: ${theme.main.facebook};
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
    :hover {
      background-color: transparent;
      color: ${theme.main.facebook};
    }
    :active {
      box-shadow: none;
    }
    :disabled {
      background-color: transparent;
      color: ${theme.main.facebook};
    }
    svg {
      margin-right: 0.25rem;
    }
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
    > a {
      color: ${theme.main.lightblue};
      font-weight: 500;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
