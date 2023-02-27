import dayjs from "dayjs";
import React from "react";
import Container from "../Container";
import CountDown from "../CountDown";

const CountDownView = () => {
  return (
    <div>
      <Container className="mt-24">
        <h2 className="text-5xl font-semibold text-center max-w-lg mx-auto">
          Count Down to 2023 Elections
        </h2>
        <div className=" flex justify-center items-center pt-9 pb-32 text-white">
          <CountDown
            expiryTimestamp={new Date(dayjs().valueOf())}
            className=" bg-[#c62c2c]"
            textClassName=" text-gray-900"
            size="big"
          />
        </div>
      </Container>
    </div>
  );
};

export default CountDownView;
