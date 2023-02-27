// context/todoContext.tsx
import React, { useState, useEffect, useContext } from "react";
import { useFetchElectionData } from "../customHooks/useFetchElectionData";
import { useFetchFutureElectionData } from "../customHooks/useFetchFutureElectionData";
import { useFetchTotal } from "../customHooks/useFetchTotal";
import { stateCodeMap, statesArray } from "../utils";
import {
  CandidateData,
  ElectionDataType,
  ElectionUpdate,
  RaceType,
  SelectedLayer,
} from "../utilTypes";

type Props = {
  children: React.ReactNode;
};

export type ElectionContextType = {
  tempTotal?: ElectionUpdate;
  data?: ElectionDataType | undefined;
  year: "2015" | "2019";
  updates: Record<string, ElectionUpdate[] | CandidateData[]> | undefined;
  title: RaceType;
  statesPerRace?: typeof statesArray;
  selectedState?: SelectedLayer | undefined;
  futureSelectedState?: SelectedLayer | undefined;
  setTitle?: React.Dispatch<React.SetStateAction<RaceType>>;
  setYear?: React.Dispatch<React.SetStateAction<"2015" | "2019">>;
  setSelectedState?: React.Dispatch<
    React.SetStateAction<SelectedLayer | undefined>
  >;
  setFutureSelectedState?: React.Dispatch<
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
  let { data: totalData } = useFetchTotal();
  const [futureSelectedState, setFutureSelectedState] =
    useState<SelectedLayer>();
  let { data: ElectionUpdate } = useFetchFutureElectionData();
  const [updates, setUpdates] =
    useState<Record<string, ElectionUpdate[] | CandidateData[]>>();
  const [tempTotal, setTempTotal] = useState<ElectionUpdate>();
  const [statesPerRace, setStatesPerRace] = useState<typeof statesArray>();
  const [title, setTitle] = useState<RaceType>("president");
  const [year, setYear] = useState<"2015" | "2019">("2019");
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

  useEffect(() => {
    if (totalData) {
      console.log("this iss", totalData);
      setTempTotal(totalData);
    }
  }, [year, totalData, title]);

  useEffect(() => {
    if (ElectionUpdate) {
      setUpdates({
        president: ElectionUpdate["Presidential update"] as ElectionUpdate[],
        governor: ElectionUpdate["Presidential update"] as ElectionUpdate[],
        presidentialCandidates: ElectionUpdate[
          "Presidential candidates"
        ] as CandidateData[],
      });
    }
  }, [ElectionUpdate, title]);

  return (
    <ElectionContext.Provider
      value={{
        tempTotal,
        data,
        title,
        year,
        statesPerRace,
        selectedState,
        futureSelectedState,
        setFutureSelectedState,
        setTitle,
        setYear,
        setSelectedState,
        updates,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
