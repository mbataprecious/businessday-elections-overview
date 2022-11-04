import React from "react";
import { Link } from "react-router-dom";
import { currentParamRoute, regionStates } from "../utils";
import { useLocation } from "react-router-dom";
import type { RegionStateType } from "../utilTypes";

type Props = { className?: string };

const StatesDropDown = ({ className }: Props) => {
  const location = useLocation();
  const currentParamRoutePath = currentParamRoute(location);

  return (
    <div
      className={`flex flex-wrap justify-between border border-gray-600 p-4 w-full md:w-[29rem] ${className}`}
    >
      {Object.keys(regionStates).map((region) => (
        <div key={region} className="flex flex-col w-100 w-[30%] md:w-[8.3rem]">
          <h4 className="mb-2 font-display text-lg font-bold">{region}</h4>
          {regionStates[region as keyof RegionStateType].map(
            ({ name, code }) => (
              <Link key={name} to={`/state/${code}/${currentParamRoutePath}`}>
                {name}
              </Link>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default StatesDropDown;
