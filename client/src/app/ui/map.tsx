"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./marker-with-infowindow";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string;


//Map's styling
const defaultMapContainerStyle = {
  width: "100vw",
  height: "100vh",
  borderRadius: "15px 0px 0px 15px",
};

//Carleton University's coordinates
const defaultMapCenter = {
  lat: 45.38699874309201,
  lng: -75.69709689233588,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 18;

//bounds
const restriction = {
  latLngBounds: {
    north: 45.39445856421515,
    south: 45.378382540881276,
    west: -75.70148744910168,
    east: -75.6889806643488,
  },
};

export default function MapComponent() {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={defaultMapContainerStyle}
        defaultCenter={defaultMapCenter}
        defaultZoom={defaultMapZoom}
        gestureHandling={"auto"}
        defaultTilt={0}
        mapTypeId={"satellite"}
        minZoom={17}
        restriction={restriction}
        //randomly generated mapID...
        mapId={MAP_ID}
        // reuseMaps={true}
        // disableDefaultUI={true}
      >
        <MarkerWithInfowindow position={defaultMapCenter}></MarkerWithInfowindow>
        {/*
        <AdvancedMarker 
          position={defaultMapCenter}
          title={'AdvancedMarker with customized pin.'} 
          >
          <Pin background={'#22ccff'} borderColor={'#1e89a1'} scale={1.5}>
            <img src={'/chonker.png'} width={40} height={40} />
          </Pin>
        </AdvancedMarker>
        */}
      </Map>
    </APIProvider>
  );
}
