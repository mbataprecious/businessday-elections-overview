import numeral from "numeral";
import { Link } from "react-router-dom";
import { getrandomBg, stateCodeMap } from "../utils";
import { currentParamRoute } from "../utils";
import { useLocation } from "react-router-dom";
import type { CandidateData } from "../utilTypes";

type Props = {
  className?: string;
  as: "hover" | "list";
  candidates?: CandidateData[];
  style?: React.CSSProperties;
};

const getBgStyle = (candidate: CandidateData) => {
  return candidate.party === "APC"
    ? "!bg-[#3d8850]"
    : candidate.party === "PDP"
    ? "!bg-[#0d4c87]"
    : getrandomBg();
};

const GovtCard = ({ className, as, candidates, ...rest }: Props) => {
  const location = useLocation();
  const currentParamRoutePath = currentParamRoute(location);
  return (
    <div
      className={`${
        as !== "hover"
          ? "w-full lg:w-1/3 md:w-1/2 px-1 py-3 overflow-hidden"
          : "w-full md:w-[23rem]"
      } ${className ? className : ""} `}
      {...rest}
    >
      <div
        className={`flex flex-col text-[0.8125rem] border border-[#919191] h-full`}
      >
        <div
          className={`flex justify-between text-white px-4 pt-4 ${
            candidates?.length ? getBgStyle(candidates[0]) : "!bg-[#919191]"
          }`}
        >
          <p>{!!candidates && stateCodeMap[candidates![0].state]?.name}</p>
          {as === "list" && (
            <Link
              to={`/state/${candidates![0].state}/${currentParamRoutePath}`}
              className=" hover:underline"
            >
              See full state results
            </Link>
          )}
        </div>

        <div
          className={`flex w-full ${
            candidates ? getBgStyle(candidates[0]) : "!bg-[#919191]"
          }`}
        >
          <div className="font-medium pb-3 pt-5 px-1 text-white text-left w-1/3">
            CANDIDATES
          </div>
          <div className="font-medium pb-3 pt-5 px-1 text-white text-left flex-1"></div>
          <div className="font-medium pb-3 pt-5 px-1 text-white text-left flex-1"></div>
          <div className="font-medium pb-3 pt-5 px-1 text-white text-left flex-1">
            Votes
          </div>
          <div className="font-medium pb-3 pt-5 px-1 text-white text-left flex-1">
            PCT.
          </div>
        </div>
        <div className="bg-white w-full">
          {!!candidates &&
            candidates.map((electorialCandidates) => {
              const { candidate, party, votes, total_votes } =
                electorialCandidates;
              return (
                <div className="flex w-full" key={candidate}>
                  <div className="border-b px-1 py-2 w-1/3">{candidate}</div>
                  <div className="border-b px-1 py-2 flex-1">{party}</div>
                  <div className="border-b px-1 py-2 flex-1">
                    <span className="flex w-14 h-4 bg-slate-300">
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
        </div>
      </div>
    </div>
  );
};

export default GovtCard;
