import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../Assets/theme";

function Spinner() {
  return (
    <SkCircle class="sk-circle">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </SkCircle>
  );
}

const skCircleBounceDelay = keyframes`
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }`;

const SkCircle = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    :before {
      content: "";
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: ${theme.main.grey};
      border-radius: 100%;
      -webkit-animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
      animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
    }
  }

  .sk-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  .sk-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .sk-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  .sk-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }
  .sk-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .sk-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }
  .sk-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }
  .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .sk-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }
  .sk-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }
  .sk-circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .sk-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .sk-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .sk-circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .sk-circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .sk-circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .sk-circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .sk-circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .sk-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .sk-circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .sk-circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
`;

export default Spinner;
