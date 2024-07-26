//variables for the MarkerClusterer constructor parameters

import { Cluster, ClusterStats, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";


export const renderer = {
    render: ({ count, position }: Cluster, stats: ClusterStats) => {
        // change color if this cluster has more markers than the mean cluster
        const color =
        count > Math.max(10, stats.clusters.markers.mean)
        ? "#0022ff"
        : "#227eff";

        // create svg url with fill color
        const svg = window.btoa(`
        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <circle cx="120" cy="120" opacity=".6" r="70" />
        <circle cx="120" cy="120" opacity=".3" r="90" />
        <circle cx="120" cy="120" opacity=".2" r="110" />
        <circle cx="120" cy="120" opacity=".1" r="130" />
        </svg>`);

        // create marker using svg icon
        return new google.maps.Marker({
        position,
        icon: {
            url: `data:image/svg+xml;base64,${svg}`,
            scaledSize: new google.maps.Size(50, 50),
        },
        label: {
            text: String(count),
            color: "rgba(255,255,255,1.5)",
            fontSize: "12px",
            // fontFamily:"Arial",
        },
        // adjust zIndex to be above other markers
        zIndex: 1000 + count,
        });
    },
};

export const algorithm = new SuperClusterAlgorithm({ radius: 200, maxZoom: 30 });