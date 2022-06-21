import * as React from "react";
import { LoaderContainer } from "./LoaderStyle";

const Loader = () => {
  return (
    <LoaderContainer className="loader-container">
      <svg className="circle-loader-spinner" viewBox="0 0 50 50">
        <circle className="circle-loader-spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </LoaderContainer>
  );
};

export default Loader;
