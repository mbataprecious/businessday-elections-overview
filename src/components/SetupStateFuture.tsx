import React, { useEffect, useRef } from "react";
import Container from "./Container";
import Select from "./Select";
import { useElectionContext } from "../context/ElectionContext";

//types
import type { RaceType } from "../utilTypes";

const SetupSection = () => {
  const mounted = useRef(false);
  const { year, title, setTitle, setFutureSelectedState } =
    useElectionContext();

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle!(e.target.value as RaceType);
    setFutureSelectedState?.(undefined);
  };

  useEffect(() => {
    if (!mounted.current) {
      setTitle?.("president");
    }
    mounted.current = true;
    return () => {};
  }, []);

  return (
    <Container className=" mt-10">
      <div className=" w-full flex">
        <div className=" flex-1 px-2">
          <Select title="Election Year" name="year" defaultValue="2023">
            <option value="2023">2023</option>
          </Select>
        </div>
        <div className=" flex-1 px-2">
          <Select
            title="Race"
            name="race"
            value={title}
            onChange={handleRaceChange}
          >
            <option value="president">Presidential</option>
            <option disabled value="governor">
              Governorship
            </option>
            <option disabled value="house">
              House Of Rep
            </option>
            <option disabled value="senate">
              Senate
            </option>
          </Select>
        </div>
        {/* <div className=" flex-1 px-2">
          <Select title="State" name="states">
            <option disabled hidden value={""}>
              select states
            </option>
            {statesPerRace &&
              !!statesPerRace!.length &&
              statesPerRace!.map(({ code, name }) => (
                <option value={code} key={code}>
                  {name}
                </option>
              ))}
          </Select>
        </div> */}
      </div>
    </Container>
  );
};

export default SetupSection;
