import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useMap, GeoJSON } from "react-leaflet";
import "../components/leaflet.layergroup.collision";
import * as L from "leaflet";
// import stateGeoJson from "../assets/statedata.json";
import senateGeoJson from "../assets/senatedata.json";
import { PathOptions } from "leaflet";
import {
  addingColorAndEvent,
  addingEmptyStateColorAndEvent,
  ColorLuminance,
  getConstituentMap,
  getHighestParty,
  stateCodeMap,
  stateNameMap,
} from "../utils";
import { polygon, centroid } from "@turf/turf";
import {
  ElectionDataType,
  RaceType,
  CandidateData,
  ElectionUpdate,
  party,
} from "../utilTypes";
//import PolygonWithText from "./PolygonWithText";
//APC-#55be70
//PDP-#126abd
type Props = {
  geoJson: any;
  isState?: boolean;
  electionData?: Record<string, CandidateData[] | ElectionUpdate[]>;
  year: string;
  title: RaceType;
  setSelectedState: any;
};

var collisionLayer = (L: any) => L.layerGroup.collision({ margin: 10 });

const jsonStyle: PathOptions = {
  fillColor: "#90EE90",
  fillOpacity: 1,
  color: "#ffffff",
  weight: 0.7,
};
const senateStyle: PathOptions = {
  fillColor: "none",
  fillOpacity: 1,
  color: ColorLuminance("#ffffff", -0.7),
  weight: 1.5,
};

const GeoJson = ({
  geoJson,
  isState,
  electionData,
  year,
  title,
  setSelectedState,
}: Props) => {
  let collisonGroup = useRef(collisionLayer(L));
  let geoJsonFeatureCount = useRef(0);
  let stateLayerGroup = useRef(L.layerGroup());
  let mounted = useRef(false);
  let prevtitle = useRef(title);
  let map = useMap();
  //creating the map to states
  let constituentMap = useMemo(
    () =>
      title === "president" || title === "governor"
        ? (electionData![title] as ElectionUpdate[]).reduce((acc, lga) => {
            acc[lga.state] = [...(acc[lga.state] ?? []), lga];
            return acc;
          }, {} as Record<string, ElectionUpdate[]>)
        : (electionData![title] as CandidateData[]).reduce((acc, candidate) => {
            acc[candidate.constituency] = [
              ...acc[candidate.constituency],
              candidate,
            ];
            return acc;
          }, {} as Record<string, CandidateData[]>),
    [electionData, title, year]
  );

  console.log(constituentMap);
  const zoomEvent = useCallback(() => {
    if (isState) {
      map.addLayer(stateLayerGroup.current);
      map.removeLayer(collisonGroup.current);
      return;
    }
    if (map.getZoom() >= 8) {
      map.removeLayer(stateLayerGroup.current);
      map.addLayer(collisonGroup.current);
    } else {
      map.removeLayer(collisonGroup.current);
      map.addLayer(stateLayerGroup.current);
    }
  }, [map, isState]);
  map.on("zoomend", zoomEvent);

  useEffect(() => {
    let prevCollisonGroup = collisonGroup.current;
    let prevStateLayerGroup = stateLayerGroup.current;
    let prevCount = geoJsonFeatureCount.current;

    // if (mounted.current) {
    console.log(electionData);
    console.log("This is my code");
    //if isState then show only the stateLayerGroup
    if (!isState) {
      if (map.getZoom() >= 8) {
        map.removeLayer(stateLayerGroup.current);
        map.addLayer(collisonGroup.current);
      } else {
        map.removeLayer(collisonGroup.current);
        map.addLayer(stateLayerGroup.current);
      }
    } else {
      map.addLayer(stateLayerGroup.current);
      map.removeLayer(collisonGroup.current);
    }
    // }
    // mounted.current = true;
    return () => {
      console.log("unmounted", prevCount);

      map.removeLayer(prevCollisonGroup);
      map.removeLayer(prevStateLayerGroup);
      map.off("zoomend", zoomEvent);
      // prevCollisonGroup.clearLayers();
      // prevStateLayerGroup.clearLayers();
    };
  }, [map, isState]);

  useEffect(() => {
    if (!(title === prevtitle.current)) {
      console.log("title changed");
      map.off("zoomend", zoomEvent);
    }
  }, [title, map, isState]);

  const eachFeature = (state: any, layer: L.Polygon) => {
    if (geoJsonFeatureCount.current === 0) {
      console.log("new", geoJsonFeatureCount.current);

      map.removeLayer(collisonGroup.current);
      map.removeLayer(stateLayerGroup.current);
    }

    const isMarkersDrawn =
      geoJsonFeatureCount.current >= geoJson.features.length;
    let center;
    if (stateNameMap[state.properties.name]) {
      layer.setStyle(senateStyle).bringToFront();
      if (isState) {
        let stateMap = constituentMap as Record<string, ElectionUpdate[]>;
        if (stateMap[state.properties.name]) {
          let totalPerParty = stateMap[state.properties.name].reduce(
            (acc, { PDP, LP, NNPP, APC }) => {
              acc.PDP += PDP;
              acc.APC += APC;
              acc.NNPP += NNPP;
              acc.LP += LP;
              return acc;
            },
            { APC: 0, PDP: 0, LP: 0, NNPP: 0 } as {
              APC: number;
              PDP: number;
              LP: number;
              NNPP: number;
            }
          );
          console.log("total per state ", totalPerParty);
          const party = getHighestParty(totalPerParty) as string as party;
          console.log("the highest party", party);
          addingColorAndEvent(map, layer, party, setSelectedState, state);
        } else {
          //layer events
          addingEmptyStateColorAndEvent(map, layer, setSelectedState);
        }
      }

      // layer.on({
      //   click: () => {
      //     map.flyTo(layer.getBounds().getCenter(), 8);
      //   },
      // });
      if (isMarkersDrawn) {
        return;
      }
      center = centroid(state);
      let myMarker = L.marker(
        L.latLng(
          center.geometry.coordinates[1],
          center.geometry.coordinates[0]
        ),
        {
          icon: L.divIcon({
            html: `${state.properties.name}`,
            className: "-translate-x-1/2 z-infinite",
          }),
        }
      );
      stateLayerGroup.current.addLayer(myMarker);
    } else {
      //getting the p

      layer.setStyle(jsonStyle).bringToBack();
      // console.log(constituentMap);
      if (constituentMap[state.properties.name]) {
        let constituentCandidates = constituentMap[
          state.properties.id
        ] as CandidateData[];
        let sorted = constituentCandidates.sort((a, b) => {
          return Number(b.votes) - Number(a.votes);
        });
        let winningCandidate = sorted[0].votes ? sorted[0] : undefined;
        addingColorAndEvent(
          map,
          layer,
          winningCandidate?.party as party,
          setSelectedState,
          state
        );
      } else {
        //layer events
        addingEmptyStateColorAndEvent(map, layer, setSelectedState);
      }
      if (isMarkersDrawn) {
        //geoJsonFeatureCount.current = 0;
        return;
      }
      console.log(state.properties.name);
      let myMarker;
      if (state.geometry.coordinates.length > 1) {
        let idx = state.geometry.coordinates.reduce(
          (maxI: any, el: any, i: any, arr: any) =>
            el[0].length > arr[maxI][0].length ? i : maxI,
          0
        );
        center = L.polygon(layer.getLatLngs()[idx] as L.LatLngExpression[][])
          .getBounds()
          .getCenter();
        //center = centroid(geopolygon);
        //center = getCentroid([state.geometry.coordinates[idx][0]]);
        myMarker = L.marker(center, {
          icon: L.divIcon({
            html: `${
              title === "house"
                ? state.properties.name.split("/").join(", ").trim()
                : state.properties.name
            }`,
            className: "-translate-x-1/2 z-infinite",
          }),
        });
      } else {
        let geopolygon = polygon(state.geometry.coordinates);
        center = centroid(geopolygon);
        myMarker = L.marker(
          L.latLng(
            center.geometry.coordinates[1],
            center.geometry.coordinates[0]
          ),
          {
            icon: L.divIcon({
              html: `${
                title === "house"
                  ? state.properties.name.split("/").join(", ").trim()
                  : state.properties.name
              }`,
              className: "-translate-x-1/2 z-infinite",
            }),
          }
        );
      }
      collisonGroup.current.addLayer(myMarker);
    }

    // L.marker(layer.getBounds().getCenter(), {
    //   icon: L.divIcon({
    //     html: `<span class='z-infinite -translate-x-1/2'>${state.properties.name}</span>`,
    //     className: "-translate-x-1/2",
    //   }),
    // }).addTo(map);
    geoJsonFeatureCount.current++;
  };

  return (
    <>
      <GeoJSON
        key={`whatever-${Date.now()}${Math.random() * 100}`}
        data={geoJson.features as any}
        onEachFeature={eachFeature}
      />
    </>
  );
};

export default GeoJson;
