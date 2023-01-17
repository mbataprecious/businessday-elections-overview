import { useState } from "react";
import Container from "./Container";
import Nigeria from "@svg-maps/nigeria";
import { SVGMap } from "react-svg-map";
import "../assets/scss/map.scss";
import { CandidateData, MapLocation } from "../utilTypes";
import { getrandomBg, stateIdMap } from "../utils";
import GovtCard from "./GovtCard";
import SenateCard from "./SenateCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useElectionContext } from "../context/ElectionContext";

const MapView = () => {
  const { data, year, title } = useElectionContext();
  let match = useMediaQuery("(max-width:768px)");
  //let navigate = useNavigate();
  // console.log("matches md up", match);
  const [hoverData, setHoverData] = useState<CandidateData[]>();
  const [mapState, setMapState] = useState<{
    pointedLocation: null | string;
    tooltipStyle: {
      display: string;
    };
  }>({
    pointedLocation: null,
    tooltipStyle: {
      display: "none",
    },
  });

  function getLocationName(event: any) {
    // console.log(event.target);
    return event.target.attributes.id.value;
  }

  function handleLocationMouseOver(event: any) {
    const pointedLocation = getLocationName(event) as string;
    let stateCode = stateIdMap[pointedLocation]?.code;
    //console.log("state map",stateCode)
    let titledDataStates = data![parseInt(year!)][title!].stateData;
    let sortedByVotes = titledDataStates[stateCode]
      ?.sort((a, b) => {
        return Number(b.votes) - Number(a.votes);
      })
      .slice(0, 3);
    let winningCandidates = titledDataStates[stateCode]?.filter(
      (candidates) => {
        return candidates.won === "won";
      }
    );

    if (title === "president" || title === "governor") {
      setHoverData(sortedByVotes);
    } else {
      setHoverData(winningCandidates);
    }

    setMapState((x) => ({ ...x, pointedLocation }));
  }

  function handleLocationMouseOut() {
    setHoverData(undefined);
    setMapState((x) => ({
      ...x,
      pointedLocation: null,
      tooltipStyle: { display: "none" },
    }));
  }

  function handleLocationMouseMove(event: any) {
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    };
    setMapState((x) => ({ ...x, tooltipStyle }));
  }

  function getLocationClassName(location: MapLocation, index: number) {
    let stateCode = stateIdMap[location.id]?.code;
    //console.log("state map",stateCode)
    let titledDataStates = data![parseInt(year!)][title!].stateData;
    let sortedByVotes = titledDataStates[stateCode]
      ?.sort((a, b) => {
        return Number(b.votes) - Number(a.votes);
      })
      .slice(0, 2);
    let winningCandidates = titledDataStates[stateCode]?.filter(
      (candidates) => {
        return candidates.won === "won";
      }
    );
    if (title === "president" || title === "governor") {
      return `svg-map__location ${
        winningCandidates
          ? winningCandidates[0].party === "APC"
            ? "!fill-[#3d8850]"
            : winningCandidates[0].party === "PDP"
            ? "!fill-[#0d4c87]"
            : getrandomBg()
          : "!fill-[#919191]"
      }`;
    }

    return `svg-map__location`;
  }

  // function handleLocationClick(event: any) {
  //   const pointedLocation = getLocationName(event) as string;
  //   let { year, title } = params;
  //   let stateCode = stateIdMap[pointedLocation]?.code;
  //   //console.log("state map",stateCode)
  //   let titledDataStates = data![parseInt(year!)][title!].stateData;
  //   if (titledDataStates[stateCode]) {
  //     navigate(`/state/${stateCode}/${title}/${year}`);
  //   }
  // }

  return (
    <Container>
      <div className="relative max-w-3xl mx-auto pt-20">
        {!!data && (
          <>
            <SVGMap
              map={Nigeria}
              locationClassName={getLocationClassName}
              onLocationMouseOver={handleLocationMouseOver}
              onLocationMouseOut={handleLocationMouseOut}
              onLocationMouseMove={handleLocationMouseMove}
              // onLocationClick={handleLocationClick}
            />

            {!!hoverData ? (
              title === "president" || title === "governor" ? (
                <GovtCard
                  as="hover"
                  className={match ? "absolute bottom-[2%]" : "fixed"}
                  candidates={hoverData}
                  style={match ? {} : mapState.tooltipStyle}
                />
              ) : (
                <SenateCard
                  as="hover"
                  className={match ? "absolute bottom-[2%]" : "fixed"}
                  candidates={hoverData}
                  style={match ? {} : mapState.tooltipStyle}
                />
              )
            ) : (
              <div
                className="fixed bg-white p-2 text-sm"
                style={mapState.tooltipStyle}
              >
                No Election
              </div>
            )}
          </>
        )}
      </div>

      {/* <div className="flex justify-around">
        <GovtCard as="list" />
      </div> */}
    </Container>
  );
};

export default MapView;
