import { useEffect, useState } from "react";
import { GetAvailableRoadmaps } from "../../wailsjs/go/app/App";

export function fetchAvailableRoadmaps() {
    const [AvailableRoadmaps, setAvailableRoadmaps] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        try {
            const result = await GetAvailableRoadmaps();
            setAvailableRoadmaps(result);
        } catch (err) {
            console.error("Failed to load site data:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        refresh();
    }, []);

    return { AvailableRoadmaps, loading, refresh };
}