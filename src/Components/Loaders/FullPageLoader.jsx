import React from "react";
import styled, { keyframes } from "styled-components";

function FullPageLoader() {
  return (
    <FullPageWrap>
      <SkCube>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1 mx-2 my-2"></div>
          <div className="sk-cube sk-cube2 mx-2 my-2"></div>
          <div className="sk-cube sk-cube3 mx-2 my-2"></div>
          <div className="sk-cube sk-cube4 mx-2 my-2"></div>
          <div className="sk-cube sk-cube5 mx-2 my-2"></div>
          <div className="sk-cube sk-cube6 mx-2 my-2"></div>
          <div className="sk-cube sk-cube7 mx-2 my-2"></div>
          <div className="sk-cube sk-cube8 mx-2 my-2"></div>
          <div className="sk-cube sk-cube9 mx-2 my-2"></div>
        </div>
      </SkCube>
    </FullPageWrap>
  );
}

const FullPageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 9999;
`;

const SkCubeGridScaleDelay = keyframes`
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }`;

const SkCube = styled.div`
  .sk-cube-grid {
    width: 200px;
    height: 200px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 25%;
    height: 25%;
    background: linear-gradient(45deg, #df853d, #ee428f);
    float: left;
    -webkit-animation: ${SkCubeGridScaleDelay} 1.3s infinite ease-in-out;
    animation: ${SkCubeGridScaleDelay} 1.3s infinite ease-in-out;
  }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
`;

export default FullPageLoader;
