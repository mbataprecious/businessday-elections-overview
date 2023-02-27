import Footer from "../components/Footer";
import CountDownView from "../components/landing/CountDownView";
import CtaSection from "../components/landing/CtaSection";
import Header from "../components/landing/header";
import IntroSection from "../components/landing/IntroSection";
import useFetchBlogData from "../customHooks/useFetchBlogData";

const Home = () => {
  const { data } = useFetchBlogData();
  return (
    <>
      <Header />
      <IntroSection />
      <CountDownView />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Home;
