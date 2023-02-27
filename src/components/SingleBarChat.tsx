import numeral from "numeral";
import React from "react";
import { partyColors } from "../utils";
import { CandidateData } from "../utilTypes";
import Container from "./Container";

interface Props {
  candidates: CandidateData[];
  total: {
    APC: number;
    PDP: number;
    LP: number;
    NNPP: number;
  };
}

const SingleBarChat = ({ candidates, total }: Props) => {
  return (
    <Container>
      <div className="py-10">
        <h3 className="mb-4 text-xl font-semibold leading-3 tracking-tight">
          {" "}
          IREV portal progress
        </h3>
        <p className="mb-2">
          These results were obtained from INEC's result viewing platform (IREV)
          and LGA collation centers and should not be considered final.
        </p>
        {candidates.map((candidate) => (
          <div
            key={candidate.candidate}
            className="border rounded-md flex items-center mb-7 py-6 px-3"
          >
            <div className="relative">
              <img
                src={candidate.image}
                alt={candidate.candidate}
                className=" h-14 w-14 rounded-full"
              />
              <img
                src={candidate.partyLogoURL}
                alt={candidate.candidate}
                className=" h-6 w-6 absolute z-10 bottom-0 left-0 rounded-full border-[#fff] border-[3px]"
              />
            </div>

            <div className=" flex-1">
              <div>
                <h3 className="text-base font-semibold leading-3 mb-2 tracking-tight text-gray-900">
                  Total Vote:{" "}
                  <span className=" font-normal">
                    {numeral(
                      total[candidate.party as keyof Props["total"]]
                    ).format("0,0")}
                  </span>
                </h3>
              </div>
              <div className="w-full h-fit bg-[#c3bfbf]">
                <div
                  className=" h-4"
                  style={{
                    background: partyColors[candidate.party],
                    width: `${
                      (total[candidate.party as keyof Props["total"]] /
                        Object.keys(total).reduce(
                          (acc, party) =>
                            (acc += total[party as keyof Props["total"]]),
                          0
                        )) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SingleBarChat;
