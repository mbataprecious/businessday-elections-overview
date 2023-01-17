import React from "react";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import Container from "./Container";

const SocialBanner = () => {
  return (
    <Container>
      <div className="flex justify-between mt-5 border-2 border-dashed border-red-500 p-8 flex-wrap">
        <h3 className="text-red-500 text-lg font-display font-bold">
          Want more data on Nigeria?
        </h3>
        <div className="flex w-[4.5rem] justify-around">
          <a href="http://">
            <BsLinkedin className="text-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
          </a>
          <a href="http://">
            <BsTwitter className="text-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default SocialBanner;
