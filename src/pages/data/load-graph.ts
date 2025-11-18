import type { Edge, Graph } from '../routing/graph.types';

let cachedGraph: Graph | null = null;

type GraphWithAdj = Graph & { adj: Record<string, Edge[]> };

export const loadGraph = async (): Promise<Graph> => {
    if (cachedGraph) return cachedGraph;

    const response = await fetch('/graph.json');
    if (!response.ok) {
        throw new Error(`Failed to load graph: ${response.status}`);
    }
    const graph = (await response.json()) as Graph;

    const adj: Record<string, Edge[]> = {};
    for (const edge of graph.edges) {
        if (!adj[edge.from]) adj[edge.from] = [];
        adj[edge.from].push(edge);
    }
    const graphWithAdj: GraphWithAdj = { ...graph, adj };

    cachedGraph = graphWithAdj;
    return graphWithAdj;
};
