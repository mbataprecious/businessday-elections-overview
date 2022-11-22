import { Outlet } from "react-router";
import ControlSection from "../components/ControlSection";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <ControlSection />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
