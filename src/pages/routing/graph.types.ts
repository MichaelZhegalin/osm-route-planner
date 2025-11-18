export type Node = {
    lat: number;
    lng: number;
};

export type Edge = {
    id: string;
    from: string;
    to: string;
    length: number;
    highway: string;
    surface: string;
    oneway: boolean;
    osm_way_id: number;
    in_center: boolean;
    on_nevsky: boolean;
    on_bridge: boolean;
    speeds_kph: {
        '07-09': number;
        '09-16': number;
        '16-19': number;
        '19-23': number;
        '23-07': number;
    };
};

export type Graph = {
    nodes: Record<string, Node>;
    edges: Edge[];
    adj?: Record<string, Edge[]>;
    metadata: {
        time_bins: string[];
    };
};

export type Path = {
    nodes: string[];
    distance: number;
    duration: number;
};
