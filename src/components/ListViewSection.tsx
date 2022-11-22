import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchElectionData } from "../customHooks/useFetchElectionData";
import type { CandidateData } from "../utilTypes";
import Container from "./Container";
import GovtCard from "./GovtCard";
import SenateCard from "./SenateCard";

const ListViewSection = () => {
  const [candidatesList, setCandidatesList] = useState<CandidateData[][]>();
  const params = useParams();
  let { year, title } = params;
  let { data } = useFetchElectionData();
  console.log(candidatesList);
  useEffect(() => {
    console.log("this is running mounted");
    if (data) {
      let titledDataStates = data![parseInt(year!)][title!].stateData;
      if (title === "president" || title === "governor") {
        let stateList = Object.values(titledDataStates).reduce(
          (acc, stateData) => {
            let sorted = stateData
              .sort((a, b) => {
                return Number(b.votes) - Number(a.votes);
              })
              .slice(0, 3);

            return [...acc, sorted];
          },
          [] as CandidateData[][]
        );
        setCandidatesList(stateList);
      } else {
        console.log("this is running false");
        let constituentList = Object.values(titledDataStates).reduce(
          (acc, stateData) => {
            let listByContituency = stateData.reduce((acc2, candidate) => {
              acc2[candidate.constituency] = [
                ...(acc2[candidate.constituency]
                  ? acc2[candidate.constituency].sort((a, b) => {
                      return Number(b.votes) - Number(a.votes);
                    })
                  : []),
                candidate,
              ].slice(0, 3);
              return acc2;
            }, {} as Record<string, CandidateData[]>);

            return [...acc, ...Object.values(listByContituency)];
          },
          [] as CandidateData[][]
        );
        setCandidatesList(constituentList);
      }
    }
  }, [data, title, year]);

  return (
    <Container>
      <div className="flex flex-wrap pt-16">
        {candidatesList ? (
          candidatesList[0][0].constituency === "none" ? (
            candidatesList.map((list) => (
              <GovtCard key={list[0].state} as="list" candidates={list} />
            ))
          ) : (
            candidatesList.map((list) => (
              <SenateCard
                key={list[0].constituency}
                candidates={list}
                as="list"
              />
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default ListViewSection;
