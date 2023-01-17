import L, { LatLngExpression } from "leaflet";
import { Marker, Polygon } from "react-leaflet";
import stateGeoJson from "../assets/statedata.json";
interface Props {
  state: typeof stateGeoJson.features[0];
}

const PolygonWithText = ({ state }: Props) => {
  const center = L.polygon(state.geometry.coordinates as LatLngExpression[][])
    .getBounds()
    .getCenter();
  const text = L.divIcon({ html: state.properties.name });

  return <Marker position={center} icon={text} />;
};

export default PolygonWithText;
