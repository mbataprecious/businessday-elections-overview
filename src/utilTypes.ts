import type { regionStates } from "./utils";
export type year = 2015 | 2019;
export type RegionStateType = typeof regionStates;
export interface CandidateData {
  candidate: string;
  constituency: string;
  is_incumbent: string;
  partyLogoURL: string;
  image: string;
  party: party;
  race: string;
  region: keyof RegionStateType;
  state: string;
  total_votes: number;
  votes: number;
  won: "won" | "lost";
  year: year;
}

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

export type MapLocation = {
  path: string;
  id: string;
  name: string;
};

export type RaceType = "president" | "governor" | "house" | "senate";

export type ElectionDataType = { [Key: number]: ElectionYearType };

export type ElectionYearType = {
  [Key: string]: {
    stateData: {
      [Key: string]: CandidateData[];
    };
    summary: {
      [Key in party]: summaryValue;
    };
  };
};

export type SelectedLayer = {
  state: any;
  layer?: L.Polygon;
};

export interface ElectionUpdate {
  0: number;
  name: string;
  code: string;
  state: string;
  stateCode: string;
  LP: number;
  APC: number;
  PDP: number;
  NNPP: number;
  total: number;
}

const updateKeys = [
  "Presidential update",
  "Presidential candidates",
  "governorship update",
  "governorship candidates",
];
