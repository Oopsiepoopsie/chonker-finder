import { useMap, InfoWindow } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type Marker,
  MarkerClusterer,
  SuperClusterAlgorithm,
  type SuperClusterOptions,
} from "@googlemaps/markerclusterer";
import type { Chonker } from "../lib/chonkers";
import { ChonkerMarker } from "./chonker-marker";

//define the ClusteredChonkerMarkersProps
export type ClusteredTreeMarkersProps = {
  //we pass in the chonkers data here!
  chonkers: Chonker[];
};

/**
 * The ClusteredChonkerMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */

export const ClusteredChonkerMarkers = ({
  chonkers,
}: ClusteredTreeMarkersProps) => {
  //state for the markers
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  //state for the selected Chonker key for info-window
  const [selectedChonkerKey, setSelectedChonkerKey] = useState<string | null>(
    null
  );

  //get the selected Chonker data
  const selectedChonker = useMemo(
    () =>
      chonkers && selectedChonkerKey
        ? chonkers.find((t) => t.key === selectedChonkerKey)!
        : null,
    [chonkers, selectedChonkerKey]
  );

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap();
  const algorithm = new SuperClusterAlgorithm({radius: 200, maxZoom: 30})
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({
      map,
      algorithm,
    });
  }, [map]);

  //update the clusterer
  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedChonkerKey(null);
  }, []);

  const handleMarkerClick = useCallback((chonker: Chonker) => {
    setSelectedChonkerKey(chonker.key);
  }, []);

  return (
    <>
      {chonkers.map((chonker) => (
        <ChonkerMarker
          key={chonker.key}
          //here we pass in the tree data
          chonker={chonker}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}
      {selectedChonkerKey && (
        <InfoWindow
          anchor={markers[selectedChonkerKey]}
          onCloseClick={handleInfoWindowClose}
        >
          {selectedChonker?.description}
        </InfoWindow>
      )}
    </>
  );
};
