//we define a chonker marker

import type { Chonker } from "../lib/chonkers";
import type { Marker } from "@googlemaps/markerclusterer";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useCallback } from "react";

//define the Chonker Marker Props
export type ChonkerMarkerProps = {
  //each chonker data
  chonker: Chonker;
  //onClick function for handling info-window
  onClick: (chonker: Chonker) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single chonker!
 */

export const ChonkerMarker = (props: ChonkerMarkerProps) => {
  //destructure the props first
  const { chonker, onClick, setMarkerRef } = props;

  /**
   * Technically, we can omit useCallback, and the code will still work correctly.
   * However, omitting it can lead to performance issues in scenarios where the parent component
   * or the TreeMarker itself re-renders frequently, causing the child components to re-render unnecessarily.
   */

  //callback function for AdvancedMarker onClick prop
  const handleClick = useCallback(() => onClick(chonker), [onClick, chonker]);

  const ref = useCallback(
    //it takes in the AdvancedMarker Element
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, chonker.key),
    [setMarkerRef, chonker.key]
  );

  const img_src = chonker.category ? `/${chonker.category}.png` : '/chonker.png'

  return (
    //when the element mounts, it calls ref with the AdvancedMarkerElement instance as the argument
    //when it unmounts, the ref callback is called again, but this time with 'null' as the argument.
    <AdvancedMarker position={chonker.position} ref={ref} onClick={handleClick}>
      <Pin background={'#ff6f69'} borderColor={'#FFFFFF'} scale={2.5}>
        <img src={img_src} width={40} height={40} />
      </Pin>
    </AdvancedMarker>
  );
};
