import { useEffect, useState } from "react";
import { GetAvailableRoadmaps } from "../../wailsjs/go/app/App";

export function fetchAvailableRoadmaps() {
    const [AvailableRoadmaps, setAvailableRoadmaps] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAvailableRoadmaps() {
            try {
                const result = await GetAvailableRoadmaps();
                setAvailableRoadmaps(result);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load site data:", err);
            } finally {
                setLoading(false)
            }
        }
        fetchAvailableRoadmaps();
    }, []);

    return { AvailableRoadmaps, loading, setAvailableRoadmaps }
}