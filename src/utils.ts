import { Location } from "react-router";
import type { ElectionDataType } from "./utilTypes";
import type { CandidateData } from "./utilTypes";

export const fetchElectionData = async () => {
  try {
    let res = await fetch("/electionData.json");
    console.log(res);
    return (await res.json()) as ElectionDataType;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getParentPath = (location: Location): string => {
  let pathArray = location.pathname.split("/");
  pathArray.pop();
  return pathArray.join("/");
};
export const appendGovernors = (location: Location, title: string): string => {
  let pathArray = location.pathname.split("/");
  pathArray.splice(-2, 1, title);
  return pathArray.join("/");
};
export const currentParamRoute = (location: Location): string => {
  let pathArray = location.pathname.split("/");
  return pathArray.slice(-2).join("/");
};

export const regionStates = {
  NW: [
    { name: "Jigawa", code: "JG" },
    { name: "Kaduna", code: "KD" },
    { name: "Kebbi", code: "KB" },
    { name: "Kano", code: "KN" },
    { name: "Katsina", code: "KT" },
    { name: "Sokoto", code: "SO" },
    { name: "Zamfara", code: "ZM" },
  ],
  NC: [
    { name: "Benue", code: "BN" },
    { name: "FCT", code: "FC" },
    { name: "Kogi", code: "KG" },
    { name: "Kwara", code: "KW" },
    { name: "Nasarawa", code: "NS" },
    { name: "Niger", code: "NG" },
    { name: "Plateau", code: "PL" },
  ],
  NE: [
    { name: "Adamawa", code: "AD" },
    { name: "Bauchi", code: "BA" },
    { name: "Borno", code: "BO" },
    { name: "Gombe", code: "GM" },
    { name: "Taraba", code: "TR" },
    { name: "Yobe", code: "YB" },
  ],
  SW: [
    { name: "Ekiti", code: "EK" },
    { name: "Lagos", code: "LA" },
    { name: "Ogun", code: "OG" },
    { name: "Ondo", code: "OD" },
    { name: "Osun", code: "OS" },
    { name: "Oyo", code: "OY" },
  ],
  SS: [
    { name: "Akwa Ibom", code: "AK" },
    { name: "Bayelsa", code: "BY" },
    { name: "Cross River", code: "CR" },
    { name: "Delta", code: "DT" },
    { name: "Edo", code: "ED" },
    { name: "Rivers", code: "RV" },
  ],
  SE: [
    { name: "Abia", code: "AB" },
    { name: "Anambra", code: "AN" },
    { name: "Ebonyi", code: "EB" },
    { name: "Enugu", code: "EN" },
    { name: "Imo", code: "IM" },
  ],
};

export let statesArray = Object.values(regionStates).reduce(
  (acc, regionStates) => {
    return [...acc, ...regionStates];
  },
  []
);

export let stateIdMap = statesArray.reduce((acc, state) => {
  let id =
    state.name.toLowerCase() === "nasarawa"
      ? "nassarawa"
      : state.name.toLowerCase().replace(/\s/g, "-");
  acc[id!] = { ...state, id: id };
  return acc;
}, {} as Record<string, { code: string; name: string; id: string }>);

export let stateCodeMap = statesArray.reduce((acc, state) => {
  let code = state.code;
  acc[code!] = { ...state };
  return acc;
}, {} as Record<string, { code: string; name: string }>);
console.log(stateCodeMap);

export const getrandomBg = () => {
  const bgArray = [
    "bg-[#f6c601]",
    "bg-[#f78500]",
    "bg-[#ef446c]",
    "bg-[#5c340f]",
    "bg-[#3e3ef7]",
  ];
  const random = Math.floor(Math.random() * bgArray.length);
  return bgArray[random];
};

const getBgStyle = (candidate: CandidateData) => {
  return candidate.party === "APC"
    ? "!bg-[#3d8850]"
    : candidate.party === "PDP"
    ? "!bg-[#0d4c87]"
    : getrandomBg();
};
//
//
//
//
//
