import DataLayer from "../components/DataLayer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SetupSection from "../components/SetupStateFuture";
import MapArea from "../components/MapAreaFuture";
import Banner from "../components/Banner";
import Navigation from "../components/Navigation";
// import StateSetupSection from "../components/StateSetupSection";

const MapFuture = () => {
  return (
    <>
      <Header />
      <Banner />
      <Navigation />
      <SetupSection />
      <MapArea />
      <Footer />
    </>
  );
};

export default MapFuture;
