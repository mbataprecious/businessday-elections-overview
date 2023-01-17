import React, { useMemo, useCallback, useState } from "react";
import { useElectionContext } from "../context/ElectionContext";
import Select from "./Select";
import Container from "./Container";
import stateGeoJson from "../assets/statedata.json";
import senateGeoJson from "../assets/senatedata.json";
import houseGeoJson from "../assets/houseOfRepsData.json";
import type { CandidateData, RaceType, SelectedLayer } from "../utilTypes";
import { getConstituentMap, stateCodeMap } from "../utils";
//types

const senateGeoJsonFeatureMap = senateGeoJson.features.reduce(
  (map, feature) => {
    map.set(feature.properties.name, feature);
    return map;
  },
  new Map<string, typeof senateGeoJson.features[number]>()
);
const houseGeoJsonFeatureMap = houseGeoJson.features.reduce((map, feature) => {
  map.set(feature.properties.name, feature);
  return map;
}, new Map<string, typeof houseGeoJson.features[number]>());

const valueMap = {
  house: "constituency",
  senate: "senatorial zone",
  governor: "State",
  president: "State",
};
const StateSetupSection = () => {
  const {
    data,
    year,
    setYear,
    selectedState,
    title,
    setTitle,
    setSelectedState,
  } = useElectionContext();

  // const [featureMap,setFeatureMap]=useState()
  console.log("selectedState", selectedState);
  const titledDataStates = useMemo(() => {
    return data ? data![parseInt(year!)][title!].stateData : {};
  }, [data, title, year]);
  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle!(e.target.value as RaceType);
    setSelectedState?.(undefined);
  };

  const featureMap = useMemo(() => {
    switch (title) {
      case "senate":
        return senateGeoJsonFeatureMap;
      case "house":
        return houseGeoJsonFeatureMap;
    }
  }, [title]);

  const handleContituentChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (title === "president" || title === "governor") {
        let state = stateGeoJson.features.find(
          (state) => state.properties.id === e.target.value
        );
        setSelectedState?.({ state });
        return;
      }
      let state;
      switch (title) {
        case "senate":
          state = senateGeoJson.features.find(
            (state) => state.properties.name === e.target.value
          );
          setSelectedState?.({ state });
          break;
        case "house":
          state = houseGeoJson.features.find(
            (state) => state.properties.name === e.target.value
          );
          setSelectedState?.({ state });
          break;

        default:
          return stateCodeMap;
      }
    },
    [title]
  );

  let constituentMap = useMemo(
    () =>
      title === "president" || title === "governor"
        ? Object.keys(titledDataStates).reduce((acc, stateCode) => {
            let sorted = titledDataStates[stateCode].sort((a, b) => {
              return Number(b.votes) - Number(a.votes);
            });
            acc[stateCode] = sorted;
            return acc;
          }, {} as Record<string, CandidateData[]>)
        : getConstituentMap(titledDataStates, title, year),
    [titledDataStates, title, year]
  );

  console.log({ constituentMap });
  return (
    <Container className="flex">
      <div className=" lg:w-8/12 px-2">
        <Select
          title={valueMap[title]}
          onChange={handleContituentChange}
          value={
            title === "president" || title === "governor"
              ? selectedState?.state.properties.state
              : selectedState?.state.properties.name
          }
          name="states"
        >
          <option disabled hidden value={""}>
            select states
          </option>
          {!!constituentMap &&
            !!Object.keys(constituentMap).length &&
            Object.keys(constituentMap)!.map((constituent) => (
              <option
                value={constituent}
                disabled={
                  !(title === "president" || title === "governor")
                    ? !featureMap?.get(constituent)
                    : false
                }
                key={constituent}
              >
                {title === "president" || title === "governor"
                  ? stateCodeMap[constituent].name
                  : constituent}
              </option>
            ))}
        </Select>
      </div>
      <div className=" lg:w-4/12 px-2">
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
    </Container>
  );
};

export default StateSetupSection;
