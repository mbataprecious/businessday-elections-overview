import { Link } from "react-router-dom";
import logo from "../assets/images/bday logo.png";
import Container from "./Container";

const Header = () => {
  return (
    <div className="border-b-[2px] border-b-gray-300">
      <div className=" flex justify-center items-center border-t-4 border-t-red-500 py-5 border-b-[2px] border-b-gray-300">
        <Link to={"/"}>
          <img className=" h-12" src={logo} alt="logo" />
        </Link>
      </div>
      <Container className="flex justify-between">
        <div className=" flex items-center h-full my-auto">
          <div className="blob red" />
          <p className=" font-semibold text-lg">LIVE UPDATE</p>
        </div>
        <div className=" flex">
          <Link to={"/"} className="text-gray-600 hover:text-gray-400 p-4">
            Home
          </Link>
          <a href="https://businessday.ng/" className="text-red-500 p-4">
            Visit businessday
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Header;
