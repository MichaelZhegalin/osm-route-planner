import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';

import { App } from './App';
import { loadGraph } from './pages/data/load-graph';

(async () => {
    try {
        const graph = await loadGraph();
        window.__GRAPH__ = graph;
        console.log('✅ Graph loaded and cached globally');
    } catch (e) {
        console.error('❌ Failed to load graph:', e);
    }
})();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
