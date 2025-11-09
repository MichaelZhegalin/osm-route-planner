import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const SetViewOnMount = () => {
  const map = useMap();

  useEffect(() => {
    const CENTER: [number, number] = [59.9386, 30.3361];
    const ZOOM = 14;

    const BOUNDS: [[number, number], [number, number]] = [
      [59.915, 30.29], // ЮЗ: ~Обводный канал / Лиговский
      [59.955, 30.365], // СВ: ~Фонтанка / Смольный
    ];

    map.setView(CENTER, ZOOM);
    map.setMaxBounds(BOUNDS);

    map.setMinZoom(12);
    map.setMaxZoom(18);
  }, [map]);

  return null;
};
