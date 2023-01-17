import { useMemo, useState } from "react";
import type { CandidateData, party } from "../utilTypes";
import numeral from "numeral";
import Container from "./Container";
import ColorDirection from "./ColorDirection";
import { useElectionContext } from "../context/ElectionContext";

const DataLayer = () => {
  const { data, year, title } = useElectionContext();
  const [totalSets] = useState({
    house: 360,
    senate: 109,
    governor: 37,
    president: 37,
  });
  const [winningCandidates, setWinningCandidates] = useState<CandidateData[]>();
  // console.log("this is winners", winningCandidates);

  let stats = useMemo(() => {
    let mapCandidate: { [Key in party]?: number } & { others: number } = {
      PDP: 0,
      APC: 0,
      others: 0,
    };
    if (year && title && data) {
      let gernorshipStateData = data[parseInt(year)][title!].stateData;
      for (const property in gernorshipStateData) {
        let stateWinningCandidates = gernorshipStateData[property].filter(
          (candidates) => {
            return candidates.won === "won";
          }
        );
        setWinningCandidates(stateWinningCandidates);
        if (stateWinningCandidates.length) {
          stateWinningCandidates.forEach((candidate) => {
            switch (candidate.party) {
              case "PDP":
                mapCandidate.PDP!++;
                break;
              case "APC":
                mapCandidate.APC!++;
                break;
              default:
                mapCandidate.others++;
                break;
            }
          });
        }
      }
    }

    return mapCandidate;
  }, [title, year, data]);

  let totalSummaryVotes = useMemo(() => {
    let total = 0;
    if (year && title && data) {
      let totalVotersSummary = data[parseInt(year)][title!].summary;
      for (const property in totalVotersSummary) {
        total += Number(
          totalVotersSummary[property as keyof typeof totalVotersSummary].votes
        );
      }
    }
    return total;
  }, [title, year, data]);
  // console.log("this is the totalVotersSummary", totalSummaryVotes);
  // console.log("this is the stats", stats);

  return (
    <div>
      <Container>
        {" "}
        {!(title === "president") ? (
          <>
            <div className="progress flex mt-8">
              <div
                style={{
                  width: `${
                    ((stats.PDP as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="PDP text-[#0d4c87] text-center"
              >
                <h3 className=" text-4xl">
                  {stats.PDP}
                  <span className="text-sm">PDP</span>
                </h3>
              </div>
              <div
                style={{
                  width: `${
                    ((stats.APC as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="APC text-[#3d8850] text-center"
              >
                <h3 className=" text-4xl">
                  {stats.APC}
                  <span className="text-sm">APC</span>
                </h3>
              </div>
              <div
                style={{
                  width: `${
                    ((stats.others as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="text-[#89317a] text-center"
              >
                <h3 className=" text-4xl">
                  {stats.others}
                  <span className="text-sm"></span>
                </h3>
              </div>
            </div>
            <div className="progress bg-[#919191] flex h-4 ">
              <div
                style={{
                  width: `${
                    ((stats.PDP as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="APC bg-[#0d4c87]"
              ></div>
              <div
                style={{
                  width: `${
                    ((stats.APC as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="bg-[#3d8850]"
              ></div>
              <div
                style={{
                  width: `${
                    ((stats.others as number) /
                      totalSets[title as keyof typeof totalSets]) *
                    100
                  }%`,
                }}
                className="bg-[#89317a]"
              ></div>
            </div>
          </>
        ) : (
          !!data &&
          winningCandidates?.length && (
            <>
              <div className="progress flex mt-8">
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.PDP.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="PDP text-[#0d4c87] text-center"
                >
                  <h3 className=" text-4xl">PDP</h3>
                </div>
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.APC.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="APC text-[#3d8850] text-center"
                >
                  <h3 className=" text-4xl">APC</h3>
                </div>
                <div
                  style={{
                    width: `${
                      ((totalSummaryVotes -
                        (Number(
                          data[parseInt(year!)][title!].summary.APC.votes
                        ) +
                          Number(
                            data[parseInt(year!)][title!].summary.PDP.votes
                          ))) /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="text-[#89317a] text-center"
                >
                  <h3 className=" text-4xl">{""}</h3>
                </div>
              </div>

              {/* this is the progress guage */}
              <div className="progress bg-[#919191] flex h-4 ">
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.PDP.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="PDP bg-[#0d4c87]"
                ></div>
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.APC.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="APC bg-[#3d8850]"
                ></div>
                <div
                  style={{
                    width: `${
                      ((totalSummaryVotes -
                        (Number(
                          data[parseInt(year!)][title!].summary.APC.votes
                        ) +
                          Number(
                            data[parseInt(year!)][title!].summary.PDP.votes
                          ))) /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="bg-[#89317a]"
                ></div>
              </div>

              <div className="flex">
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.PDP.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="PDP"
                >
                  <p className=" text-center mt-4">
                    {`${numeral(
                      (data[parseInt(year!)][title!].summary.PDP.votes /
                        totalSummaryVotes) *
                        100
                    ).format("00")}%`}
                    <br />
                    {`${numeral(
                      data[parseInt(year!)][title!].summary.PDP.votes
                    ).format("0,0")} votes`}
                  </p>
                </div>
                <div
                  style={{
                    width: `${
                      (data[parseInt(year!)][title!].summary.APC.votes /
                        totalSummaryVotes) *
                      100
                    }%`,
                  }}
                  className="APC"
                >
                  <p className=" text-center mt-4">
                    {`${numeral(
                      (data[parseInt(year!)][title!].summary.APC.votes /
                        totalSummaryVotes) *
                        100
                    ).format("00")}%`}
                    <br />
                    {`${numeral(
                      data[parseInt(year!)][title!].summary.APC.votes
                    ).format("0,0")} votes`}
                  </p>
                </div>
                <div className="bg-[#89317a]"></div>
              </div>
            </>
          )
        )}
      </Container>
      <ColorDirection />
    </div>
  );
};

export default DataLayer;
