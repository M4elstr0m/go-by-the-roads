import { useEffect, useState } from "react";
import { GetPreferences } from "@/../wailsjs/go/app/App";
import { settings } from "@/../wailsjs/go/models";


export function fetchPreferences() {
    const [Preferences, setPreferences] = useState<settings.Settings>();

    const [loading, setLoading] = useState(true);

    async function fetchUserPreferences() {
        try {
            const result = await GetPreferences();
            setPreferences(result);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load site data:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserPreferences();
    }, []);

    return { preferences: Preferences, loading: loading, refresh: fetchUserPreferences }
}