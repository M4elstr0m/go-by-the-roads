import { useEffect, useState } from "react";
import { Version } from "@/../wailsjs/go/app/App";

export function fetchVersion() {
    const [VersionCallOutput, setVersionCallOutput] = useState<any[]>([false, "Unknown", "Unknown", "https://github.com/M4elstr0m/go-by-the-roads", "M4elstr0m"]);

    useEffect(() => {
        async function callHandling() {
            try {
                const result = await Version();
                setVersionCallOutput(result);
            } catch (err) {
                console.error("Failed to load version data:", err);
            }
        }

        callHandling();
    }, []);

    return {
        IsLatestVersion: VersionCallOutput[0],
        CurrentTag: VersionCallOutput[1],
        LatestReleaseTag: VersionCallOutput[2],
        RepoLink: VersionCallOutput[3],
        RepoOwner: VersionCallOutput[4],
    }
}