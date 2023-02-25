import React, { useMemo, useCallback } from "react";
import type { CandidateData, ElectionUpdate } from "../utilTypes";
import { useElectionContext } from "../context/ElectionContext";
import { getConstituentMap, partyColors, ColorLuminance } from "../utils";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import numeral from "numeral";

type Props = {
  className?: string;
  candidates?: CandidateData[];
  style?: React.CSSProperties;
};
const FutureShortTable = ({ className, candidates, ...rest }: Props) => {
  const {
    data,
    updates,
    year,
    futureSelectedState,
    title,
    setFutureSelectedState,
  } = useElectionContext();

  //creating the map to states
  let constituentMap = useMemo(
    () =>
      title === "president" || title === "governor"
        ? (updates![title] as ElectionUpdate[]).reduce((acc, lga) => {
            acc[lga.state] = [...(acc[lga.state] ?? []), lga];
            return acc;
          }, {} as Record<string, ElectionUpdate[]>)
        : (updates![title] as CandidateData[]).reduce((acc, candidate) => {
            acc[candidate.constituency] = [
              ...acc[candidate.constituency],
              candidate,
            ];
            return acc;
          }, {} as Record<string, CandidateData[]>),
    [updates, title, year]
  );

  //geting the main data from the states
  const selectedList = useMemo<
    CandidateData[] | ElectionUpdate[] | null
  >(() => {
    if (futureSelectedState) {
      if (title === "president" || title === "governor") {
        return constituentMap[
          futureSelectedState.state.properties.name as string
        ];
      } else {
        return constituentMap[
          futureSelectedState.state.properties.name as string
        ];
      }
    } else {
      return null;
    }
  }, [futureSelectedState, title, constituentMap]);

  const handleClose = () => {
    setFutureSelectedState?.(undefined);
  };
  return (
    <>
      <div className={`${"w-full"}  ${className ? className : ""}`} {...rest}>
        {" "}
        <div className="w-full flex justify-end">
          <button
            onClick={handleClose}
            className="w-[3.5rem] h-[3.5rem] bg-red-600 rounded-[50%] translate-y-6 -translate-x-4"
          >
            <BsXLg color="#ffffff" className="m-auto" />
          </button>
        </div>
        <div
          className={` rounded-t-[20px] overflow-auto bg-[#ffffffe4] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-[#fafbfc]`}
        >
          <div className="bg-black text-white p-3 flex items-center gap-6 w-full">
            <div>
              <div className="blob red"></div>
            </div>
            {title === "president" || title === "governor"
              ? selectedList![0].state.toUpperCase() + " STATE"
              : ""}
          </div>

          <div className={` !bg-[#000000]  w-full px-3`}>
            {title === "president" || title === "governor" ? (
              <div className={`flex w-full !bg-[#000000] `}>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black w-1/3">
                  LGA
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  PDP (votes)
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  LP (votes)
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  APC (votes)
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  NNPC (votes)
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  % win
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left bg-black flex-1">
                  total
                </div>
              </div>
            ) : (
              <div className={`flex w-full bg-black`}>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left w-1/3">
                  Candidates
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1">
                  Political Party
                </div>
                {/* <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1"></div> */}
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1">
                  Constituency
                </div>
              </div>
            )}
          </div>
          {!!selectedList &&
            (title === "president" || title === "governor" ? (
              <div className="h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-[#fafbfc]">
                {(selectedList as ElectionUpdate[]).map(
                  ({ name, PDP, APC, LP, NNPP }) => (
                    <div
                      key={name}
                      className={`flex w-full px-3 border-b-2 border-gray-500`}
                    >
                      <div className="font-medium flex items-center text-sm pt-5 px-1 text-left w-1/3">
                        {name}
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {PDP}
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {LP}
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {APC}
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {NNPP}
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1"></div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1"></div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-[#fafbfc]">
                {(selectedList as CandidateData[]).map(
                  ({
                    candidate,
                    votes,
                    constituency,
                    won,
                    total_votes,
                    party,
                  }) => (
                    <div
                      key={candidate}
                      className={`flex w-full px-3 border-b-2 border-gray-500`}
                    >
                      <div className="font-medium flex items-center text-sm pt-5 px-1 text-left w-1/3">
                        <div>
                          <div
                            className="mr-2 w-2 h-2 md:w-4 md:h-4 rounded-[50%]"
                            style={{
                              backgroundColor: partyColors[party]
                                ? ColorLuminance(partyColors[party], 0.4)
                                : "",
                            }}
                          ></div>
                        </div>
                        {candidate}
                      </div>
                      <div className="flex md:text-lg pt-5 px-1 text-left flex-1 font-semibold  md:font-bold">
                        {party}
                        <img
                          className=" ml-2 w-5 h-5 md:w-7 md:h-7"
                          src={`https://stears-elections.s3.eu-west-1.amazonaws.com/static/${party}.png`}
                          alt={`${" "?.toLowerCase()}`}
                        />
                      </div>
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {constituency}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FutureShortTable;
