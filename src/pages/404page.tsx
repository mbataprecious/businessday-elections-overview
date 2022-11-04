import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/98247-404-error.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const NoMatch = () => {
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default NoMatch;
