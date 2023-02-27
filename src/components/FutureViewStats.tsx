import React, { useMemo } from "react";
import { useElectionContext } from "../context/ElectionContext";
import { CandidateData } from "../utilTypes";
import Container from "./Container";
import FutureColorDirection from "./FutureColorDirection";
import PartyCards from "./PartyCards";
import SingleBarChat from "./SingleBarChat";

const FutureViewStats = () => {
  const { updates, year, setFutureSelectedState, tempTotal, title } =
    useElectionContext();

  console.log("this is temp", tempTotal);

  const presidentialCandidates = useMemo(() => {
    if (updates) {
      let list = updates.presidentialCandidates as CandidateData[];
      return list;
    }
  }, [updates]);
  return (
    <>
      <Container className=" flex flex-col md:flex-row justify-between mt-6 gap-y-4 md:gap-x-2 ">
        {title === "president" &&
          updates &&
          presidentialCandidates?.map((candidate) => (
            <div key={candidate.candidate}>
              <PartyCards candidate={candidate} />
            </div>
          ))}
      </Container>
      {/* {title === "president" && tempTotal && presidentialCandidates && (
        <SingleBarChat
          candidates={presidentialCandidates}
          total={{
            PDP: tempTotal.PDP,
            LP: tempTotal.LP,
            NNPP: tempTotal.NNPP,
            APC: tempTotal.APC,
          }}
        />
      )} */}
      <FutureColorDirection />
    </>
  );
};

export default FutureViewStats;
