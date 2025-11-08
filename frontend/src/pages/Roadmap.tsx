import LoadingScreen from "@/components/LoadingScreen";
import SiteCard from "@/components/SiteCard";
import AddSVG from "@/components/svg/AddSVG";
import { fetchRoadmapAttributes } from "@/hooks/fetchRoadmapAttributes";
import '@/styles/pages/Roadmap.css';
import { AddNewSite } from "@/../wailsjs/go/app/App";
import { useState } from "react";
import type { roadmaps } from "@/../wailsjs/go/models";
import SiteEditPanel from "@/components/SiteEditPanel";

function Roadmap() {
    const { RoadmapTitle, RoadmapSites, loading, refresh } = fetchRoadmapAttributes();
    const [editPanelVisible, setEditPanelVisible] = useState(false);
    const [editPanelSubject, setEditPanelSubject] = useState<roadmaps.Site>();

    let editPanelPopUp;

    if (editPanelVisible) {
        editPanelPopUp = <SiteEditPanel setVisibility={setEditPanelVisible} site={editPanelSubject} refreshCall={refresh} />
    }

    if (loading) {
        return <LoadingScreen />;
    } else {
        let siteListContent;

        if (RoadmapSites.length != 0) {
            siteListContent = RoadmapSites.map((site, index) => (
                <div style={{ position: "relative", }}>
                    <SiteCard site={site} completed={site.completed} refreshCall={refresh}
                        setEditPanelVisibility={setEditPanelVisible}
                        setEditPanelSite={setEditPanelSubject} />

                    { // white path
                        index < RoadmapSites.length && <div className="relative group flex justify-center">
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -85%)",
                                width: "2px",
                                height: "100px",
                                backgroundColor: "var(--palette_White)",
                                zIndex: "-1",
                            }}></div>

                            <button
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                                px-2 py-1 z-10"
                                onClick={async () => {
                                    await AddNewSite(index + 1);
                                    await refresh();
                                }}
                            >
                                <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/95">
                                    <AddSVG />
                                </span>
                            </button>
                        </div>
                    }
                </div>
            ))
        } else {
            siteListContent = <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        opacity-100 transition-opacity duration-300
                        px-2 py-1 z-10"
                onClick={async () => {
                    await AddNewSite(0);
                    await refresh();
                }}
            >
                <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/95">
                    <AddSVG />
                </span>
            </button>
        }

        return (
            <div id="roadmap" className="">
                {editPanelPopUp}
                <h1 className="title inline-block font-extrabold tracking-tight text-white drop-shadow-md uppercase hover:scale-110 transition-all duration-200">
                    {RoadmapTitle}
                </h1>
                <span className="w-full flex justify-center">
                    <div
                        className="sites-list flex flex-col items-center overflow-y-auto overflow-x-hidden"
                        style={{
                            maxHeight: "70vh", maxWidth: "fit-content",
                        }}
                    >
                        {siteListContent}
                    </div>
                </span >
            </div >
        )
    }
}

export default Roadmap