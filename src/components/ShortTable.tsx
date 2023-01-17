import React, { useMemo } from "react";
import type { CandidateData } from "../utilTypes";
import { useElectionContext } from "../context/ElectionContext";
import { getConstituentMap, partyColors, ColorLuminance } from "../utils";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import numeral from "numeral";

type Props = {
  className?: string;
  candidates?: CandidateData[];
  style?: React.CSSProperties;
};
const ShortTable = ({ className, candidates, ...rest }: Props) => {
  const { data, year, selectedState, title, setSelectedState } =
    useElectionContext();
  const titledDataStates = useMemo(() => {
    return data ? data![parseInt(year!)][title!].stateData : {};
  }, [data, title, year]);
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

  const selectedList = useMemo<CandidateData[] | null>(() => {
    if (selectedState) {
      if (title === "president" || title === "governor") {
        return constituentMap[selectedState.state.properties.id as string];
      } else {
        return constituentMap[selectedState.state.properties.name as string];
      }
    } else {
      return null;
    }
  }, [selectedState, title, constituentMap]);

  const handleClose = () => {
    setSelectedState?.(undefined);
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
        <div className={` rounded-t-[20px] overflow-hidden bg-[#ffffffe4]`}>
          <div className={` !bg-[#000000] px-3`}>
            {title === "president" || title === "governor" ? (
              <div className={`flex w-full`}>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left w-1/3">
                  Candidates
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1">
                  Political Party
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1">
                  Votes
                </div>
                <div className="font-medium pb-3 text-sm pt-5 px-1 text-white text-left flex-1">
                  % win
                </div>
              </div>
            ) : (
              <div className={`flex w-full`}>
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
            selectedList
              .slice(0, 3)
              .map(
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
                      {won === "won" && (
                        <div>
                          <div
                            className="ml-2 flex justify-center items-center w-5 h-5 md:w-7 md:h-7 rounded-[50%]"
                            style={{
                              backgroundColor: partyColors[party]
                                ? ColorLuminance(partyColors[party], 0.4)
                                : "",
                            }}
                          >
                            <BsCheckLg color="#ffffff" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex md:text-lg pt-5 px-1 text-left flex-1 font-semibold  md:font-bold">
                      {party}
                      <img
                        className=" ml-2 w-5 h-5 md:w-7 md:h-7"
                        src={`https://stears-elections.s3.eu-west-1.amazonaws.com/static/${party}.png`}
                        alt={`${" "?.toLowerCase()}`}
                      />
                    </div>
                    {(title === "president" || title === "governor") && (
                      <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                        {numeral(votes).format("0,0")}
                      </div>
                    )}
                    <div className="font-medium text-sm pt-5 px-1 text-left flex-1">
                      {title === "president" || title === "governor"
                        ? `${numeral(
                            (Number(votes) / Number(total_votes)) * 100
                          ).format("0.0")}%`
                        : constituency}
                      {title === "president" || title === "governor" ? (
                        <span className="flex w-14 h-4 bg-slate-300 rounded-xl overflow-hidden">
                          <span
                            className={`h-full $`}
                            style={{
                              width: `${
                                (Number(votes) / Number(total_votes)) * 100
                              }%`,
                              background: ColorLuminance(
                                partyColors[party],
                                0.4
                              ),
                            }}
                          ></span>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )
              )}
          <div className="flex justify-center pt-10 pb-5">
            <p className=" text-blue-600 text-sm hover:underline hover:cursor-pointer">
              View all candidates
            </p>
          </div>
          {/* <div className="bg-white w-full">
          {!!candidates &&
            candidates.map((electorialCandidates) => {
              const { candidate, party, votes, total_votes } =
                electorialCandidates;
              return (
                <div className="flex w-full" key={candidate}>
                  <div className="border-b px-1 py-2 w-1/3">{candidate}</div>
                  <div className="border-b px-1 py-2 flex-1">{party}</div>
                  <div className="border-b px-1 py-2 flex-1">
                    <span className="flex w-14 h-4 bg-slate-300 roun">
                      <span
                        className={`h-full ${getBgStyle(electorialCandidates)}`}
                        style={{
                          width: `${
                            (Number(votes) / Number(total_votes)) * 100
                          }%`,
                        }}
                      ></span>
                    </span>
                  </div>
                  <div className="border-b px-1 py-2 flex-1">
                    {numeral(votes).format("0,0")}
                  </div>
                  <div className="border-b px-1 py-2 flex-1">
                    {`${numeral(
                      (Number(votes) / Number(total_votes)) * 100
                    ).format("0.0")}%`}
                  </div>
                </div>
              );
            })}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default ShortTable;
