import { useMap, InfoWindow } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultOnClusterClickHandler,
  type Marker,
  MarkerClusterer,
  type Cluster,
} from "@googlemaps/markerclusterer";
import { algorithm, renderer } from "../config/marker-clusterer";
import type { Chonker } from "../lib/chonkers";
import { ChonkerMarker } from "./chonker-marker";
import { unstable_noStore as noStore } from "next/cache";

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
  noStore();
  //state for all the markers
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  //state for the selected Chonker key for info-window
  const [selectedChonkerKey, setSelectedChonkerKey] = useState<string | null>(
    null
  );

  //get the selected Chonker data for info window (could be null when the chonkers get filtered)
  const selectedChonker = useMemo(
    () =>
      chonkers && selectedChonkerKey
        ? chonkers.find((t) => t.key === selectedChonkerKey)!
        : null,
    [chonkers, selectedChonkerKey]
  );

  //config for MarkerClusterer
  const map = useMap();
  //click handler for the clusterer
  const onClusterClickHandler = (
    e: google.maps.MapMouseEvent,
    cluster: Cluster,
    map: google.maps.Map
  ) => {
    //when cluster clicked, close the info window first!!!
    setSelectedChonkerKey(null);
    defaultOnClusterClickHandler(e, cluster, map);
  };

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const clusterer = useMemo(() => {
    if (!map) return null;
    return new MarkerClusterer({
      map,
      algorithm,
      onClusterClick: onClusterClickHandler,
      renderer,
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
  // takes a marker and its key as argument
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      //if the marker and its key already exists
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      //if we have a new marker, add it to markers state
      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        //if not,  we remove the property with the key
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
      {/**we need to have the key and the content 
       as we may filter out the data and info window remains after filter)*/}
      {selectedChonkerKey && selectedChonker && (
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
