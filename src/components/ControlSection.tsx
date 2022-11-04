import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useParams, useLocation, useMatch } from "react-router-dom";
import { appendGovernors, getParentPath } from "../utils";
import StatesDropDown from "./StatesDropDown";
import dayjs from "dayjs";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

const ControlSection = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const location = useLocation();
  const matchState = useMatch("/state/*");
  console.log("this is the match state ", matchState);
  const parentPathForYear = getParentPath(location);
  console.log("this is the location", location);
  console.log("this is the params", params);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    "w-full py-1 border border-gray-600 text-center " +
    (isActive ? "text-white bg-black" : "");
  return (
    <Container>
      <div>
        <ul className="mt-6 flex justify-start items-center w-full md:max-w-[600px]">
          <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
            <NavLink to={`${parentPathForYear}/2015`} className={navClass}>
              2015
            </NavLink>
          </li>
          <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
            <NavLink to={`${parentPathForYear}/2019`} className={navClass}>
              2019
            </NavLink>
          </li>
        </ul>
        <h3 className="text-red-500 text-2xl mt-4">
          Governorship Election Results
        </h3>
        <div className="flex md:flex-row md:justify-between flex-col ">
          <ul className="mt-6 flex justify-start items-center md:w-2/4">
            {!!matchState && (
              <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
                <NavLink
                  to={appendGovernors(location, "all")}
                  className={navClass}
                >
                  All
                </NavLink>
              </li>
            )}

            <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
              <NavLink
                to={appendGovernors(location, "house")}
                className={navClass}
              >
                House
              </NavLink>
            </li>

            <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
              <NavLink
                to={appendGovernors(location, "senate")}
                className={navClass}
              >
                Senate
              </NavLink>
            </li>
            <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
              <NavLink
                to={appendGovernors(location, "governor")}
                className={navClass}
              >
                Governor
              </NavLink>
            </li>
            <li className={`${matchState ? "w-1/5" : "w-1/4"} flex`}>
              <NavLink
                to={appendGovernors(location, "president")}
                className={navClass}
              >
                President
              </NavLink>
            </li>
          </ul>
          <div className="w-full md:w-1/4 flex pt-6 items-center relative">
            <button
              className="py-1 w-full text-black border-2 border-gray-300"
              onClick={() => setOpen((x) => !x)}
            >
              Find your state
            </button>

            {open && (
              <StatesDropDown className=" absolute top-[120%] right-0 z-50 bg-white" />
            )}
          </div>
        </div>
        <div>
          <p className="text-[13px] py-6">
            Last updated: {dayjs().format("DD/MM/YYYY")},{"  "}
            {dayjs().format("hh:mm:ss a")}
          </p>
          <div className="flex justify-between mt-5 border-2 border-dashed border-red-500 p-8 flex-wrap">
            <h3 className="text-red-500 text-lg font-display font-bold">
              Want more data on Nigeria?
            </h3>
            <div className="flex w-[4.5rem] justify-around">
              <a href="http://">
                <BsLinkedin className="text-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
              </a>
              <a href="http://">
                <BsTwitter className="text-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ControlSection;
