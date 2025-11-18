import { MapContainer, TileLayer, AttributionControl, ZoomControl } from 'react-leaflet';

import { RoutePoints } from './components/route-points';
import { SetViewOnMount } from './components/set-view-on-mount';
import styles from './spb-map.module.css';

export const SPbMap = () => {
    return (
        <MapContainer className={styles.mapContainer}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <ZoomControl position="topright" />
            <AttributionControl position="bottomright" />

            <SetViewOnMount />
            <RoutePoints />
        </MapContainer>
    );
};
