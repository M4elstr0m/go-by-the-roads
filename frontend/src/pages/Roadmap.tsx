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
            <div id="roadmap">
                <h1 className="title inline-block font-extrabold tracking-tight text-white drop-shadow-md uppercase hover:scale-110 transition-all duration-200">
                    {RoadmapTitle}
                </h1>
                <div className="sites-list flex flex-col items-center">
                    {
                        RoadmapSites.map((site) => (
                            <div>
                                <SiteCard site={site}></SiteCard>
                            </div>
                        ))
                    }
                </div>
                <br></br>
                <NavigationWidget route="/" text="Home"></NavigationWidget>
            </div>
        )
    }
}

export default Roadmap