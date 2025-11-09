import L from 'leaflet';
import type React from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';

// Иконки маркеров (без broken-image)
const createMarkerIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
      ">?</div>
    `.replace('?', color === '#e74c3c' ? 'A' : 'B'),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const pointA: [number, number] = [59.9397, 30.3424]; // Московский вокзал
const pointB: [number, number] = [59.9426, 30.2988]; // Адмиралтейство

export const RoutePoints: React.FC = () => {
  return (
    <>
      <Marker position={pointA} icon={createMarkerIcon('#e74c3c')}>
        <Popup>Точка A: Московский вокзал</Popup>
      </Marker>

      {/* Точка B */}
      <Marker position={pointB} icon={createMarkerIcon('#2ecc71')}>
        <Popup>Точка B: Адмиралтейство</Popup>
      </Marker>

      {/* Простая линия маршрута */}
      <Polyline
        positions={[pointA, pointB]}
        color="#3498db"
        weight={4}
        opacity={0.8}
        dashArray="5,5" // пунктир — как "заглушка маршрута"
      />
    </>
  );
};
