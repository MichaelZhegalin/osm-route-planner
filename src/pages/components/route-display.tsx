import { Polyline } from 'react-leaflet';

interface RouteDisplayProps {
    path: import('../routing/graph.types').Path | null;
}

export const RouteDisplay = ({ path }: RouteDisplayProps) => {
    if (!path) return null;

    const positions = path.nodes
        .map((id) => {
            const graph = window.__GRAPH__;
            const node = graph?.nodes[id];
            return node ? [node.lat, node.lng] : null;
        })
        .filter(Boolean) as [number, number][];

    return (
        <Polyline
            positions={positions}
            color="#e74c3c"
            weight={5}
            opacity={0.9}
            dashArray={path.nodes.length <= 1 ? '5,5' : undefined} // пунктир для точки-в-точку
        />
    );
};
