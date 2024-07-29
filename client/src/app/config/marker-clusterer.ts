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

        // create img element for svg
        const img = document.createElement('img');
        img.src = `data:image/svg+xml;base64,${svg}`;
        img.className = "w-full h-full";

        // create label div
        const labelDiv = document.createElement('div');
        labelDiv.innerText = String(count);
        labelDiv.className = `
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            text-white text-xs
        `;

        // create container div
        const containerDiv = document.createElement('div');
        containerDiv.className = "relative w-12 h-12";

        // append img and label to container
        containerDiv.appendChild(img);
        containerDiv.appendChild(labelDiv);

        // create marker using svg icon
        return new google.maps.marker.AdvancedMarkerElement({
        position,
        //
        content: containerDiv,
        zIndex: 1000 + count,
        });
    },
};

export const algorithm = new SuperClusterAlgorithm({ radius: 200, maxZoom: 30 });