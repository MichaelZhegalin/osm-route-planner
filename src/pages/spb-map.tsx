// src/components/SPbMap.tsx
import { MapContainer, TileLayer, AttributionControl, ZoomControl } from 'react-leaflet';

import { RoutePoints } from './components/route-points';
import { SetViewOnMount } from './components/set-view-on-mount';

export const SPbMap = () => {
  return (
    <MapContainer style={{ width: '100vw', height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ZoomControl position="topright" />
      <AttributionControl position="bottomright" />

      <SetViewOnMount />
      <RoutePoints />
    </MapContainer>
  );
};
