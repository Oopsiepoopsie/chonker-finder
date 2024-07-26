"use client";

import { useEffect, useState, useMemo } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ClusteredChonkerMarkers } from "./clustered-chonker-markers";
import {
  type Chonker,
  loadChonkerDataset,
  getCategories,
} from "../lib/chonkers";
import { ControlPanel } from "./control-panel";

//Map's styling config
import {
  defaultMapContainerStyle,
  defaultMapCenter,
  defaultMapZoom,
  restriction,
} from "../config/map";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID as string;

export default function MapComponent() {
  //chonkers state for chonkers data, array of Chonker
  const [chonkers, setChonkers] = useState<Chonker[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // load data asynchronously
  useEffect(() => {
    loadChonkerDataset().then((data) => setChonkers(data));
  }, []);

  // get category information for the filter-dropdown
  const categories = useMemo(() => getCategories(chonkers), [chonkers]);
  const filteredChonkers = useMemo(() => {
    if (!chonkers) return null;

    return chonkers.filter(
      (t) => !selectedCategory || t.category === selectedCategory
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
        // disableDefaultUI={true}
      >
        {filteredChonkers && (
          <ClusteredChonkerMarkers chonkers={filteredChonkers} />
        )}
      </Map>

      <ControlPanel
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />
    </APIProvider>
  );
}
