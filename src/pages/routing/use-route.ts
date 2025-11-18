import { useState, useEffect } from 'react';

import type { Path } from './graph.types';
import { findPath } from './greedy-bfs-router';
import { loadGraph } from '../data/load-graph';

type Params = {
    pointA: [number, number] | null;
    pointB: [number, number] | null;
    timeBin: keyof import('./graph.types').Edge['speeds_kph'];
};

export const useRoute = ({ pointA, pointB, timeBin }: Params) => {
    const [path, setPath] = useState<Path | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pointA || !pointB) {
            setPath(null);
            return;
        }

        const run = async () => {
            setLoading(true);
            setError(null);
            try {
                const graph = await loadGraph();

                const findNearestNodeId = (lat: number, lng: number): string => {
                    let bestId = '';
                    let bestDist = Infinity;
                    for (const [id, node] of Object.entries(graph.nodes)) {
                        const d = (node.lat - lat) ** 2 + (node.lng - lng) ** 2;
                        if (d < bestDist) {
                            bestDist = d;
                            bestId = id;
                        }
                    }
                    return bestId;
                };

                const startId = findNearestNodeId(pointA[0], pointA[1]);
                const goalId = findNearestNodeId(pointB[0], pointB[1]);

                if (startId === goalId) {
                    setPath({
                        nodes: [startId],
                        distance: 0,
                        duration: 0,
                    });
                    return;
                }

                const result = findPath({ graph, startId, goalId, timeBin });
                setPath(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Route failed');
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [pointA, pointB, timeBin]);

    return { path, loading, error };
};
