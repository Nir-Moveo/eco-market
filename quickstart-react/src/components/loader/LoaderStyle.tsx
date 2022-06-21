import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: relative;
  height: 30%;
  width: 30%;

  .circle-loader-spinner {
    animation: rotate 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50%;
    margin-left: -50%;

    .circle-loader-spinner-path {
      stroke: currentColor;
      stroke-linecap: round;
      animation: dash 1s infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
