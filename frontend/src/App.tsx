import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home';
import About from '@/pages/About';
import Roadmap from '@/pages/Roadmap';
import { fetchVersion } from "@/hooks/fetchVersion";
import NewVersion from "@/components/NewVersion";
import AppFooter from "@/components/AppFooter";
import Preferences from "@/pages/Preferences";


function App() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    const { IsLatestVersion, CurrentTag, LatestReleaseTag, RepoLink, RepoOwner } = fetchVersion();
    const [ShowNewVersion, setShowNewVersion] = useState(!IsLatestVersion);

    let PopUp;
    if (ShowNewVersion) {
        PopUp = <NewVersion SubmitAction={() => setShowNewVersion(false)} CurrentTag={CurrentTag} LatestReleaseTag={LatestReleaseTag} RepoLink={RepoLink} RepoOwner={RepoOwner} ></NewVersion>
    }

    return (
        <>

            < HashRouter >
                {PopUp}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/preferences" element={<Preferences />} />
                </Routes>
                <AppFooter></AppFooter>
            </HashRouter >

        </>
    );
}

export default App
