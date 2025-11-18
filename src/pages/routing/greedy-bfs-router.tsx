import type { Edge, Graph, Path } from './graph.types';

type QueueItem = {
    nodeId: string;
    distance: number;
    duration: number;
    path: string[];
};

type Params = {
    graph: Graph;
    startId: string;
    goalId: string;
    timeBin: keyof Edge['speeds_kph'];
};

export const findPath = ({ graph, startId, goalId, timeBin }: Params): Path | null => {
    if (!graph.nodes[startId] || !graph.nodes[goalId]) {
        return null;
    }

    const queue: QueueItem[] = [
        {
            nodeId: startId,
            distance: 0,
            duration: 0,
            path: [startId],
        },
    ];

    const visited = new Set<string>([startId]);

    while (queue.length > 0) {
        const item = queue.shift();
        if (!item) break;
        const { nodeId, distance, duration, path } = item;

        if (nodeId === goalId) {
            return { nodes: path, distance, duration };
        }

        const neighbors = graph.adj?.[nodeId] || [];
        for (const edge of neighbors) {
            const nextId = edge.to;
            if (visited.has(nextId)) continue;

            const speedKph = edge.speeds_kph[timeBin];
            const speedMps = Math.max(1, speedKph) / 3.6;
            const timeSec = edge.length / speedMps;

            queue.push({
                nodeId: nextId,
                distance: distance + edge.length,
                duration: duration + timeSec,
                path: [...path, nextId],
            });

            visited.add(nextId);
        }
    }

    return null;
};
