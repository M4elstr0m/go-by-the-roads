import { useEffect, useState } from "react";
import { GetRoadmapTitle } from "../../wailsjs/go/app/App";

export function fetchRoadmapTitle() {
    const [RoadmapTitle, setRoadmapTitle] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRoadmapTitle() {
            try {
                const result = await GetRoadmapTitle();
                setRoadmapTitle(result);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load site data:", err);
            } finally {
                setLoading(false)
            }
        }
        fetchRoadmapTitle();
    }, []);

    return { RoadmapTitle, loading }
}