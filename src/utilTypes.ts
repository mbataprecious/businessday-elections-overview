import type { regionStates } from "./utils";
export type year = 2015 | 2019;
export type RegionStateType = typeof regionStates;
export type CandidateData = {
  candidate: string;
  constituency: string;
  is_incumbent: string;
  party: "PDP";
  race: string;
  region: keyof RegionStateType;
  state: "AB";
  total_votes: number;
  votes: number;
  won: "won" | "lost";
  year: year;
};

export type summaryValue = {
  campaigns: number;
  votes: number;
};
export type party =
  | "AA"
  | "ACCORD"
  | "ACD"
  | "ACPN"
  | "AD"
  | "ADC"
  | "APA"
  | "APC"
  | "APGA"
  | "DPP"
  | "GPN"
  | "ID"
  | "KOWA"
  | "LP"
  | "MPN"
  | "NCP"
  | "NNPP"
  | "PDC"
  | "PDM"
  | "PDP"
  | "PPA"
  | "PPN"
  | "SDP"
  | "UDP"
  | "UPN"
  | "UPP";

export type ElectionDataType = { [Key: number]: ElectionDataType };

export type ElectionYearType = {
  governor: {
    stateData: {
      [Key: string]: CandidateData[];
    };
    summary: {
      [Key in party]: summaryValue;
    };
  };
  president: {
    stateData: {
      [Key: string]: CandidateData[];
    };
    summary: {
      [Key in party]: summaryValue;
    };
  };
  senate: {
    stateData: {
      [Key: string]: CandidateData[];
    };
    summary: {
      [Key in party]: summaryValue;
    };
  };
  house: {
    stateData: {
      [Key: string]: CandidateData[];
    };
    summary: {
      [Key in party]: summaryValue;
    };
  };
};
