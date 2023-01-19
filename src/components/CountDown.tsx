import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  expiryTimestamp: Date;
  size?: "big" | "small";
  className?: string;
  textClassName?: string;
};
const CountDown = ({
  expiryTimestamp,
  size,
  className,
  textClassName,
}: Props) => {
  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("onExpire called"),
  });
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <p className={`text-center ${textClassName}`}>DAYS</p>
        <div className={"flex h-[100px]"}>
          {days
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`day-${i}`}
                className={`bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-2xl w-16 m-[2px] flex justify-center items-center ${className}`}
              >
                {x}
              </div>
            ))}
        </div>
      </div>

      <span className="p-[4px] text-[#011C2C] font-bold translate-y-2">:</span>
      <div className="flex flex-col">
        <p className={`text-center ${textClassName}`}>HRS</p>
        <div className={"flex h-[100px]"}>
          {hours
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`hrs-${i}`}
                className={`bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-2xl w-16 m-[2px] flex justify-center items-center ${className}`}
              >
                {x}
              </div>
            ))}
        </div>
      </div>
      <span className="p-[4px] text-[#011C2C] font-bold translate-y-2">:</span>
      <div className="flex flex-col">
        <p className={`text-center ${textClassName}`}>MINS</p>
        <div className={"flex h-[100px]"}>
          {minutes
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`min-${i}`}
                className={`bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-2xl w-16 m-[2px] flex justify-center items-center ${className}`}
              >
                {x}
              </div>
            ))}
        </div>
      </div>
      <span className="p-[4px] text-[#011C2C] font-bold translate-y-2">:</span>
      <div className="flex flex-col">
        <p className={`text-center ${textClassName}`}>SECS</p>
        <div className={"flex h-[100px]"}>
          {seconds
            .toString()
            .padStart(2, "0")
            .split("")
            .map((x, i) => (
              <div
                key={`sec-${i}`}
                className={`bg-[#011C2C] p-3 rounded-[5px] font-robotoMono text-2xl w-16 m-[2px] flex justify-center items-center ${className}`}
              >
                {x}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CountDown;
