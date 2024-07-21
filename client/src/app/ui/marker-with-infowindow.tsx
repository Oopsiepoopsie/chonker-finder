import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

export const MarkerWithInfowindow = ({position}: {position : google.maps.LatLngLiteral}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      {/*the customized advanced marker*/}
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}
      >
        <Pin background={'#22ccff'} borderColor={'#ffffff'} scale={1.8}>
            <img src={'/chonker.png'} width={40} height={40} />
        </Pin>
      </AdvancedMarker>
    
      {/*the info window*/}
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          WE FOUND A CHONKER HERE
          {/* This is an example for the{' '}
          <code style={{whiteSpace: 'nowrap'}}>&lt;AdvancedMarker /&gt;</code>{' '}
          combined with an Infowindow. */}
        </InfoWindow>
      )}

    </>
  );
};