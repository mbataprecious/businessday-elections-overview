import { Location } from "react-router";

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
    { name: "Edo", code: "AD" },
    { name: "Rivers", code: "AD" },
  ],
  SE: [
    { name: "Abia", code: "AB" },
    { name: "Anambra", code: "AN" },
    { name: "Ebonyi", code: "EB" },
    { name: "Enugu", code: "EN" },
    { name: "Imo", code: "IM" },
  ],
};
//
//
//
//
//
