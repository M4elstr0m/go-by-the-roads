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
                <h1 className="title font-extrabold tracking-tight text-white drop-shadow-md uppercase">{RoadmapTitle}</h1>
                <div className="sites-list flex flex-col items-center">
                    {
                        RoadmapSites.map((site) => (
                            <div>
                                <br></br>
                                <SiteCard site={site}></SiteCard>
                            </div>
                        ))
                    }
                </div>
                <NavigationWidget route="/" text="Home"></NavigationWidget>
            </div>
        )
    }
}

export default Roadmap