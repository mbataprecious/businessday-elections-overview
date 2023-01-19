import dayjs from "dayjs";
import React from "react";
import Container from "../Container";
import CountDown from "../CountDown";

const CountDownView = () => {
  return (
    <div>
      <Container>
        <div className=" flex justify-center items-center py-32 text-white">
          <CountDown
            expiryTimestamp={new Date(dayjs("2023-02-25").valueOf())}
            className=" bg-[#c62c2c]"
            textClassName=" text-gray-900"
          />
        </div>
      </Container>
    </div>
  );
};

export default CountDownView;
