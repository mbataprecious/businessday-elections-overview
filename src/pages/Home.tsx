import CountDownView from "../components/landing/CountDownView";
import CtaSection from "../components/landing/CtaSection";
import Header from "../components/landing/header";
import IntroSection from "../components/landing/IntroSection";

const Home = () => {
  return (
    <>
      <Header />
      <IntroSection />
      <CountDownView />
      <CtaSection />
    </>
  );
};

export default Home;
