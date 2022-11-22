import { Link } from "react-router-dom";
import { getrandomBg, stateCodeMap } from "../utils";
import type { CandidateData } from "../utilTypes";

type Props = {
  className?: string;
  as: "hover" | "list";
  candidates?: CandidateData[];
  style?: React.CSSProperties;
};

const SenateCard = ({ className, as, candidates, ...rest }: Props) => {
  return (
    <div
      className={`${
        as !== "hover"
          ? "w-full lg:w-1/3 md:w-1/2 px-1 py-3 overflow-hidden"
          : "w-full md:w-[23rem]"
      } ${className ? className : ""}`}
      {...rest}
    >
      <div
        className={`flex flex-col text-[0.8125rem] border border-[#919191] h-full`}
      >
        <div
          className={`flex justify-between px-4 ${
            as === "list" && " pt-4"
          } bg-[#52ae60] text-white`}
        >
          <p>{!!candidates && stateCodeMap[candidates![0].state]?.name}</p>
          {as === "list" && (
            <Link to={"/"} className=" hover:underline">
              See full state results
            </Link>
          )}
        </div>

        <div className={`flex w-full bg-[#52ae60]`}>
          <div className="font-medium pb-3 pt-3 px-1 text-white text-left w-1/3">
            CANDIDATES
          </div>
          <div className="font-medium pb-3 pt-3 px-1 text-white text-left flex-1">
            PARTY
          </div>
          <div className="font-medium pb-3 pt-3 px-1 text-white text-left flex-1">
            CONSTITUENCY
          </div>
        </div>
        <div className="bg-white w-full">
          {!!candidates &&
            candidates.map((electorialCandidates) => {
              const { candidate, party, constituency } = electorialCandidates;
              return (
                <div className="flex w-full" key={candidate}>
                  <div className="border-b px-1 py-2 w-1/3">{candidate}</div>
                  <div className="border-b px-1 py-2 flex-1">{party}</div>
                  <div className="border-b px-1 py-2 flex-1">
                    {constituency}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SenateCard;
