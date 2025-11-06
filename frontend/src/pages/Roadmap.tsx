import LoadingScreen from "@/components/LoadingScreen";
import SiteCard from "@/components/SiteCard";
import { fetchRoadmapAttributes } from "@/hooks/fetchRoadmapAttributes";
import NavigationWidget from '@/components/NavigationWidget';
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
                        }} // or any height limit you want
                    >
                        {
                            RoadmapSites.map((site) => (
                                <div>
                                    <SiteCard site={site}></SiteCard>
                                </div>
                            ))
                        }
                    </div>
                </span>
                <br></br>
                <NavigationWidget route="/" text="Home"></NavigationWidget>
            </div>
        )
    }
}

export default Roadmap