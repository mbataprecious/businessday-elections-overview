import React from "react";
import Container from "./Container";
import Select from "./Select";
import { useElectionContext } from "../context/ElectionContext";

//types
import type { RaceType } from "../utilTypes";

const SetupSection = () => {
  const { year, setYear, title, setTitle, setSelectedState } =
    useElectionContext();

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle!(e.target.value as RaceType);
    setSelectedState?.(undefined);
  };

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
            <option value="governor">Governorship</option>
            <option value="house">House Of Rep</option>
            <option value="senate">Senate</option>
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
