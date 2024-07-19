import { MapComponent } from "./components/map";
import { MapProvider } from "./providers/map-provider";


export default function Home() {

  return (
    <MapProvider>
      <MapComponent/>
    </MapProvider>
  );
}

