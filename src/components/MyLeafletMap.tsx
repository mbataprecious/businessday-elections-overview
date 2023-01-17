import { MapContainer } from "react-leaflet";
import Container from "./Container";
import L from "leaflet";
//style
import "leaflet/dist/leaflet.css";
import "../map.css";
import GeoJson from "./GeoJson";
import stateGeoJson from "../assets/statedata.json";
import senateGeoJson from "../assets/senatedata.json";
import houseGeoJson from "../assets/houseOfRepsData.json";
import { useElectionContext } from "../context/ElectionContext";
import ZoomControler from "./ZoomControler";

var feature = L.geoJson(stateGeoJson.features as any);
const MyLeafletMap = () => {
  const { data, year, setSelectedState, title } = useElectionContext();
  return (
    <MapContainer
      style={{ height: "700px", border: "2px solid #000" }}
      maxBounds={feature.getBounds()}
      center={{ lat: 10, lng: 8 }}
      crs={L.CRS.Simple}
      zoom={6}
      maxZoom={11}
      minZoom={6}
    >
      <ZoomControler />
      {!!data && (
        <>
          {(title === "president" || title === "governor") && (
            <GeoJson
              geoJson={stateGeoJson}
              electionData={data}
              isState
              setSelectedState={setSelectedState}
              year={year}
              title={title}
            />
          )}
          {title === "senate" && (
            <GeoJson
              geoJson={senateGeoJson}
              electionData={data}
              setSelectedState={setSelectedState}
              year={year}
              title={title}
            />
          )}
          {title === "house" && (
            <GeoJson
              geoJson={houseGeoJson}
              electionData={data}
              setSelectedState={setSelectedState}
              year={year}
              title={title}
            />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default MyLeafletMap;
