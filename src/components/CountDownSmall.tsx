import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  expiryTimestamp: Date;
};
const CountDownSmall = ({ expiryTimestamp }: Props) => {
  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("onExpire called"),
  });
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-end scale-90">
      <div className="flex flex-col">
        <p className=" text-center">DAYS</p>
        <div className={"flex h-[50px]"}>
          {days
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`day-${i}`}
                className="bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-lg w-9 m-[1px]"
              >
                {x}
              </div>
            ))}
        </div>
      </div>

      <span className="p-[4px] text-[#011C2C] font-bold">:</span>
      <div className="flex flex-col">
        <p className=" text-center">HRS</p>
        <div className={"flex h-[50px]"}>
          {hours
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`hrs-${i}`}
                className="bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-lg  w-9 m-[1px]"
              >
                {x}
              </div>
            ))}
        </div>
      </div>
      <span className="p-[4px] text-[#011C2C] font-bold">:</span>
      <div className="flex flex-col">
        <p className=" text-center">MINS</p>
        <div className={"flex h-[50px]"}>
          {minutes
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`min-${i}`}
                className="bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-lg  w-9 m-[1px]"
              >
                {x}
              </div>
            ))}
        </div>
      </div>
      <span className="p-[4px] text-[#011C2C] font-bold">:</span>
      <div className="flex flex-col">
        <p className=" text-center">SECS</p>
        <div className={"flex h-[50px]"}>
          {seconds
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`sec-${i}`}
                className="bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-lg  w-9 m-[1px]"
              >
                {x}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CountDownSmall;
