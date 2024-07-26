//Map's styling props for the <Map/> component
export const defaultMapContainerStyle = {
    width: "100%",
    height: "100vh",
    borderRadius: "15px 0px 0px 15px",
  };
  
  //Carleton University's coordinates
export const defaultMapCenter = {
    lat: 45.3871445682133,
    lng: -75.69590617323624,
  };
  
  //Default zoom level, can be adjusted
export const defaultMapZoom = 18;
  
  //bounds
export const restriction = {
    latLngBounds: {
      north: 45.39723375134833,
      south: 45.374391460501734,
      west: -75.71690298595725,
      east: -75.67049840485116,
    },
};