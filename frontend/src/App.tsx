import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home';
import About from '@/pages/About';
import Roadmap from '@/pages/Roadmap';
import { fetchVersion } from "@/hooks/fetchVersion";
import NewVersion from "@/components/NewVersion";
import AppFooter from "@/components/AppFooter";


function App() {
    const { IsLatestVersion, CurrentTag, LatestReleaseTag, RepoLink, RepoOwner } = fetchVersion();
    const [ShowNewVersion, setShowNewVersion] = useState(!IsLatestVersion);

    let popup;
    if (ShowNewVersion) {
        popup = <NewVersion SubmitAction={() => setShowNewVersion(false)} CurrentTag={CurrentTag} LatestReleaseTag={LatestReleaseTag} RepoLink={RepoLink} RepoOwner={RepoOwner} ></NewVersion>
    }

    return (
        <>

            < HashRouter >
                {popup}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                </Routes>
                <AppFooter></AppFooter>
            </HashRouter >

        </>
    );
}

export default App
