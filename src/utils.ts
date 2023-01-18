import { Location } from "react-router";
import type { ElectionDataType, RaceType } from "./utilTypes";
import type { CandidateData } from "./utilTypes";
import L from "leaflet";
//https://inecnigeria.org/wp-content/uploads/2018/10/ADC.jpg
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
// console.log(stateCodeMap);

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

const interactiveStates = [
  "ZA",
  "KD",
  "BA",
  "NI",
  "GO",
  "AB",
  "RI",
  "CR",
  "KW",
  "OY",
  "PL",
  "DE",
  "LA",
  "KN",
  "YO",
  "NA",
  "KE",
  "JI",
  "AD",
  "BO",
  "EB",
  "AK",
  "KT",
  "EN",
  "SO",
  "TA",
  "BE",
  "OG",
];

export const getCentroid = (arr: any) => {
  // console.log(" getCentroid", arr);
  // if (arr.length <= 1) return arr;
  return arr.reduce(
    function (x: any, y: any) {
      return [x[0] + y[0] / arr.length || 1, x[1] + y[1] / arr.length];
    },
    [0, 0]
  );
};

export const partyColors = {
  AA: "#3498DB",
  ACCORD: "#99FF33",
  A: "#99FF33",
  ACD: "#00FFFF",
  ACPN: "#6F4E37",
  AD: "#FBC543",
  ADC: "#5c340f",
  APA: "#a86bd1",
  APC: "#3d8850",
  APGA: "#f6c601",
  DPP: "#024d44",
  GPN: "#740030",
  ID: "#003870",
  KOWA: "#111539",
  LP: "#3aa5d1",
  MPN: "#ED3237",
  NCP: "#ff6f50",
  NNPP: "#f78500",
  PDC: "#F0DC82",
  PDM: "#d03454",
  PDP: "#0d4c87",
  PPA: "#e67819",
  PPN: "#6ba547",
  SDP: "#ef446c",
  UDP: "#ffc9ed",
  UPN: "#f8d026",
  UPP: "#5d93ea",
  PRP: "#3e3ef7",
  YPP: "#ef446c",
};

export function ColorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

export const addingColorAndEvent = (
  map: L.Map,
  layer: L.Polygon,
  winningCandidate: CandidateData,
  setSelectedState: any,
  state: any
) => {
  layer
    .setStyle({
      fillColor: ColorLuminance(partyColors[winningCandidate.party], 0.4),
      fillOpacity: 1,
    })
    .bringToBack();

  //layer events
  layer.on({
    click: () => {
      map.flyTo(layer.getBounds().getCenter(), 8);
      setSelectedState({ layer, state });
    },
    mouseover: (event) => {
      event.target.setStyle({
        fillColor: ColorLuminance(partyColors[winningCandidate.party], 0.2),
      });
    },
    mouseout: (event) => {
      event.target.setStyle({
        fillColor: ColorLuminance(partyColors[winningCandidate.party], 0.4),
      });
    },
  });
};
//styling for empty state
export const addingEmptyStateColorAndEvent = (
  map: L.Map,
  layer: L.Polygon,
  setSelectedState: any
) => {
  layer.setStyle({ fillColor: "#919191" });
  layer.on({
    click: () => {
      // map.flyTo(layer.getBounds().getCenter(), 8);
    },
    mouseover: (event) => {
      event.target.setStyle({
        fillColor: ColorLuminance("#919191", -0.2),
      });
    },
    mouseout: (event) => {
      event.target.setStyle({ fillColor: "#919191" });
    },
  });
};

export const getConstituentMap = (
  titledDataStates: {
    [Key: string]: CandidateData[];
  },
  title: RaceType,
  year: string
) => {
  return Object.values(titledDataStates).reduce((acc, stateData) => {
    let listByContituency = stateData.reduce((acc2, candidate, i, array) => {
      let constituency = candidate.constituency;

      if (title === "house" && year === "2015") {
        acc2[constituency] = [
          ...(acc2[constituency]
            ? acc2[constituency].sort((a, b) => {
                return a.won === "lost" ? 1 : -1;
              })
            : []),
          candidate,
        ];
      } else {
        acc2[constituency] = [
          ...(acc2[constituency]
            ? acc2[constituency].sort((a, b) => {
                return Number(b.votes) - Number(a.votes);
              })
            : []),
          candidate,
        ];
      }

      return acc2;
    }, {} as Record<string, CandidateData[]>);

    return { ...acc, ...listByContituency };
  }, {} as Record<string, CandidateData[]>);
};
