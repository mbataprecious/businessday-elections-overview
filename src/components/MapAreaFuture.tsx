import Container from "./Container";
import { useElectionContext } from "../context/ElectionContext";
import MyLeafletMapFuture from "./MyLeafletMapFuture";
import FutureShortTable from "./FutureShortTable";

const MapArea = () => {
  const { futureSelectedState } = useElectionContext();

  return (
    <Container className=" relative">
      <MyLeafletMapFuture />
      <Container className=" w-full absolute bottom-0 left-0 z-[1000]">
        {!!futureSelectedState && <FutureShortTable className="" />}
      </Container>
    </Container>
  );
};

export default MapArea;
