import React from "react";
import flagImg from "../assets/images/flag.png";
import candidatesImg from "../assets/images/candidate-grp.png";
import Container from "./Container";
import CountDownSmall from "./CountDownSmall";
import dayjs from "dayjs";

//background: linear-gradient(260.6deg, #C80700 16.16%, #FD6645 68.48%);
type Props = {
  type?: "past" | "future";
};

const Banner = ({ type = "past" }: Props) => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row h-[500px] md:h-[308px] bg-[linear-gradient(260.6deg,#C80700_16.16%,#FD6645_68.48%)] w-full overflow-hidden rounded-[40px]">
        <div className=" md:w-2/5 pl-6 py-6 my-auto text-white">
          <h2 className="text-5xl font-bold">ELECTION TODAY</h2>
          <p className=" text-sm leading-4 pr-9 mb-12">
            This is a concise historical election overview for the past two
            elections. This help draw insights on where we are and predictive
            charts about the future.
          </p>
          <CountDownSmall
            expiryTimestamp={new Date(dayjs("2023-02-25").valueOf())}
          />
        </div>
        <div className=" md:w-3/5 relative h-full">
          {" "}
          <img
            src={flagImg}
            alt="nigerian flag"
            className=" hidden md:inline-block absolute -top-[5px] -right-10"
          />{" "}
          <img
            src={candidatesImg}
            alt="candidates pictures"
            className="absolute bottom-0"
          />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
