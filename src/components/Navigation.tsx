import { NavLink } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import Container from "./Container";

const navClass = ({ isActive }: { isActive: boolean }) =>
  "flex items-center py-2 px-4 text-white rounded-md text-center " +
  (isActive ? " bg-[#ADB1B5]" : "bg-[#CC1A0C]");
const Navigation = () => {
  return (
    <Container>
      <div className="flex lg:w-2/5 justify-between mt-3 items-center">
        <h3 className=" font-display font-semibold text-sm  md:text-lg">
          Explore Elections
        </h3>
        <NavLink to={"/map"} end className={navClass}>
          <BsPlus color="#FFFFFF" scale={1.5} />
          The Past
        </NavLink>
        <NavLink to={"/map/future"} end className={navClass}>
          2023
          <BsPlus color="#FFFFFF" />
        </NavLink>
      </div>
    </Container>
  );
};

export default Navigation;
