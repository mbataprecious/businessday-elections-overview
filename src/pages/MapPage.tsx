import DataLayer from "../components/DataLayer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SetupSection from "../components/SetupSection";
import MapArea from "../components/MapArea";
import Banner from "../components/Banner";
import Navigation from "../components/Navigation";
import StateSetupSection from "../components/StateSetupSection";

const MapPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Navigation />
      <SetupSection />
      <DataLayer />
      {/* <MapView /> */}
      <MapArea />
      <StateSetupSection />
      <Footer />
    </>
  );
};

export default MapPage;
