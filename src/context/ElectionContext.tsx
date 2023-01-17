// context/todoContext.tsx
import React, { useState, useEffect, useContext } from "react";
import { useFetchElectionData } from "../customHooks/useFetchElectionData";
import { stateCodeMap, statesArray } from "../utils";
import { ElectionDataType, RaceType, SelectedLayer } from "../utilTypes";

type Props = {
  children: React.ReactNode;
};

export type ElectionContextType = {
  data?: ElectionDataType | undefined;
  year: "2015" | "2019";
  title: RaceType;
  statesPerRace?: typeof statesArray;
  selectedState?: SelectedLayer | undefined;
  setTitle?: React.Dispatch<React.SetStateAction<RaceType>>;
  setYear?: React.Dispatch<React.SetStateAction<"2015" | "2019">>;
  setSelectedState?: React.Dispatch<
    React.SetStateAction<SelectedLayer | undefined>
  >;
};
export const ElectionContext = React.createContext<ElectionContextType | null>(
  null
);

export const useElectionContext = () =>
  useContext(ElectionContext) as ElectionContextType;

export const ElectionProvider = ({ children }: Props) => {
  let { data } = useFetchElectionData();
  const [statesPerRace, setStatesPerRace] = useState<typeof statesArray>();
  const [title, setTitle] = useState<RaceType>("governor");
  const [year, setYear] = useState<"2015" | "2019">("2019");
  const [list, setList] = useState<any>();
  const [selectedState, setSelectedState] = useState<SelectedLayer>();

  useEffect(() => {
    if (data) {
      let titledDataStates = data![parseInt(year!)][title];
      setStatesPerRace(
        Object.keys(titledDataStates.stateData).map(
          (stateCode) => stateCodeMap[stateCode]
        )
      );
    }
  }, [year, data, title]);

  return (
    <ElectionContext.Provider
      value={{
        data,
        title,
        year,
        statesPerRace,
        selectedState,
        setTitle,
        setYear,
        setSelectedState,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
