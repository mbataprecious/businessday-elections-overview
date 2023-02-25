import { centroid } from "@turf/turf";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useElectionContext } from "../context/ElectionContext";
import { RaceType } from "../utilTypes";
type Props = {
  geoJson: any;
  year: string;
  title: RaceType;
};

const ZoomControler = () => {
  const map = useMap();
  const {
    selectedState,
    title,
    year,
    setFutureSelectedState,
    setSelectedState,
    futureSelectedState,
  } = useElectionContext();

  useEffect(() => {
    setFutureSelectedState?.(undefined);
    if (!selectedState) {
      map.zoomOut(6, { animate: true });
    }
    if (selectedState) {
      let center = centroid(selectedState.state);
      if (map.getZoom() <= 7) {
        map.flyTo(
          L.latLng(
            center.geometry.coordinates[1],
            center.geometry.coordinates[0]
          ),
          8
        );
      }
      //   map.zoomOut(6);
    }
  }, [selectedState, title, year, map]);

  useEffect(() => {
    setSelectedState?.(undefined);
    if (!futureSelectedState) {
      map.zoomOut(6, { animate: true });
    }
    if (futureSelectedState) {
      let center = centroid(futureSelectedState.state);
      if (map.getZoom() <= 7) {
        map.flyTo(
          L.latLng(
            center.geometry.coordinates[1],
            center.geometry.coordinates[0]
          ),
          8
        );
      }
      //   map.zoomOut(6);
    }
  }, [futureSelectedState, title, map]);

  return null;
};

export default ZoomControler;
