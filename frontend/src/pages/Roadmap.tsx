import LoadingScreen from "@/components/LoadingScreen";
import SiteCard from "@/components/SiteCard";
import { fetchRoadmapAttributes } from "@/hooks/fetchRoadmapAttributes";
import NavigationWidget from '@/components/NavigationWidget';
import '@/styles/Roadmap.css';

function Roadmap() {
    const { RoadmapTitle, RoadmapSites, loading } = fetchRoadmapAttributes();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="roadmap">
                <h1 className="title">{RoadmapTitle}</h1>
                {
                    RoadmapSites.map((site) => (
                        <div>
                            <br></br>
                            <SiteCard site={site}></SiteCard>
                        </div>
                    ))
                }
                <NavigationWidget route="/" text="Home"></NavigationWidget>
            </div>
        )
    }
}

export default Roadmap