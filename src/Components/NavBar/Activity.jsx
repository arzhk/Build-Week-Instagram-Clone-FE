import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import SpriteSheet from "../../Assets/spritesheet.png";
import Spinner from "../Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Activity = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);

  return (
    <ActivityMainWrap className={props.hide ? "hide" : ""}>
      {loading ? (
        <Spinner />
      ) : (
        <ActivityMainContainer>
          <h1></h1>
          <p>Activity On Your Posts</p>
          <p>When someone likes or comments on one of your posts, you'll see it here.</p>
        </ActivityMainContainer>
      )}
    </ActivityMainWrap>
  );
};

const slideOutTop = keyframes`
0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
100% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }`;

const ActivityMainWrap = styled.div`
  max-height: 362px;
  min-height: 100px;
  overflow-y: auto;
  width: 500px;
  text-align: center;
  position: absolute;
  z-index: 9999;
  background-color: white;
  top: 38px;
  right: 22px;
  box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.hide {
    animation: ${slideOutTop} 0.15s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
`;

const ActivityMainContainer = styled.div`
  width: 100%;
  min-height: 240px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    background-repeat: no-repeat;
    background-position: -306px -132px;
    height: 62px;
    width: 62px;
    background-image: url(${SpriteSheet});
  }
  > p {
    margin: 0;
    margin-top: 16px;
    font-size: 14px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
