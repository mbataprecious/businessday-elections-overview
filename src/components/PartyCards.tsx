import React from "react";
import { CandidateData } from "../utilTypes";

const PartyCards = ({ candidate }: { candidate: CandidateData }) => {
  return (
    <div className="overflow-hidden border rounded-lg bg-white px-4 py-5 shadow sm:p-6 flex items-center gap-x-4 w-full">
      <img className="h-12 w-12 rounded-full" src={candidate.image} alt="" />
      <div>
        <h3 className="text-base font-semibold leading-3 mb-1 tracking-tight text-gray-900">
          {candidate.candidate}
        </h3>
        <p className="text-sm font-semibold leading-3 text-gray-700">
          {candidate.party}
        </p>
      </div>
    </div>
  );
};

export default PartyCards;
