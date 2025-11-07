import LoadingScreen from "@/components/LoadingScreen";
import SiteCard from "@/components/SiteCard";
import { fetchRoadmapAttributes } from "@/hooks/fetchRoadmapAttributes";
import '@/styles/pages/Roadmap.css';

function Roadmap() {
    const { RoadmapTitle, RoadmapSites, loading } = fetchRoadmapAttributes();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="roadmap" className="">
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
                        {
                            RoadmapSites.map((site, index) => (
                                <div style={{ position: "relative", }}>
                                    <SiteCard site={site}></SiteCard>

                                    {
                                        index < RoadmapSites.length - 1 && <div style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "2px",
                                            height: "100px",
                                            backgroundColor: "var(--palette_White)",
                                            zIndex: "-1",
                                        }}></div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </span >
            </div >
        )
    }
}

export default Roadmap