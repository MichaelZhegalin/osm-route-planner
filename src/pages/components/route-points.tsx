import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import { RouteDisplay } from './route-display';
import styles from './route-points.module.css';
import { useRoute } from '../routing/use-route';

const createMarkerIcon = (color: string, label: string) => {
    return new L.DivIcon({
        className: 'custom-marker',
        html: `
      <div class="${styles.marker}" style="--marker-color: ${color}">${label}</div>
    `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    });
};

const TIME_SLOTS = [
    { value: '07-09', label: '🕗 Утро (7–9)' },
    { value: '09-16', label: '🕑 День (9–16)' },
    { value: '16-19', label: '🕠 Вечер (16–19)' },
    { value: '19-23', label: '🕖 Вечер (19–23)' },
    { value: '23-07', label: '🌙 Ночь (23–7)' },
] as const;

type TimeBin = (typeof TIME_SLOTS)[number]['value'];

export const RoutePoints = () => {
    const [pointA, setPointA] = useState<[number, number] | null>(null);
    const [pointB, setPointB] = useState<[number, number] | null>(null);
    const [timeBin, setTimeBin] = useState<TimeBin>('09-16');

    const { path, loading, error } = useRoute({ pointA, pointB, timeBin });

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            if (!pointA) {
                setPointA([lat, lng]);
            } else if (!pointB) {
                setPointB([lat, lng]);
            } else {
                setPointA([lat, lng]);
                setPointB(null);
            }
        },
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setPointA(null);
                setPointB(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins} мин ${secs} сек`;
    };

    return (
        <>
            <div className={styles.panel}>
                <h3 className={styles.title}>Маршрут</h3>
                <label>
                    Время:
                    <select
                        value={timeBin}
                        onChange={(e) => setTimeBin(e.target.value as TimeBin)}
                        className={styles.select}
                    >
                        {TIME_SLOTS.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </label>

                {loading && <div>⏳ Строим...</div>}
                {error && <div className={styles.error}>❗ {error}</div>}
                {path && (
                    <div>
                        🗺️{' '}
                        {path.distance < 1000
                            ? `${Math.round(path.distance)} м`
                            : `${(path.distance / 1000).toFixed(1)} км`}
                        <br />
                        ⏱️ {formatDuration(path.duration)}
                    </div>
                )}
            </div>

            {/* Маркеры */}
            {pointA && (
                <Marker position={pointA} icon={createMarkerIcon('#e74c3c', 'A')}>
                    <Popup>
                        <button onClick={() => setPointA(null)}>Удалить A</button>
                    </Popup>
                </Marker>
            )}
            {pointB && (
                <Marker position={pointB} icon={createMarkerIcon('#2ecc71', 'B')}>
                    <Popup>
                        <button onClick={() => setPointB(null)}>Удалить B</button>
                    </Popup>
                </Marker>
            )}

            {/* Маршрут */}
            {path && <RouteDisplay path={path} />}
        </>
    );
};
