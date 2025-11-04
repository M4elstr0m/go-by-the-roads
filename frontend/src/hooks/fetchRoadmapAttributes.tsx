import { useEffect, useState } from "react";
import { GetRoadmapTitle, GetRoadmapSites } from "../../wailsjs/go/app/App";
import { roadmaps } from "wailsjs/go/models";


export function fetchRoadmapAttributes() {
    const [RoadmapTitle, setRoadmapTitle] = useState<string>("");
    const [RoadmapSites, setRoadmapSites] = useState<roadmaps.Site[]>([]);

    const [loadingTitle, setLoadingTitle] = useState(true);
    const [loadingSites, setLoadingSites] = useState(true);

    useEffect(() => {
        async function fetchRoadmapTitle() {
            try {
                const result = await GetRoadmapTitle();
                setRoadmapTitle(result);
                setLoadingTitle(false);
            } catch (err) {
                console.error("Failed to load site data:", err);
            } finally {
                setLoadingTitle(false);
            }
        }
        fetchRoadmapTitle();
    }, []);

    useEffect(() => {
        async function fetchRoadmapSites() {
            try {
                const result = await GetRoadmapSites();
                setRoadmapSites(result);
                setLoadingSites(false);
            } catch (err) {
                console.error("Failed to load site data:", err);
            } finally {
                setLoadingSites(false);
            }
        }
        fetchRoadmapSites();
    }, []);

    return { RoadmapTitle, RoadmapSites, loading: loadingTitle || loadingSites }
}