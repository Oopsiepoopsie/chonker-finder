/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
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

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
  // mapTypeId: "hybrid",
  minZoom: 17,
  //map bounds
  restriction:{
    latLngBounds: {north: 45.39445856421515, south: 45.378382540881276, west: -75.70148744910168, east: -75.6889806643488},
  },
};


const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  );
};

export { MapComponent };
