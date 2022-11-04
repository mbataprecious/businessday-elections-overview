import { Outlet } from "react-router";
import ControlSection from "../components/ControlSection";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <ControlSection />
      <Outlet />
    </>
  );
};

export default Home;
