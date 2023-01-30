import Container from "./Container";
import { useElectionContext } from "../context/ElectionContext";
import MyLeafletMapFuture from "./MyLeafletMapFuture";
import ShortTable from "./ShortTable";

const MapArea = () => {
  const { selectedState } = useElectionContext();

  return (
    <Container className=" relative">
      <MyLeafletMapFuture />
      <Container className=" w-full absolute bottom-0 left-0 z-[1000]">
        {!!selectedState && <ShortTable className="" />}
      </Container>
    </Container>
  );
};

export default MapArea;
