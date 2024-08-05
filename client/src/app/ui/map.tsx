"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ClusteredChonkerMarkers } from "./clustered-chonker-markers";
import { type Chonker, loadChonkerDataset, getCategories } from "../lib/chonkers";
import { ControlPanel } from "./control-panel";
import { Notation } from "./notation-block";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID as string;

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "15px 0px 0px 15px",
};

//Carleton University's coordinates
const defaultMapCenter = {
  lat: 45.3871445682133,
  lng: -75.69590617323624,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 18;

//bounds
const restriction = {
  latLngBounds: {
    north: 45.39723375134833,
    south: 45.374391460501734,
    west: -75.71690298595725,
    east: -75.67049840485116,
  },
};

// Shortcut keys
const keyMap = {
  TOGGLE_SIDEBAR: 'ctrl+z',
}

export default function MapComponent() {
  //chonkers state for chonkers data, array of Chonker
  const [chonkers, setChonkers] = useState<Chonker[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sideBarState, setSideBarState] = useState(true);

  // Method for toggling the sidebar's state
  const sideBarHandler = () => { setSideBarState(pre => !pre) }

  // Adding event listerner for keydown 
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        sideBarHandler();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [sideBarHandler]);

  // load data asynchronously
  useEffect(() => {
    loadChonkerDataset().then((data) => setChonkers(data));
  }, []);

  // get category information for the filter-dropdown
  const categories = useMemo(() => getCategories(chonkers), [chonkers]);
  const filteredChonkers = useMemo(() => {
    if (!chonkers) return null;

    return chonkers.filter(
      t => !selectedCategory || t.category === selectedCategory
    );
  }, [chonkers, selectedCategory]);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={defaultMapContainerStyle}
        defaultCenter={defaultMapCenter}
        defaultZoom={defaultMapZoom}
        gestureHandling={"greedy"}
        defaultTilt={0}
        mapTypeId={"satellite"}
        minZoom={16}
        restriction={restriction}
        //randomly generated mapID...
        mapId={MAP_ID}
      // disableDefaultUI={false}
      >
        {filteredChonkers && <ClusteredChonkerMarkers chonkers={filteredChonkers} />}
      </Map>
      {sideBarState && (<ControlPanel
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />)}
      <div className="absolute top-[88%] w-screen h-fit justify-center  md:hidden hidden lg:flex flex-wrap-reverse">
        <Notation word={"ctrl"} letter={"Z"} context={"hide/show sidebar"} /></div>
    </APIProvider>
  );
}
