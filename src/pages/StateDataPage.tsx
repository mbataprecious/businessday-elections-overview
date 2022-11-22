import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { CandidateData } from "../utilTypes";
import { capitalCase } from "change-case";
import { useParams } from "react-router";
import { useFetchElectionData } from "../customHooks/useFetchElectionData";
import { stateCodeMap } from "../utils";
import GovtCard from "../components/GovtCard";
import SenateCard from "../components/SenateCard";

const titleArray = ["president", "governor", "house", "senate"];
const StateDataPage = () => {
  let { data } = useFetchElectionData();
  let [allStateData, setAllStateData] = useState<{
    president?: CandidateData[];
    governor?: CandidateData[];
    senate?: CandidateData[][];
    house?: CandidateData[][];
  }>({
    president: [],
    governor: [],
    senate: [],
    house: [],
  });
  let { year, title, stateCode } = useParams();
  console.log(allStateData);
  useEffect(() => {
    if (data) {
      console.log("this is the data in effect", data);
      if (title === "president" || title === "governor") {
        let titledDataStates =
          data![parseInt(year!)][title!].stateData[stateCode!];
        let sorted = titledDataStates
          .sort((a, b) => {
            return Number(b.votes) - Number(a.votes);
          })
          .slice(0, 4);

        setAllStateData((x) => ({
          [title! as keyof typeof allStateData]: sorted,
        }));
      }

      if (title === "senate" || title === "house") {
        let titledDataStates =
          data![parseInt(year!)][title!].stateData[stateCode!];
        let listByContituency = titledDataStates.reduce((acc2, candidate) => {
          acc2[candidate.constituency] = [
            ...(acc2[candidate.constituency]
              ? acc2[candidate.constituency].sort((a, b) => {
                  return Number(b.votes) - Number(a.votes);
                })
              : []),
            candidate,
          ];
          return acc2;
        }, {} as Record<string, CandidateData[]>);

        setAllStateData((x) => ({
          [title! as keyof typeof allStateData]: [
            ...Object.values(listByContituency).map((x) => x.slice(0, 3)),
          ],
        }));
      }

      if (title === "all") {
        titleArray.forEach((title) => {
          if (title === "president" || title === "governor") {
            let titledDataStates =
              data![parseInt(year!)][title!].stateData[stateCode!];
            let sorted = titledDataStates
              .sort((a, b) => {
                return Number(b.votes) - Number(a.votes);
              })
              .slice(0, 4);

            setAllStateData((x) => ({
              ...x,
              [title! as keyof typeof allStateData]: sorted,
            }));
          }

          if (title === "senate" || title === "house") {
            let titledDataStates =
              data![parseInt(year!)][title!].stateData[stateCode!];
            let listByContituency = titledDataStates.reduce(
              (acc2, candidate) => {
                acc2[candidate.constituency] = [
                  ...(acc2[candidate.constituency]
                    ? acc2[candidate.constituency].sort((a, b) => {
                        return Number(b.votes) - Number(a.votes);
                      })
                    : []),
                  candidate,
                ];
                return acc2;
              },
              {} as Record<string, CandidateData[]>
            );

            setAllStateData((x) => ({
              ...x,
              [title! as keyof typeof allStateData]: [
                ...Object.values(listByContituency).map((x) => x.slice(0, 3)),
              ],
            }));
          }
        });
      }
    }
  }, [data, title, year, stateCode]);

  return (
    <Container>
      {/* the summary section */}
      <div className=" flex flex-col md:flex-row mt-10">
        <div className="flex-1">
          <h2 className=" text-2xl">{`${
            stateCodeMap[stateCode!].name
          } at a glance`}</h2>
        </div>
        <div className="flex-1">
          <div className="w-full border-t-2 py-4 border-b-2 border-gray-800">
            <div className="flex my-3 w-full">
              <div className={`flex-1`}></div>
              <div className={`flex-1 text-center text-[#0d4c87]`}>
                <p>PDP</p>
              </div>
              <div className={`flex-1 text-center text-[#3d8850]`}>APC</div>
              <div className={`flex-1 text-center text-[#5c340f]`}>LP</div>
            </div>
            {!!data &&
              titleArray.map((x) => {
                let stateData =
                  data![parseInt(year!)][x!].stateData[stateCode!];
                let numberStats = stateData.reduce(
                  (acc, x) => {
                    if (x.won === "won") {
                      acc[x.party as keyof typeof acc]++;
                    }
                    return acc;
                  },
                  { PDP: 0, APC: 0, LP: 0 }
                );
                return (
                  <div key={x} className="flex my-3 w-full">
                    <div className={`flex-1 font-bold`}>{`${capitalCase(
                      x
                    )} :`}</div>
                    <div className={`flex-1 text-center text-[#0d4c87]`}>
                      <p>
                        {x === "president" || x === "governor"
                          ? numberStats.PDP
                            ? "W"
                            : "L"
                          : numberStats.PDP}
                      </p>
                    </div>
                    <div className={`flex-1 text-center text-[#3d8850]`}>
                      {x === "president" || x === "governor"
                        ? numberStats.APC
                          ? "W"
                          : "L"
                        : numberStats.APC}
                    </div>
                    <div className={`flex-1 text-center text-[#5c340f]`}>
                      {x === "president" || x === "governor"
                        ? numberStats.LP
                          ? "W"
                          : "L"
                        : numberStats.LP}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* President section */}
      {!!allStateData.president?.length && (
        <div className="flex w-full mt-10">
          <div className="w-full">
            <h2 className=" text-2xl my-5 pb-4 border-b-2 border-black">
              President - 1 Race
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <p>How is the President of Nigeria determined?</p>
                <br />
                <p>
                  A candidate for an election to the office of President shall
                  be deemed to have been duly elected where, there being more
                  than two candidates for the election:
                </p>
                <ul className=" list-decimal list-inside lst">
                  <li>
                    {" "}
                    He or she has the highest number of votes cast at the
                    election.
                  </li>

                  <li>
                    {" "}
                    He or she has not less than one-quarter of the votes cast at
                    the election in at least two-thirds of all the States in the
                    Federation and the Federal Capital Territory, Abuja.
                  </li>
                </ul>
                <p>
                  We have thirty-six states, but for Presidential elections, the
                  Federal Capital Territory is considered a state. So, in
                  Presidential elections, thirty-seven states are in play.{" "}
                  <br />
                  Two-thirds of thirty- seven is 24.67.
                </p>
                <br />
                <p className=" underline">
                  What are the qualifications to become the President?
                </p>
                <ul className=" list-decimal list-inside lst">
                  <li>He or she must be a citizen of Nigeria by birth.</li>

                  <li>He or she must be at least 40 years old.</li>
                  <li>
                    {" "}
                    He or she is a member of a political party and is sponsored
                    by that political party.
                  </li>

                  <li>
                    He or she has been educated up to at least School
                    Certificate level or its equivalent..
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <GovtCard
                  as="list"
                  candidates={allStateData.president}
                  className={"!w-full"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Governor section */}
      {!!allStateData.governor?.length && (
        <div className="flex w-full mt-10">
          <div className="w-full">
            <h2 className=" text-2xl my-5 pb-4 border-b-2 border-black">
              Governor - 1 Race
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                A person shall be qualified for election to the office of the
                Governor if:
                <ul className=" list-decimal list-inside lst">
                  <li>He or she is a citizen by birth.</li>
                  <li>He or she has attained the age of thirty-five years.</li>
                  <li>
                    He or she is a member of a political party and is sponsored
                    by that political party.
                  </li>
                  <li>
                    He or she has been educated up to at least School
                    Certificate level or its equivalent.
                  </li>
                </ul>
                School Certificate level has been defined as low as Primary Six
                School leaving Certificate, subject to the ability to read and
                write and satisfaction of other INEC criteria.
              </div>
              <div className="flex-1">
                <GovtCard
                  as="list"
                  candidates={allStateData.governor}
                  className={"!w-full"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {!!allStateData.house?.length && (
        <div className="flex w-full mt-10">
          <div className="w-full">
            <h2 className=" text-2xl my-5 pb-4 border-b-2 border-black">
              House - {allStateData.house.length} Race
            </h2>
            <div className="w-full flex flex-wrap">
              {allStateData.house.map((list) => (
                <SenateCard
                  key={list[0].constituency}
                  candidates={list}
                  as="list"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {!!allStateData.senate?.length && (
        <div className="flex w-full mt-10">
          <div className="w-full">
            <h2 className=" text-2xl my-5 pb-4 border-b-2 border-black">
              Senate - {allStateData.senate.length} Race
            </h2>
            <div className="w-full flex flex-wrap">
              {allStateData.senate.map((list) => (
                <SenateCard
                  key={list[0].constituency}
                  candidates={list}
                  as="list"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default StateDataPage;
