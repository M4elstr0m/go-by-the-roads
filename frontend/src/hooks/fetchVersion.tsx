import { useEffect, useState } from "react";
import { Version } from "@/../wailsjs/go/app/App";

export function fetchVersion() {
    const [VersionCallOutput, setVersionCallOutput] = useState<any[]>([false, "?", "?", "https://github.com/M4elstr0m/go-by-the-roads", "M4elstr0m"]);

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
        IsLatestVersion: VersionCallOutput[0] as boolean,
        CurrentTag: VersionCallOutput[1] as string,
        LatestReleaseTag: VersionCallOutput[2] as string,
        RepoLink: VersionCallOutput[3] as string,
        RepoOwner: VersionCallOutput[4] as string,
    }
}