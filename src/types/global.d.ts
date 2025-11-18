declare global {
    interface Window {
        __GRAPH__?: import('../pages/routing/graph.types').Graph;
    }
}

export {};
