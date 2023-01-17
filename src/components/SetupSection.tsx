import React from "react";
import Container from "./Container";
import Select from "./Select";
import { useElectionContext } from "../context/ElectionContext";

//types
import type { RaceType } from "../utilTypes";

const SetupSection = () => {
  const { year, setYear, title, setTitle, setSelectedState } =
    useElectionContext();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handling changes now");
    setYear!(e.target.value as typeof year);
  };

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle!(e.target.value as RaceType);
    setSelectedState?.(undefined);
  };

  return (
    <Container className=" mt-10">
      <div className=" w-full flex">
        <div className=" flex-1 px-2">
          <Select
            title="Election Year"
            name="year"
            value={year}
            onChange={handleYearChange}
          >
            <option value="2015">2015</option>
            <option value="2019">2019</option>
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
