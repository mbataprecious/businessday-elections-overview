import dayjs from "dayjs";
import React from "react";
import Container from "../Container";
import CountDown from "../CountDown";

const CountDownView = () => {
  return (
    <div>
      <Container>
        <div className=" flex justify-center items-center py-32">
          <CountDown
            expiryTimestamp={new Date(dayjs("2023-02-25").valueOf())}
          />
        </div>
      </Container>
    </div>
  );
};

export default CountDownView;
